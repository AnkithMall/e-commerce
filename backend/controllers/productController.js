const Product = require('../models/ProductModel') ;
const recordsPerPage = require('../config/pagination') ;
const imageValidate = require('../utils/imageValidate') ;

const getProducts = async (req,res,next)=>{
    try {

        //pagination
        const pageNum = Number(req.query.pageNum) || 1 ;
        
        //sort
        let sort = {}
        const sortOption = req.query.sort || ""
        if(sortOption){
            let sortOpt = sortOption.split("_") ;
            sort = { [sortOpt[0]]:Number(sortOpt[1]) }
        }


        let query = {} ;
        let queryCondition = false ;

        let priceQueryCondition = {} ;
        if(req.query.price){
            queryCondition = true ;
            priceQueryCondition = { price:{$lte:Number(req.query.price)}}
        }

        let ratingQueryCondition = {} ;
        if(req.query.rating){
            queryCondition = true ;
            ratingQueryCondition = { rating:{$in:req.query.rating.split(',')}}
        }

        let categoryQueryCondition = {} ;
        const categoryName = req.params.categoryName || "" ;
        if(categoryName){
            queryCondition = true ;
            let a = categoryName.replaceAll(",","/") ;
            var regEx = new RegExp("^"+a) ;
            categoryQueryCondition = {category:regEx} ;
        }

        if(req.query.category){
            queryCondition = true
            let a = req.query.category.split(',').map((item) => {
                if(item) return new RegExp('^'+item)
            }) ;
            categoryQueryCondition = {
                category:{$in:a}
            }
        }

        let attrsQueryCondition = []
        if(req.query.attrs){
            attrsQueryCondition = req.query.attrs.split(',').reduce((acc,item)=>{
                if(item){
                    let a = item.split('-') ;
                    let values = [...a] ;
                    values.shift() ;
                    let a1 = {
                        attrs:{$elemMatch:{key:a[0],value:{$in:values}}}
                    }
                    acc.push(a1) ;
                    return acc ;
                }else return acc 
            },[])
            // console.dir(attrsQueryCondition,{depth:null});
            queryCondition = true ;
        }

        const searchQuery = req.params.searchQuery || "" ;
        let searchQueryCondition = {}
        let select = {}
        if(searchQuery){
            queryCondition = true
            searchQueryCondition = { $text:{ $search: searchQuery}}
            select = {
                score:{$meta:"textScore"}
            }
            sort = {score: { $meta:"textScore" }}
        }

        if(queryCondition){
            query = {
                $and:[
                    priceQueryCondition,
                    ratingQueryCondition,
                    categoryQueryCondition,
                    searchQueryCondition,
                    ...attrsQueryCondition
                ],
            };
        }
         

        const totalProducts = await Product.countDocuments(query) ;
        const products = await Product.find(query)
            .select(select)
            .skip(recordsPerPage*(pageNum - 1))
            .sort(sort)
            .limit(recordsPerPage) ;
        res.json({ products, pageNum, paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage) });
        console.log(products);
    } catch (error) {
        next(error) ;
    }
}

const getProductById = async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.id).populate('reviews').orFail()
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const getBestsellers = async (req,res,next) => {
    try {
        const products = await Product.aggregate([
            { $sort: { category: 1, sales: -1 } },
            { $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } } },
            { $replaceWith: "$doc_with_max_sales" },
            { $project: {_id:1, name:1, images: 1, category: 1, description: 1}},
            { $limit: 3 }
        ])
        res.json(products) ;
    } catch (error) {
        next(error)
    }
}

const adminGetProducts = async (req,res,next) => {
    try {
        const products = await Product.find({})
            .sort({category:1})
            .select("name price category") ;
        res.json(products) ;
    } catch (error) {
        next(error)
    }
}

const adminDeleteProduct = async (req,res,next) =>{
    try {
        const product = await Product.findByIdAndRemove(req.params.id).orFail()
        // await product.remove() ;       
        res.json({message:"product removed"})
    } catch (error) {
        next(error)
    }
}

const adminCreateProduct = async (req,res,next) =>{
    try {
        const product = new Product()
        const {name,description,count,price,category,attributesTable} = req.body ;
        product.name = name ;
        product.description = description ;
        product.count = count ;
        product.price = price ;
        product.category = category ;
        if(attributesTable.length > 0){
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        }
        await product.save() ;
        res.json({
            message:"product created",
            productId:product._id
        }) ;
    } catch (error) {
        next(error)
    }
}

const adminUpdateProduct = async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.id).orFail() ;
        const {name,description,count,price,category,attributesTable} = req.body ;
        product.name = name || product.name ;
        product.description = description || product.description ;
        product.count = count || product.count ;
        product.price = price || product.price ;
        product.category = category || product.category ;
        if(attributesTable.length > 0){
            product.attrs = [] ;
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        }else{
            product.attrs = []
        }
        await product.save() ;
        res.json({
            message:"product updated "
        })
    } catch (error) {
        next(error)
    }
}

const adminUpload = async (req,res,next) => { 
    try {
        if(!req.files || !! req.files.images === false){
            return res.status(400).send("No files were Uploaded !") ;
        }
        const validateResult = imageValidate(req.files.images) ;
        if(validateResult.error){
            return res.status(400).send(validateResult.error) ;
        }
        const path = require("path") ;
        const { v4: uuidv4 } = require("uuid") ;
        const uploadDirectory = path.resolve(__dirname,"../../frontend","public","images","products") ;
        let product = await Product.findById(req.query.productId).orFail()
        let imagesTable = [] ;

        if(Array.isArray(req.files.images)){
            //res.send("You sent " + req.files.images.length + " images");
            imagesTable = req.files.images ;
        }else{
            //res.send("You sent only one image") ;
            imagesTable.push(req.files.images) ;
        }
        for (let image of imagesTable) {
            let fileName = uuidv4() + path.extname(image.name) ;
            let uploadPath = uploadDirectory + "/" + fileName ;
            product.images.push({path:"/images/products/"+fileName}) ;
            image.mv(uploadPath,function(err){
                if(err){
                    return res.status(500).send(err) ;
                }
            })
            
        }
        await product.save() ;
        return res.send("Files Uploaded!") ; 
    } catch (error) {
        next(error) ;
    }
}

const adminDeleteProductImage = async (req,res) => {
    try {
        const imagePath = decodeURIComponent(req.params.imagePath) ;
        const path = require("path") ;
        const finalPath = path.resolve("../frontend/public") + imagePath ;
        const fs = require("fs") ;
        fs.unlink(finalPath,(err) => {
            if(err){
                res.status(500).send(err) ;
            }
        })
        await Product.findOneAndUpdate(
            { _id : req.params.productId },
            { $pull : { images : { path : imagePath } } } )
            .orFail() ;
        return res.end() ; 
    } catch (error) {
      next(error) ;  
    }
    //console.log(finalPath);
}

module.exports = {getProducts,getProductById , 
    getBestsellers,adminGetProducts,
    adminDeleteProduct,adminCreateProduct,
    adminUpdateProduct,adminUpload,adminDeleteProductImage} ;
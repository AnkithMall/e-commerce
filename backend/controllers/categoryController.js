const { syncIndexes } = require('../models/CategoryModel');
const Category = require('../models/CategoryModel') ;

const getCategories =async (req,res,next)=>{
    try{
        const categories = await Category.find({}).sort({name:"asc"}).orFail()
        res.json(categories) ;
    }catch(err){
        next(err) ;
    }
}
const newCategory = async (req,res,next) => {
    try{
        const {category} = req.body ;
        if(!category){
            res.status(400).send("Category input is required !")
        }
        const categoryExits = await Category.findOne({name:category}) ;
        if(categoryExits){
            res.status(400).send("Category already exists") ;
        }else{
            const categoryCreated = await Category.create({
                name:category
            })
            res.status(201).send({categoryCreated:categoryCreated}) ;
        }
    }catch(er){
        next(er) ;
    }
}

const deleteCategory = async (req,res,next) => {
    try{
        if(req.params.category !== "Choose category") {
            // const categoryExists = await Category.findOne({
            //     name:decodeURIComponent(req.params.category)
            // }).orFail()
            // await categoryExists.remove() ;
            await Category.deleteOne({
                name:decodeURIComponent(req.params.category)
            }).orFail()
            res.json({categoryDeleted:true})
        }
    }catch(err){
        next(err);
    }
}

const saveAttr = async (req,res,next) => {
    const {key,val,categoryChoosen} = req.body ;
    if( !key || !val || !categoryChoosen ){
        return res.status(400).send("All input is required !") ;
    }
    try {
        const category = categoryChoosen.split("/")[0] ;
        const categoryExists = await Category.findOne({name:category}).orFail() ;
        if(categoryExists.attrs.length > 0){
            var keyDoesNotExistsInDatabase = true ;
            categoryExists.attrs.map((item,idx) => {
                if(item.key === key){
                    keyDoesNotExistsInDatabase = false ;
                    var copyAttributeValues = [...categoryExists.attrs[idx].value] ;
                    copyAttributeValues.push(val) ;
                    var newAttributeValues = [...new Set(copyAttributeValues)]
                    categoryExists.attrs[idx].value = newAttributeValues ;
                }
            })
            if(keyDoesNotExistsInDatabase){
                categoryExists.attrs.push({key:key,value:[val]})
            }
            await categoryExists.save() ;
            let cat = await Category.find({}).sort({name:"asc"}) ;
            return res.status(201).json({categoriesUpdated:cat})
        }else{

        }
    } catch (error) {
        next(error)
    }
}

module.exports = {getCategories,newCategory,deleteCategory,saveAttr} ;
const User = require("../models/UserModel");
const { use } = require("../routes/productRoutes");
const { hashPassword ,comparePasswords} = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken") ;
const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select("-password");
        return res.json(users);
    } catch (error) {
        next(error);
    }
}

const registerUser = async (req, res, next) => {
    try {
        const { name, lastName, email, password } = req.body;
        if (!(name && lastName && email && password)) {
            return res.status(400).send("All Inputs are Required !");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send("User Already Exists!");
        } else {
            const hashedPassword = hashPassword(password);
            const user = await User.create({
                name, lastName, email: email.toLowerCase(), password: hashedPassword
            });
            res
                .cookie("access_token", generateAuthToken(user._id,user.name,user.lastName,user.email,user.isAdmin), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict"
                })
                .status(201).json({
                    success: "User Created",
                    userCreated: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    }
                });
        }
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req,res,next) => {
    try {
        const { email, password, doNotLogout } = req.body ;
        if(!(email && password)){
            return res.status(400).send("All Input Are Required!") ;
        }
        const user = await User.findOne({email}).orFail() ;
        if(user && comparePasswords(password,user.password)){
            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite:"strict"
            }
            if(doNotLogout){
                cookieParams = {...cookieParams,maxAge:1000*60*60*24*7} ;
            }
            return res.cookie("access_token",
            generateAuthToken(
                user._id,
                user.name,
                user.lastName,
                user.email,
                user.isAdmin
            ),cookieParams)
            .json(
                { 
                    success: "User Logged In !" ,
                    userLoggedIn: {
                        _id: user._id,
                        name:user.name,
                        lastName: user.lastName,
                        email:user.email,
                        isAdmin: user.isAdmin,
                        doNotLogout
                    }
                }) ;
        }else{
            return res.status(401).send("Wrong Credentials !") ;
        }
    } catch (error) {
        next(error) ;
    }
}

const updateUserProfile = async (req,res,next) => {
    try {
        const user = await User.findById(req.user._id).orFail() ;
        user.name = req.body.name || user.name ;
        user.lastName = req.body.lastName || user.lastName ;
        user.phoneNumber = req.body.phoneNumber ;
        user.address = req.body.address ;
        user.country = req.body.country ;
        user.zipCode = req.body.zipCode ;
        user.city = req.body.city  ;
        user.state = req.body.state  ;
        if(req.body.password !== user.password){
            user.password = hashPassword(req.body.password) ;
        }
        await user.save() ;

        res.json({
            success:"User Updated",
            userUpdated:{
                _id:user._id,
                name:user.name,
                lastName:user.lastName,
                email:user.email,
                isAdmin:user.isAdmin,
            },
        });
    } catch (error) {
        next(error) ;
    }
} 

const getUserProfile = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id).orFail() ;
        return res.send(user) ;
    } catch (error) {
        next(error) ;
    }
}

const writeReview = async (req,res,next) => {
    try {
        const session = await Review.startSession() ;
        const { comment , rating } = req.body ;
        
        if(!(comment && rating)){
            return res.status(400).send("All Inputs Are Required !") ;
        }
        
        const ObjectId = require("mongodb").ObjectId ;
        let reviewId = new ObjectId() ;
        
        session.startTransaction() ;
        await Review.create([{
            _id: reviewId,
            comment: comment,
            rating: Number(rating),
            user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName },
        }],{ session: session }) ;
        
        const product = await Product.findById(req.params.productId).populate("reviews").session(session) ;
        
        const alreadyReviewed = product.reviews.find((r) => r.user._id.toString() === req.user._id.toString()) ;
        
        if(alreadyReviewed){
            await session.abortTransaction() ;
            session.endSession();
            return res.status(400).send("Product Already Reviewed !");
        }

        let prc = [...product.reviews] ;
        
        prc.push({ rating: rating });
        product.reviews.push(reviewId) ;
        
        if(product.reviews.length === 1){
            product.rating = Number(rating) ;
            product.reviewsNumber = 1 ;
        }else{
            product.reviewsNumber = product.reviews.length;
            product.rating = prc.map(item => Number(item.rating)).reduce((sum,item) => sum+item,0) / product.reviews.length ;
        }
        
        await product.save() ;

        await session.commitTransaction() ;
        session.endSession();
        
        res.send('Review Created !');

    } catch (error) {
        await session.abortTransaction();
        session.endSession() ;
        next(error) ;
    }
}

const getUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id).select("name lastName email isAdmin").orFail() ;
        return res.send(user) ;
    } catch (error) {
        next(error) ;
    }
}

const updateUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params._id).orFail() ;

        user.name = req.body.name || user.name ;
        user.lastName = req.body.lastName || user.lastName ;
        user.email = req.body.email || user.email ;
        user.isAdmin = req.body.isAdmin || user.isAdmin ;

        await user.save() ;

        res.send("User Updated !");
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req,res,next) => {
    try {
        const user = await User.deleteOne({_id:req.params.id}).orFail() ;
        res.send("User Removed !") ;
    } catch (error) {
        next(error);
    }
}

module.exports = { getUsers, registerUser ,loginUser ,updateUserProfile , getUserProfile, writeReview, getUser, updateUser, deleteUser};
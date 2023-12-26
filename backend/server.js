const express = require('express')
const apiRoutes = require('./routes/apiRoutes') ;
const fileUpload = require('express-fileupload') ;
const cookieParser = require("cookie-parser") ;

const app = express() ;
const port = 3001 ;
app.use(cookieParser()) ;
app.use(express.json()) ;
app.use(fileUpload()) ;

app.get('/', async (req, res) => {
  res.json({message:"API"})
})

//DB connection
const connectDB = require('./config/db') ;
connectDB() ;

app.use('/api',apiRoutes);

app.use((error,req,res,next)=>{
  if (process.env.NODE_ENV === "development") {
    console.error(error);
    
  }
  next(error);
})

app.use((error,req,res,next)=>{
  if (process.env.NODE_ENV === "development"){
    res.status(500).json({
      message:error.message,
      stack:error.stack
    })
  }else{
    res.status(500).json({
      message:error.message
    })
  }
})

app.listen(port, () => {
  console.log(`E-Comm app listening on port ${port}`)
})
const express = require('express')
const morgan  = require('morgan')
const fs = require('fs')
const path = require('path')
const {PORT} = require('./config')
const app  = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('tiny'))


// All Routes
fs.readdir(path.join(__dirname, 'routes'), (err, files)=>{
    files.forEach(file=>{
        let filePath = path.join(__dirname, 'routes', file)
        let Router = require(filePath)
        if(Router.path && Router.router){
            app.use(Router.path, Router.router)
        }
    })
})

// SERVER
app.listen(PORT, ()=>{
    console.log('SERVER IS READY ON PORT ', PORT)
})


//get courses
//post courses
//delete course
//update course
//each course
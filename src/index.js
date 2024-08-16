// require('dotenv').config({path : './env'})
import dotenv from "dotenv"

import express from "express"
import connectDB from "./db/index.js"

const app = express();
dotenv.config({
  path: './env'
})


connectDB().then(() => {

  // app.on("error", (error) => {
  //   console.log("ERRR:", error);
  //   throw error
  // })  

  app.listen(process.env.PORT || 8000, () => {
    console.log(`the port is working ${process.env.PORT}`)

  })
}).catch((err) => { 
  console.log("there is some error", err)
})



























// ( async () => {
//   try{
//    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//    app.on("error", (error) => {
//     console.log("ERR:", error);
//     throw error
//    })

//    app.listen(process.env.PORT, () => {
//     console.log("port is listeing on ")
//   })

//   } catch (error){
//     console.error("ERROR: ", error)
//     throw err
//   }
// })()


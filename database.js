 const mongoose = require('mongoose')
 
 //Mongoose

 function connectToDatabase(){ 

 mongoose.connect("mongodb+srv://Watson:watsonmongodb12345678@cluster0.qy24r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })

  const db = mongoose.connection
  db.on("error",(error)=>{
    console.error(error)
  })
  db.once("open", ()=>console.log("Conectado a base de dados na nuvem!!!!"))
}

module.exports = connectToDatabase;
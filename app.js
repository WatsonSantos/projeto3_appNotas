require("dotenv").config();
const bodyParser = require('body-parser')
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const admin = require("./routes/admin")
const path = require("path")
const { Mongoose } = require('mongoose')
const mongoose = require("mongoose")
const Cadeira = mongoose.model("cadeiras")
const session = require("express-session")
const flash = require("connect-flash")
const usuarios = require("./routes/usuario") //importando a rota de usuários
const passport = require("passport")
require("./config/auth")(passport)

const connectToDatabase = require('./database')

//Configurações

  //Sessão 

  app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true

  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(flash())

  //Middleware
      app.use((req, res, next)=>{
        //craindo variável global usando locals
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg") 
        next()
      })

  //Body Parser
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  //Handlebars
  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
  app.set('view engine', 'handlebars')

 //Base de Dados
 connectToDatabase();

  //Public
    
  app.use(express.static(path.join(__dirname,"public")))

  //Middlewares
  app.use((req, res, next)=>{

    console.log("..........")

    next() //manda passar a requisição

    //cada vez que carrego uma página o middleware é chamado

  })



//Rotas
    
app.get('/', (req, res)=>{
  Cadeira.findOne().find().lean().then((cadeiras)=>{
    res.render("admin/cadeiras", {cadeiras: cadeiras})

}).catch((err)=>{
    req.flash("error_msg", "Houve um erro ao listar as cadeiras")
    res.redirect("/admin")
})
})

app.use('/admin', admin)
app.use("/usuarios", usuarios) 

//Outros
const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta "+PORT)
})
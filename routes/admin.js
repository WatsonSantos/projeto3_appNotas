const express = require('express')
const router = express.Router() 
const mongoose = require("mongoose")
require("..//models/Cadeira")
const Cadeira = mongoose.model("cadeiras")
const {eAdmin} = require("../helpers/eAdmin")


router.get('/', (req, res)=>{
    res.render("admin/index")
})

router.get('/cadeiras', (req, res)=>{
   
    Cadeira.findOne().find().lean().then((cadeiras)=>{
        res.render("admin/cadeiras", {cadeiras: cadeiras})

    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar as cadeiras")
        res.redirect("/admin")
    })
    
})

//Rota para cadastrar aluno

router.post("/cadeiras/novo", (req, res)=>{

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto:"Nome inválido"})
    }

    if(!req.body.teste1 || typeof req.body.teste1  == undefined || req.body.teste1  == null || req.body.teste1  >20 || req.body.teste1  < 0){
        erros.push({texto:"Nota inválida"})
    }

    if(!req.body.teste2 || typeof req.body.teste2  == undefined || req.body.teste2  == null || req.body.teste2 >20 || req.body.teste2  < 0){
        erros.push({texto:"Nota inválida"})
    }
    if(!req.body.trabalho1 || typeof req.body.trabalho1  == undefined || req.body.trabalho1  == null || req.body.trabalho1  >20 || req.body.trabalho1  < 0){
        erros.push({texto:"Nota inválida"})
    }
    if(!req.body.trabalho2|| typeof req.body.trabalho2 == undefined || req.body.trabalho2  == null || req.body.trabalho2  >20 || req.body.trabalho2  < 0){
        erros.push({texto:"Nota inválida"})
    }

    if(erros.length > 0){
        res.render("admin/addcadeiras",{erros: erros})
    }else{

        const novoCadeira = {
            
            nome: req.body.nome,
            teste1: req.body.teste1,
            teste2: req.body.teste2,
            trabalho1: req.body.trabalho1,
            trabalho2: req.body.trabalho2

        }
          
    
        new Cadeira(novoCadeira).save().then(()=>{
            req.flash("success_msg", "Criado com sucesso")
            res.redirect("/admin/cadeiras")
        }).catch((erro)=>{
            req.flash("error_msg", "Houve um erro ao salvar ,  tente novamente")
            res.redirect("/admin")
        })
    }
})


//Rota para edção de 
router.get("/cadeiras/edit/:id", (req, res)=>{
    Cadeira.findOne({_id:req.params.id}).lean().then((cadeira)=>{
        res.render("admin/edicadeiras",{cadeira: cadeira} )
    }).catch((err)=>{
        req.flash("error_msg","Esta cadeira não exite!")
        res.redirect("/admin/cadeiras")
    })
    
})

router.get('/cadeiras/add', (req, res)=>{
    res.render("admin/addcadeiras")
})

router.post("/cadeiras/edit", (req, res)=>{
    Cadeira.findOne({_id: req.body.id}).then((cadeira)=>{

        cadeira.nome = req.body.nome,
        cadeira.teste1 = req.body.teste1,
        cadeira.teste2 = req.body.teste2,
        cadeira.trabalho1 = req.body.trabalho1,
        cadeira.trabalho2 = req.body.trabalho2

        cadeira.save().then(()=>{
            req.flash("success_msg", "Cadeira editada com sucesso!")
            res.redirect("/admin/cadeiras")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da cadeira")
            res.redirect("/admin/cadeiras")
        })
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar a cadeira")
        res.redirect("/admin/cadeiras")
    })
})


router.post("/cadeiras/deletar", (req, res)=>{
    
    Cadeira.deleteOne({__id: req.body.id}).then(()=>{
        req.flash("success_msg", "Cadeira deletada com sucesso")
        res.redirect("/admin/cadeiras")
        
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao tentar deletar a cadeira")
        res.redirect("/admin/cadeiras")
    })
})


module.exports = router
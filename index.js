const express=require("express")
const mongoose=require('mongoose')
const path=require('path')
const bodyParser=require('body-parser')

mongoose.connect("mongodb://localhost/shinchan")
let db=mongoose.connection


db.on('error',(err)=>{
  console.log(err)
})
db.once('open',()=>{
  console.log('database is running')
})

const app=express();
let Article=require('./model/article')

app.set('views',path.join(__dirname ,'views'))
app.set('view engine','pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/' ,(req,res)=>{
  Article.find({},(err,articles)=>{
    if(err) console.log(err)

    res.render('index',{
      title:"article",
      articles:articles
    })
    
  })

})
app.get('/articles/add' ,(req,res)=>{
  res.render('add_articles',{
    title:"article",
    
  })
  
})

  app.post('/articles/add',(req,res)=>{
    let article=new Article()
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;
    article.save((err)=>{ 
      if(err){ console.log(err) 
      return
      }
      else{
      res.redirect('/articles/add')
      }
    }) 
  })   

app.get('/article/:id',(req,res)=>{
  Article.findById(req.params.id,(err,article)=>{
    if(err) console.log(err)
    res.render('article',{
      article:article
    })

  })
})  
app.get('/articles/edit/:id',(req,res)=>{
  Article.findById(req.params.id,(err,article)=>{
    if(err) console.log(err)
    res.render('article_update',{
      article:article
    })

  })
})  

 
app.post('/articles/edit/:id',(req,res)=>{
  let article={};
  article.title=req.body.title;
  article.author=req.body.author;
  article.body=req.body.body;
  let querry={_id:req.params.id}
  Article.update(querry,article,(err)=>{
    if(err){ console.log(err) 
    return
    }
    else{
    res.redirect('/')
    }
  }) 
})  

app.listen(3000,(err)=>{
  if(err) console.log(err)

  console.log("listening on port 3000...")
})
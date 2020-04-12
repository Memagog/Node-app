const express = require("express");
const PORT  = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const path = require('path');
const todoRoutes = require('./routes/todos');
const app = express()

const hbs = exphbs.create({
    defaultLayout:'main',
    extname: 'hbs'
})



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(todoRoutes);

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname,'public')));


async function start(){
    try {
      await mongoose.connect('mongodb+srv://Memagog:123456q@cluster0-xyrvp.mongodb.net/todos', {
          useNewUrlParser:true,
          useFindAndModify:false,
          useUnifiedTopology: true
      })  
      app.listen(PORT,()=>{
        console.log("server started...")
    })
    } catch (e) {
        console.log(e)
    }
}
start()
const mongoose = require('mongoose');

const db = process.env.DATABASE;

mongoose.connect(db,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,   
    useUnifiedTopology:true
}).then(()=>{
    console.log(`connection succefull`)
}).catch((err)=>{  
    console.log(`noconnecction`); 
});
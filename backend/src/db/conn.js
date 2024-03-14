const mongoose  =  require("mongoose");

mongoose.connect("mongodb://localhost:27017/NewChatApplication")
.then(()=>{
    console.log("mongoDB Connected");
})
.catch(() =>{
    console.log("error");
})


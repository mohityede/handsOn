const mongoose = require("mongoose");

// db connection
mongoose.connect("mongodb://localhost:27017/SellAndBuy", {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log("mongodb database connected!"))
.catch((err)=> console.log("database connection error: ",err));

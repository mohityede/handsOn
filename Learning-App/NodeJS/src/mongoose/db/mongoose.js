const mongoose = require("mongoose");

//connection to database
mongoose.connect("mongodb://127.0.0.1:27017/learning-app-easy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})
.then(()=> console.log("Database is connected!"))
.catch((err)=> console.log("Error in database connection"));

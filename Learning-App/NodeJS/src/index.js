const app = require("./app");
const database = require("../test/utils/testDB");

// database.setUpDatabase();

//making app to listen on port 8001
app.listen(8001, () => {
    console.log("App is running on port 8001");
});
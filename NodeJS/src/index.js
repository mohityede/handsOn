const app = require("./app");
const data = require("../test/utils/testDB");

app.listen(8001, () => {
  console.log("App is running on port 8001");
});
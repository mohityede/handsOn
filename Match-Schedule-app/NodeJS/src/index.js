const app = require("./app");
// require("./db/defaultDB");

app.listen(8001, () => {
  console.log("App is running on port 8001 " + new Date());
});

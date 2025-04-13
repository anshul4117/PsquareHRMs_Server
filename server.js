const app = require("./app");
const connectToDatabase = require("./db/db");
require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 9000;

(async () => {
  connectToDatabase()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
})();



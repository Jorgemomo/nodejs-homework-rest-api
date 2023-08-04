const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST || "momgodb://127.0.0.1:27017/test")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connected successfully`);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

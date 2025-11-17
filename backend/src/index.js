// src/index.js
import dotenv from "dotenv";
import db from "./database/db.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });

console.log(`${process.env.DB_NAME}`);

db()
  .then(() => {
    const PORT = Number(process.env.PORT) || 8000;
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("mongodb connection failed !!!", err);
    process.exit(1);
  });

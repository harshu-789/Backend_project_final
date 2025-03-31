import 'dotenv/config'; 
import connectDB from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection failed:", err);
    process.exit(1); // Exit the process if DB connection fails
  });

import app from "./app.js";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import { seedAdmin } from "../src/seeds/admin.seed.js";

dotenv.config();

// connectDB
await connectDB();

// seed admin
await seedAdmin();


const PORT=process.env.PORT || 5000
app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT} 🖥 `);
    });
  
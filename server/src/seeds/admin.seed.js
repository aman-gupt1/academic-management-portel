import User from "../models/User.js";
import { hashPassword } from "../service/password.service.js";

export const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({
      role: "admin",
    });

    if (adminExists) {
      console.log("Admin already exists ✅");
      return;
    }

    const hashedPassword = await hashPassword(
      process.env.DEFAULT_ADMIN_PASSWORD
    );

    await User.create({
      name: process.env.DEFAULT_ADMIN_NAME,
      email: process.env.DEFAULT_ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Default admin created ✅");

  } catch (error) {
    console.error("Admin Seed Error:", error);
  }
};
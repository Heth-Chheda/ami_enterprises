import express from "express";
import { seedData } from "../data/seed.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await seedData();
    res.status(200).json({ success: true, message: "Data seeded successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

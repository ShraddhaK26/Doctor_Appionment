import express from "express";
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

// Register
userRouter.post("/register", registerUser);

// Login
userRouter.post("/login", loginUser);

// Get profile (protected)
userRouter.get("/get-profile", authUser, getProfile);

// Update profile (protected + file upload)
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);

userRouter.post('/book-appointment',authUser,bookAppointment)

userRouter.get('/appointments',authUser, listAppointment)

export default userRouter;


import express from  'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import sendEmail from './email/sendMail.js'


// imports 
import User from './models/User.js'
import Jobs from './models/Jobs.js'
import { loginUser } from './apis/userApis/loginUser.js'
import { userData } from './apis/userApis/userData.js'
import { requestAccess } from './apis/requestAccess/requestAccess.js'
import { forgotPassword } from './apis/forgotPasswordApis/forgotPassword.js'
import { getForgotPassword } from './apis/forgotPasswordApis/getForgotPassword.js'
import { postForgotPassword } from './apis/forgotPasswordApis/postForgotPassword.js'
import { getAllUsers } from './apis/userApis/getAllUsers.js'
import { addNewJob } from './apis/jobsApis/newJob.js'
// import { updateJob } from './apis/jobsApis/updateJob.js'
// import { deleteJob } from './apis/jobsApis/deleteJob.js'


/* ------------------------------------------- */


// config 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set("view engine","ejs");
app.use(express.urlencoded( {extended: false } ))

// ENV VARS 
const JWT_SECRET = process.env.JWT_SECRET;
// const APP_URL = process.env.APP_URL
// const pw = process.env.EMAIL_PASS;


// Routes
app.use("/api/client", clientRoutes ); // change to customers later??
app.use("/api/general", generalRoutes );
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);



// THIS VERIFY THE TOKEN
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Replace 'your-secret-key' with your actual secret key
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
// --------------------------------------------------------


// REQUEST ACCESS 
app.post('/api/request-access', requestAccess);
// --------------------------------------------------------

// LOGIN 
app.post("/api/login", loginUser);

// --------------------------------------------------------

// USER DATA 
app.post("/api/userData", userData);

// --------------------------------------------------------

// GET ALL USERS 
app.get("/api/user/getUsers", getAllUsers);

// --------------------------------------------------------

// JOBS API
app.post("/api/jobs/addJob", addNewJob);
// app.put('/api/jobs/updateJob/:id', verifyToken, updateJob);
// app.delete('/api/jobs/delete/:id', verifyToken, deleteJob)

// --------------------------------------------------------

// FORGOT PASSWORD 
app.post("/forgot-password", forgotPassword)
app.get("/reset-password/:id/:token",getForgotPassword)
app.post("/reset-password/:id/:token", postForgotPassword)
  
// database
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // User.insertMany(dataUser)

}).catch((error) => console.log(`${error} did not connect`));

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
// const JWT_SECRET = process.env.JWT_SECRET;
// const APP_URL = process.env.APP_URL
// const pw = process.env.EMAIL_PASS;


// Routes
app.use("/api/client", clientRoutes ); // change to customers later??
app.use("/api/general", generalRoutes );
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);


// REQUEST ACCESS 
app.post('/api/request-access', requestAccess);

// LOGIN 
app.post("/api/login", loginUser);

// USER DATA 
app.post("/api/userData", userData)



// FORGOT PASSWORD 
app.post("/forgot-password", forgotPassword)
app.get("/reset-password/:id/:token",getForgotPassword)
app.post("/reset-password/:id/:token", postForgotPassword)
  
  // TEST 
// database
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // User.insertMany(dataUser)

}).catch((error) => console.log(`${error} did not connect`));

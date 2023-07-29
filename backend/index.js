import express from  'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import  jwt  from 'jsonwebtoken'


// imports 
import { loginUser } from './apis/userApis/loginUser.js'
import { userData } from './apis/userApis/userData.js'
import { requestAccess } from './apis/requestAccess/requestAccess.js'
import { forgotPassword } from './apis/forgotPasswordApis/forgotPassword.js'
import { getForgotPassword } from './apis/forgotPasswordApis/getForgotPassword.js'
import { postForgotPassword } from './apis/forgotPasswordApis/postForgotPassword.js'
import { getAllUsers } from './apis/userApis/getAllUsers.js'
import { addNewJob } from './apis/jobsApis/newJob.js'
import { addCustomer } from './apis/customers/addCustomer.js'
import { getAllCustomers } from './apis/customers/getAllCustomers.js'
import { getCustomerById } from './apis/customers/getCustomerById.js'
import { updateCustomer } from './apis/customers/updateCustomer.js'
import { removeUser } from './apis/userApis/removeUser.js'
import { verifyUser } from './apis/userApis/verifyUser.js'
import { changeRole } from './apis/userApis/changeRole.js'
import { getAllJobs } from './apis/jobsApis/getJobs.js'
import { getUserById } from './apis/userApis/getUserById.js'


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

// ENV VARS 
const JWT_SECRET = process.env.JWT_SECRET;
// const APP_URL = process.env.APP_URL
// const pw = process.env.EMAIL_PASS;


// Routes



// THIS VERIFY THE TOKEN
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
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

// USER APIS 
app.get("/api/userData", verifyToken ,userData);
app.get("/api/user/getUser/:id", verifyToken, getUserById)
app.get("/api/user/getUsers",verifyToken ,getAllUsers);
app.delete('/api/user/remove/:id', verifyToken ,removeUser);
app.put('/api/user/verify/:id', verifyToken ,verifyUser);
app.put('/api/user/changeRole/:id/:role',verifyToken, changeRole);

// --------------------------------------------------------

// JOBS API
app.post("/api/jobs/addJob", verifyToken ,addNewJob);
app.get("/api/jobs/getJobs", verifyToken, getAllJobs)
// app.put('/api/jobs/updateJob/:id', verifyToken, updateJob);
// app.delete('/api/jobs/delete/:id', verifyToken, deleteJob)

// --------------------------------------------------------

// CUSTOMER APIS
app.post("/api/customers/addCustomer",verifyToken,addCustomer);
app.get("/api/customers/getCustomers",verifyToken ,getAllCustomers);
app.get("/api/customers/id/:id", verifyToken,getCustomerById);
app.put("/api/customers/updateCustomer/:id",verifyToken ,updateCustomer);

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

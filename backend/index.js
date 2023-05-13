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


// test data import
import User from './models/User.js'
import { dataUser } from './data/index.js'


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
const APP_URL = process.env.APP_URL
const pw = process.env.EMAIL_PASS;


// Routes
app.use("/api/client", clientRoutes ); // change to customers later??
app.use("/api/general", generalRoutes );
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);


// REQUEST ACCESS 

const user = mongoose.model('User');

app.post('/api/request-access', async (req, res) => {
  const { name, email, password, isVerifed } = req.body;

  const encryptedPassword = await bcrypt.hashSync(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if(oldUser){
        return res.send({ error: "User Already exists "});
    }
    const newUser = await user.create({
      name,
      email,
      password: encryptedPassword,
      isVerifed,
    });
    res.send({ status: 'ok', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to create user' });
  }
});



// LOGIN 
app.post("/api/login", async(req, res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user){
        return res.json({ error: "User does not exists"});
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(passwordMatch){
        const token = jwt.sign({}, JWT_SECRET);

        if(res.status(201)){
            return res.json({status: "ok", data: token});
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({status: "error", error: "Incorrect password"});
})

// USER DATA 

app.post("/api/userData", async(req, res)=>{
    const {token}= req.body;
    try{
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;
        User.findOne({ email: userEmail }).then((data)=>{
            res.send({status: "ok", data:"data"});
        }).catch((error)=>{
            res.send( {status:"error", data: "error"});
        })
    } catch(error){}

})



// FORGOT PASSWORD 
app.post("/forgot-password", async(req, res)=>{
    const {email}=req.body;
    try{
        const oldUser = await User.findOne({ email })
        if(!oldUser){
            return res.json({ status: "User Does Not exist" });
        }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id },secret,{
        expiresIn: "5m", 
    });
    const link =`${APP_URL}/reset-password/${oldUser._id}/${token}`;
    sendEmail(pw, "fineaiden@gmail.com", link);

    }catch (error){

    }
});


app.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  });

app.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
  
      res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  });
  








// database
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // User.insertMany(dataUser)

}).catch((error) => console.log(`${error} did not connect`));

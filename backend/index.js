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


// test data import
import User from './models/User.js'
import { dataUser } from './data/index.js'


/* ------------------------------------------- */

const JWT_SECRET = `${process.env.JWT_SECRET}`;


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

// Routes
app.use("/api/client", clientRoutes ); // change to customers later??
app.use("/api/general", generalRoutes );
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);

// REQUEST ACCESS 

const user = mongoose.model('User');

app.post('/api/request-access', async (req, res) => {
  const { name, email, password } = req.body;

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
        return res.json({ error: "User not found"});
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
    res.json({status: "error", error: "wrong password"});
})









// database
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // User.insertMany(dataUser)

}).catch((error) => console.log(`${error} did not connect`));

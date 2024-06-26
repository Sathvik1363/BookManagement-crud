import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express'

// import { PORT , mongourl } from './congig.js';
import mongoose from 'mongoose';
import bookRoute from './routes/bookRoutes.js'
import cors from 'cors'


const app = express();
app.use(express.json())


// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

app.get('/', async (req,res)=>{
    return res.status(201).send("Welcome to Book Management");
})  

app.use('/books', bookRoute);
let port = process.env.PORT;
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("server connected to Database");
        app.listen( port , ()=>{
            console.log(`server running at port :${port}`);
        });
        

    })
    .catch((error)=>{
        console.log(error);
    })
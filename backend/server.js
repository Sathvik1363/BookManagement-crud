import express from 'express'
import { PORT , mongourl } from './congig.js';
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

mongoose.connect(mongourl)
    .then(()=>{
        console.log("server connected to Database");
        app.listen( PORT , ()=>{
            console.log(`server running at port :${PORT}`);
        });
        

    })
    .catch((error)=>{
        console.log(error);
    })
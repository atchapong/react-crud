import cors from 'cors';
import express from 'express';
import routes from './routes/user';
import dotenv from 'dotenv';
import connectMongo from './models/connect';
const app = express();
const connectDB = new connectMongo();

// Load environment variables from .env file
dotenv.config();

app.use(express.json());
app.use(cors())
app.use('/api', routes); // Mount the routes under the '/api' prefix

connectDB.connectDB().then(() => {
    try {
        app.listen(process.env.PORT || 8089, () => {
            setTimeout(() => {
            }, 1000)
            console.log(`Server is running on port ${process.env.PORT || 8089}`);
        });
    } catch (error) {
        console.log(error)
    }
}).catch((error:any)=> {
    throw error
})



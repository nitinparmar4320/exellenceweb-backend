import mongoose from 'mongoose';
import { evnVar } from '../helpers/envConfig';

const mongoUrl = evnVar.MONGO_URL as string;
console.log(mongoUrl);
mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch((error) => {
        console.log('Error in db connection', error);
    });

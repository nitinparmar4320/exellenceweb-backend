import express, { Application } from 'express'
import router from './routes/index.routes';
import cors from 'cors';
import { evnVar } from './helpers/envConfig';
import { seedProducts } from './controllers/product.controller';

const app: Application = express()
import('./configs/db');

app.use(express.json());
app.use(cors())

app.use("/api", router)

seedProducts()

app.listen(evnVar.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${evnVar.PORT}`);
});
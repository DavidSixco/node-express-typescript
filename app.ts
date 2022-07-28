import express from 'express';
import { dbCoinnection } from './database/config';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/auth';
dotenv.config();

const app = express();
dbCoinnection();

//CORS
app.use(cors())
//Parseando todas las peticiones a formato json
app.use(express.json());
//estableciendo directorio publico
app.use(express.static('public'));
//agregando routes para la autenticacion
app.use('/api/auth', routes);
//lectura y parseo de json


app.listen(process.env.PORT, () => {
    console.log(`Server initialized in port ${process.env.PORT}`);
})
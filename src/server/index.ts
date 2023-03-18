require('dotenv').config();
import config from './config';
import ExpressConfig from './app';
import api from './api/api';
import connectToDB from './db';
import { Sequelize } from 'sequelize';

const app = ExpressConfig()

app.use('/api', api);

let db: Sequelize;
connectToDB().then((sql) => {
    db = sql;
}).then(() => {
    app.listen(config.port, () => console.log("Server Running on Port " + config.port));
});

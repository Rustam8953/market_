require('dotenv').config();
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors');
const fileupload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()

const router = require('./routes/index');
const errorHandling = require('./middleware/ErrorHandlingMiddleware');

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)
app.use(errorHandling);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start();
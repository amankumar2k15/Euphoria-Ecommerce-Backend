const mongoose = require('mongoose');
require('dotenv').config();
const connection_string = process.env.MONGODB_STRING

const dataBaseConnect = () => {
    mongoose.connect(connection_string,
        {
            //useUnifiedTopology: true,
            //useNewUrlParser: true,
            autoIndex: true, //make this also true
        }).then((res) => {
            console.log('Data base connected ')
        }).catch((err) => console.log(err.message))
}

module.exports = dataBaseConnect
require('dotenv').config({path: '/Users/georgezeng/Documents/Projects/day-job/.env'});
const mongoose = require('mongoose')

function connect() {

    const uri = process.env.ATLAS_URI;

    mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true}, );
    mongoose.connection.once('open', () => {
        console.log("MongoDB connection established successfully!")
    }).on('error', (error)=> {
        console.log("error: ", error)
    })
}

module.exports.connect = connect
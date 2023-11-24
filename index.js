var express = require('express')
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser')
const dataBaseConnect = require('./helper/db');
const PORT = process.env.PORT || 8000;
const route = require('./routes/index')


//with use of this our appliction will be abel to accept json inputs
app.use(express.json({ limit: 52428800 })); //this is 50mb in bytes
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb' //this is 50mb in bytes
}));

app.use("/uploads", express.static("uploads"))
// creating server 

const server = app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`))
app.get('/', (req, res) => res.send(`Server is up and running on port ${PORT}`))

// main routes 
app.use('/api', route)


//unexpected error handling
process.on("uncaughtException", (err) => {
    console.log(`Logged Error from index js: ${err.stack}`);
    server.close(() => process.exit(1));
})



// database connection 
dataBaseConnect();
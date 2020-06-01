const path = require('path')
// Require Express to run server and routes
const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
// Setup empty JS object to act as endpoint for all routes
projectData = {};
require.extensions['.scss'] = function () {}



// Start up an instance of app

// set server using express
const app = express()


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//configure cors
app.use(cors())

// Initialize the main project folder
const publicDirectoryPath = path.join(__dirname, '../client/views')
app.use(express.static(publicDirectoryPath));


// mock api
let mockAPIResponse = {
    'title': 'test json message',
    'message': 'this is a message',
    'time': 'now'
}

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})



// Setup Server
app.listen(8080, () => {
    console.log('Server is up on port 8080.')
})
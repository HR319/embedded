const connectTomongo = require('./db');

connectTomongo();
var cors = require('cors')
const express = require('express')
const app = express()
const port = 5000

app.use(cors()) // this is needed because browser directly can not fetch api from local host
app.use(express.json()); //to reflect req.body - to mount/put middleware function
//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
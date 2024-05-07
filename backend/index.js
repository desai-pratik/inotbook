const connectToMongo = require('./db');
const express = require('express'); 
const cors = require('cors'); 

connectToMongo();

const app = express();
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use(express.json())
app.use(cors())

// Available Notess
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



// run this s project command = nodemon .\index.js
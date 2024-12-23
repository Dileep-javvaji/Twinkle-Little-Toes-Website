const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to your MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/myDB', { useNewUrlParser: true, useUnifiedTopology: true });
const Todo = mongoose.model('User', {
  fullname: String,
  email: String,
  phno: Number,
  pincode: Number,
  state: String,
  city: String,
  address: String,
  size: Number,
  color: String,
  qnt: Number,
  payment: String
});

// Serve your HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/delete.html');
});

// Handle the form submission
app.post('/delete', (req, res) => {
  const recordId = req.body.name;
  // Use Mongoose to delete the record by its ID using deleteOne
  Todo.deleteOne({fullname: recordId }, (err) => {
    if (err) {
      res.send('Error deleting record');
    } else {
      res.send('Record deleted successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

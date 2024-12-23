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
  res.sendFile(__dirname + '/update.html');
});

// Handle the form submission to update a record
app.post('/update', (req, res) => {
  const emailid = req.body.emailid;
  const newadd = req.body.newadd;
  const newcol = req.body.newcol;
  const newqnt =req.body.newqnt;

  // Use Mongoose to update the record by its ID using updateOne
  Todo.updateOne({email: emailid }, {address: newadd, color: newcol, qnt: newqnt }, (err) => {
    if (err) {
      res.send('Error updating record');
    } else {
      res.send('Records updated successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

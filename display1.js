const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId from mongoose

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Set up the connection to your MongoDB database
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

// Serve the HTML page to specify the record to display
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/display.html');
});

// Handle the form submission to display data for a specific record
app.post('/display', (req, res) => {
  const emailid = req.body.emailid;
  // Use Mongoose to find the specific record by its ID
  Todo.findOne({ email: emailid }, (err, user) => {
    if (err) {
      res.send('Error finding user');
    } else if (!user) {
      res.send('User not found');
    } else {
      res.send(`
      <html>
      <head>
      <title>Display Record</title>
      </head>
      <body align="center">
        <h1>Record Details</h1>
        <table border="2" align="center" cellspacing="6" cellpaddin="6">
          <tr>
            <td>Full name</td>
            <td>${user.fullname}</td>
          </tr>
          <tr>
            <td>Email id</td>
            <td>${user.email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>${user.phno}</td>
          </tr>
          <tr>
            <td>Pincode</td>
            <td>${user.pincode}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>${user.state}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>${user.city}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>${user.address}</td>
          </tr>
          <tr>
            <td>Email id</td>
            <td>${user.email}</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>${user.size}</td>
          </tr>
          <tr>
            <td>Color</td>
            <td>${user.color}</td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td>${user.qnt}</td>
          </tr>
          <tr>
            <td>Email id</td>
            <td>${user.email}</td>
          </tr>
          <tr>
            <td>Payment Mode</td>
            <td>${user.payment}</td>
          </tr>
        </table>
      </body>
    </html>
      `);
    }
  });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

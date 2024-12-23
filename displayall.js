const express = require('express');
const mongoose = require('mongoose');

const app = express();

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

// Serve an HTML page to display all records
app.get('/', (req, res) => {
  Todo.find({}, (err, records) => {
    if (err) {
      res.send('Error fetching records');
    } else {
      res.send(`
      <html>
      <head>
        <title>All Records</title>
      </head>
      <body align="center">
        <h1>All Records</h1>
        ${records.map(record => `
        <table align="center" border="2" cellpadding="3" cellspacing="6">
            <tr>
              <td>Full Name</td>  
              <td>${record.fullname}</td>
            </tr>
            <tr>
                <td>Email Id</td>  
                <td>${record.email}</td>
            </tr>
            <tr>
                <td>Phone Number</td>  
                <td>${record.phno}</td>
            </tr>
            <tr>
                <td>Pincode</td>  
                <td>${record.pincode}</td>
            </tr>
            <tr>
                <td>State</td>  
                <td>${record.state}</td>
            </tr>
            <tr>
                <td>City</td>  
                <td>${record.city}</td>
            </tr>
            <tr>
                <td>Address</td>  
                <td>${record.address}</td>
            </tr>
            <tr>
                <td>Size</td>  
                <td>${record.size}</td>
            </tr>
            <tr>
                <td>Color</td>  
                <td>${record.color}</td>
            </tr>
            <tr>
                <td>Quantity</td>  
                <td>${record.qnt}</td>
            </tr>
            <tr>
                <td>Payment Mode</td>  
                <td>${record.payment}</td>
            </tr>
        </table>
        <br><br>
        `).join('')}
      </body>
    </html>
      `);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

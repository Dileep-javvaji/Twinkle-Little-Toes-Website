const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const path = require('path');
 const Schema = mongoose.Schema;
 const app = express();
 const port = process.env.PORT || 3000;
 mongoose.set('strictQuery', false);
 // Connect to your MongoDB instance (replace 'mongodb://localhost/mydatabase' with your MongoDB URL)
 mongoose.connect('mongodb://127.0.0.1:27017/myDB', { useNewUrlParser: true, 
useUnifiedTopology: true });
 // Create a Mongoose model (schema)
 const User = mongoose.model('User', {
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
 // Middleware for parsing form data
 app.use(bodyParser.urlencoded({ extended: true }));
 // Serve the HTML form
 app.get('/', (req, res) => {
  res.sendFile(__dirname + '/DileepSoc.html');
 });
 app.get('/order', (req, res) => {
  res.sendFile(__dirname + '/home.html');
  });
 app.get('/insert', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  });
 app.get('/delete', (req, res) => {
    res.sendFile(__dirname + '/delete.html');
  });
app.get('/display1', (req, res) => {
    res.sendFile(__dirname + '/display.html');
  });
app.get('/update1', (req, res) => {
    res.sendFile(__dirname + '/update1.html');
  });
app.get('/update', (req, res) => {
    res.sendFile(__dirname + '/update.html');
  });
app.get('/displayall', (req, res) => {
    res.sendFile(__dirname + '/displayall.html');
  });
 // Handle form submission
 app.post('/insert', (req, res) => {
 const { fullname, email, phno, pincode, state, city, address,size,color,qnt,payment } = req.body;
 // Create a new User document and save it to MongoDB
 const user = new User({ fullname, email, phno, pincode, state, city, address,size,color,qnt,payment });
 user.save()
 .then(() => {
 res.send(`<html>
 <head>
 <style>
 button {
   padding: 1.3em 3em;
   font-size: 12px;
   text-transform: uppercase;
   letter-spacing: 2.5px;
   font-weight: 500;
   color: #000;
   background-color: #e03650e6;
   border: none;
   border-radius: 45px;
   box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
   transition: all 0.3s ease 0s;
   cursor: pointer;
   outline: none;
 }
 
 button:hover {
   background-color: #23c483;
   box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
   color: #fff;
   transform: translateY(-7px);
 }
 
 button:active {
   transform: translateY(-1px);
 }
 </style>
 </head>
  <body align="center">
  <h1>Your Order Placed Successfully</h1><br>
  <img src="https://res.cloudinary.com/dirp0dvkg/image/upload/v1697474322/soc%20project/thanks_huqzab.jpg"></img><br><br>
  <button><a href="/order">Go Back</a></button>
  </head>
  </body>`);
 })
 .catch((err) => {
 console.error(err);
 res.status(500).send('Error saving data to MongoDB.');
 });
 });
app.post('/displayall', (req, res) => {
    User.find({}, (err, records) => {
      if (err) {
        res.send('Error fetching records');
      } else {
        res.send(`
        <html>
        <head>
          <title>All Records</title>
          <style>
        /* Style the table */
        table {
            width: 80%;
            margin: 0 auto;
            border-collapse: collapse;
        }

        /* Style the table header */
        th {
            background-color: #3498db;
            color: white;
            font-weight: bold;
        }

        /* Style alternating table rows */
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        /* Style table cells */
        td {
            padding: 10px;
            text-align: center;
        }

        /* Add hover effect on table rows */
        tr:hover {
            background-color: #3498db;
            color: white;
        }
    </style>
        </head>
        <body align="center">
          <h1>All Records</h1>
          <table align="center" border="2" cellpadding="3" cellspacing="6">
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>EMail Id</th>
                    <th>Phone Number</th>
                    <th>Pincode</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Quantity</th>
                    <th>Payment Mode</th>
                </tr>
            </thead>
            <tbody>
            ${records.map(record => `
              <tr> 
                <td>${record.fullname}</td>  
                <td>${record.email}</td>
                <td>${record.phno}</td>  
                <td>${record.pincode}</td>  
                <td>${record.state}</td>  
                <td>${record.city}</td>
                <td>${record.address}</td> 
                <td>${record.size}</td>
                <td>${record.color}</td>
                <td>${record.qnt}</td>
                <td>${record.payment}</td>
              </tr>
            `).join('')}
            </tbody>
          </table>
          <br><br>
          <br>
          <button><a href="/order">Go Back</a></button>
        </body>
      </html>
        `);
      }
    });
  });
app.post('/delete', (req, res) => {
    const recordId = req.body.name;
    // Use Mongoose to delete the record by its ID using deleteOne
    User.deleteOne({fullname: recordId }, (err) => {
      if (err) {
        res.send('Error deleting record');
      } else {
        res.send(`<html>
  <body align="center">
  <h1>Data Deleted Successfully.</h1><br><br>
  <img src="https://res.cloudinary.com/dirp0dvkg/image/upload/v1697796945/background%20pics/del_twldeu.jpg" height="400"></img><br><br>
  <button><a href="/order">Go Back</a></button>
  </body>
  </html>`);
      }
    });
  });
app.post('/display', (req, res) => {
    const emailid = req.body.emailid;
    // Use Mongoose to find the specific record by its ID
    User.findOne({ email: emailid }, (err, user) => {
      if (err) {
        res.send('Error finding user');
      } else if (!user) {
        res.send('User not found');
      } else {
        res.send(`
        <html>
        <head>
        <title>Display Record</title>
        <style>
        body {
         background-image: url("https://res.cloudinary.com/dirp0dvkg/image/upload/v1697791708/background%20pics/bg1_nk7oyb.jpg");
         background-size: cover;
         background-repeat: no-repeat;
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100vh;
         margin: 0;
       }
       
       .button-container {
         background-color: rgba(143, 229, 228, 0.692);
         padding: 20px;
         border-radius: 5px;
         text-align: center;
       }
    </style>
        </head>
        <body align="center">
        <div class="button-container">
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
              <td>Payment Mode</td>
              <td>${user.payment}</td>
            </tr>
          </table><br>
          <button><a href="/order">Go Back</a></button><br><br>
          <button><a href="/update">Update</a></button>
          </div>
        </body>
      </html>
        `);
      }
    });
  });
app.post('/update', (req, res) => {
    const emailid = req.body.emailid;
    const newadd = req.body.newadd;
    const newcol = req.body.newcol;
    const newqnt =req.body.newqnt;
  
    // Use Mongoose to update the record by its ID using updateOne
    User.updateOne({email: emailid }, {address: newadd, color: newcol, qnt: newqnt }, (err) => {
      if (err) {
        res.send('Error updating record');
      } else {
        res.send(`<html>
  <body align="center">
  <h1>Record Updated Successfully.</h1><br><br>
  <img src="https://res.cloudinary.com/dirp0dvkg/image/upload/v1697792711/background%20pics/done_gpzllj.jpg"></img>
  <center><button><a href="/order">Go Back</a></button></center>
  </body>
  </html>`);
      }
    });
  });
 // Start the server
 app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
 });
const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const app = express();
 const port = process.env.PORT || 3000;
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
 res.sendFile(__dirname + '/index.html');
 });
 // Handle form submission
 app.post('/submit', (req, res) => {
 const { fullname, email, phno, pincode, state, city, address,size,color,qnt,payment } = req.body;
 // Create a new User document and save it to MongoDB
 const user = new User({ fullname, email, phno, pincode, state, city, address,size,color,qnt,payment });
 user.save()
 .then(() => {
 res.send('Your Order is Placed Successfully.Thank you for Shopping.');
 })
 .catch((err) => {
 console.error(err);
 res.status(500).send('Error saving data to MongoDB.');
 });
 });
 // Start the server
 app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
 });
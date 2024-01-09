const mongoose = require('mongoose');
// const mongoURI ="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0"
// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&directConnection=true&tls=false"

const mongoURI = "mongodb://127.0.0.1:27017/inotebook"
// mongodb://127.0.0.1:27017/bookstore
// const connectTomongo = () => {
//     mongoose.connect(mongoURI, ()=> {
//         console.log("connected to mongo successfully");
//     })
// }
// mongoose version above 6 will not supoort call back functionality
const connectTomongo = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected to MongoDB successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };

module.exports = connectTomongo;

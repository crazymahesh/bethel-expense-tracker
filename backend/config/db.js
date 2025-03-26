const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //const mongoDB_PWD = encodeURIComponent("QmV0aGVsQFZpamF5MTk3OA==");
    const mongoDB_PWD = encodeURIComponent("BethelVijay1978");
    console.log(mongoDB_PWD);
    //let mongoDB_URI = `mongodb://admin:BethelVijay1978@mahi-test-shard-00-00.crz1a.mongodb.net:27017,mahi-test-shard-00-01.crz1a.mongodb.net:27017,mahi-test-shard-00-02.crz1a.mongodb.net:27017/?replicaSet=atlas-kz57y6-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=mahi-test`;
    const mongoURI = process.env.MONGO_URI;
    //const mongoURI = mongoDB_URI;
    console.log(mongoURI);
    const conn = await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB database!");
    return conn;
  } catch (error) {
    console.error("Connection failed!", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

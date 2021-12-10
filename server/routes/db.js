const connectDB = function() {
    const MongoClient = require("mongodb").MongoClient;
    const userName = process.env.DBNAME || "alienba6y";
    const pwd = process.env.DBPASS || "vanya123";
    const uri = `mongodb+srv://${userName}:${pwd}@cluster0.a9q5j.mongodb.net/food?retryWrites=true&w=majority`;
    return new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = connectDB;
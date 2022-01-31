const mongoDB = require("mongodb"),
    MongoClient = mongoDB.MongoClient,
    ObjectId = mongoDB.ObjectId,
    moviesCollection = "movies",
    tvShowsCollection = "tvShows",
    usersCollection = "users",
    url = "mongodb://localhost:27017/";
// url = process.env.MONGO_URL || 
const dbName = "Netflix";

function getData(req, res, collectionName) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .find({})
            .toArray((err, collectionData) => {
                if (err) throw err;
                let resultArray = [];
                resultArray = collectionData;
                res.status(200)
                res.send(resultArray);
            });
    });
}

module.exports = { getData };
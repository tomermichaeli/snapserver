const express =  require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");


app.use(cors());

const uri = "mongodb+srv://test:test@cluster0.anx9a.mongodb.net/thenewsil?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true}, {useUnifiedTopology: true});

const DocSchema = {
    headline: String,
    body: String,
    time: String
}

const Doc = mongoose.model("updates", DocSchema); //(collection, data schema)

app.get("/", function(req, res)
    {
        Doc.find({}, function(err, updates){
            res.json(updates)
        }).sort({"time": -1}).limit(3);
        console.log("Sent data.");
    }
);

app.get("/all", function(req, res)
    {
        Doc.find({}, function(err, updates){
            res.json(updates)
        }).sort({"time": -1}).limit(30);
        console.log("Sent data.");
    }
);


// app.listen(5001, () => {
//     console.log("Server is running on port 5000");
//     // MongoClient.connect(uri, {useNewUrlParser: true}, {useUnifiedTopology: true}, (error, result) => {
//     //     if (error) throw error;
//     //     database = result.db("thenewsil")
//     //     console.log("Connected to database ", database.toString())
//     // })
// }).on('error', function (err) {
//     console.log(err)
// });


var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port "+ port);
})

// MongoClient.connect(uri, {useNewUrlParser: true}, {useUnifiedTopology: true}, (error, result) => {
//     if (error) throw error;
//     database = result.db("thenewsil")
//     console.log("Connected to database ", database.toString())
// })
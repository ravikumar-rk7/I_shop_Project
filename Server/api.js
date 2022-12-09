var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors  = require("cors");

var constr = "mongodb://127.0.0.1:27017";

var app = express();

app.use(cors());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

app.get("/customers", (req, res)=> {
    mongoClient.connect(constr, (err, clientObject)=>{
        if(!err) {
            var database = clientObject.db("ishop");
            database.collection("customers").find({}).toArray((err, documents)=>{
                if(!err){
                    res.send(documents);
                }
            })
        }
    })
});

app.post("/registercustomer", (req, res)=> {
    var customer = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Age: parseInt(req.body.Age),
        Email: req.body.Email,
        Mobile: req.body.Mobile
    }
    mongoClient.connect(constr,(err, clientObject)=>{
        if(!err) {
            var database = clientObject.db("ishop");
            database.collection("customers").insertOne(customer, (err, result)=>{
                if(!err){
                    console.log("Record Inserted");
                    res.redirect("/customers");
                }
            })
        }
    })
});

app.listen(4400);
console.log(`Server Started : http://localhost:4400`);
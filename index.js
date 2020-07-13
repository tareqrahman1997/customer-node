const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser')
//require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = "mongodb+srv://dbUser:cfA8zpU6FJsPTBbh@cluster0-ttxd5.mongodb.net/onlineStore?retryWrites=true&w=majority";


app.get('/customerInfo',(req, res) =>{
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("customer");
    collection.find().toArray((err, documents)=>{
        if(err){
            console.log(err)
            res.status(500).send({message:err});
        }
        else{
          //  console.log(documents);
            res.send(documents);
        }
    });
 //   client.close();
  });

})

//add customer information

app.post('/addCustomer', (req, res) => {
  const customerDetails = req.body;
  customerDetails.customerDetailsTime = new Date();
  const client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect(err => {
      const collection = client.db("onlineStore").collection("customer");
      collection.insert(customerDetails, (err, documents)=>{
          if(err){
              console.log(err)
              res.status(500).send({message:err});
          }
          else{
              res.send(documents.ops[0]);
          }
      });
       client.close();
    });
});






const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listening to port 4200'));
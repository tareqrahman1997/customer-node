const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
//require('dotenv').config();

const app = express();

app.use(cors());

//const uri = process.env.DB_PATH;

const uri = "mongodb+srv://dbUser:cfA8zpU6FJsPTBbh@cluster0-ttxd5.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("onlineStore").collection("customer");
  // perform actions on the collection object
  collection.insert({
    name:'sagor',
    price:444,
    stock:24
  },(ree, res) =>{
    console.log('successfully inserted')
  })
  console.log('Database connected...')
  client.close();
});

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
//customerAdd.customerAddTime = new Date();
//add customer information

app.post('/addCustomer', (req, res) => {
  const customerAdd = req.body;
  const client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect(err => {
      const collection = client.db("onlineStore").collection("customer");
      collection.insertOne(customerAdd, (err, result)=>{
          if(err){
              console.log(err)
              res.status(500).send({message:err});
          }
          else{
              console.log(result.ops[0]);
              res.send(result.ops[0]);
          }
      });
       client.close();
    });
});






const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listening to port 4200'));
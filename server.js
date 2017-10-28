var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost/Users');
var db = mongoose.connect('mongodb://satbir:satbir@ds125365.mlab.com:25365/railway');

var Passenger = require('./model/passenger');
var Admin = require('./model/admin');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/passenger', function(request, response) {
    Passenger.find({email:request.body.email},function(err, passenger) {
        if(passenger.length == 0){
        var passenger = new Passenger();
        passenger.name = request.body.name;
        passenger.email = request.body.email;
        passenger.password = request.body.password;
        passenger.balance = 100;
        passenger.passengername = "0";
        passenger.title = "0";
        passenger.age = "0";
        passenger.from = "0";
        passenger.to = "0";
        passenger.save(function(err, savedPassenger) {
           if (err) {
               response.status(500).send({error:"Could not Login"});
           } else {
               response.send(savedPassenger);
           }
        });
    }else{
        response.send("email already taken");
    }
});
});

app.post('/passenger/login', function(request, response) {

    Passenger.find({$and:[{email:request.body.email},{password:request.body.password}]},function(err, passenger) {
        if (err) {
            response.status(500).send({error: "Could not fetch Passenger"});
        } else if(passenger.length == 0){
            response.status(405).send({error: "Wrong Email or Password"});
        } 
        else {
            response.send(passenger);
        }
    });
});

app.post('/admin', function(request, response) {

    Admin.find({$and:[{email:request.body.email},{password:request.body.password}]},function(err, admin) {
        if (err) {
            response.status(500).send({error: "Could not fetch Passenger"});
        } else if(admin.length == 0){
            response.status(405).send({error: "Wrong Email or Password"});
        } 
        else {
            response.send(admin);
        }
    });
});
app.post('/adminregister', function(request, response) {
    Admin.find({email:request.body.email},function(err, admin) {
        if(admin.length == 0){
        var admin = new Admin();
        admin.name = request.body.name;
        admin.email = request.body.email;
        admin.password = request.body.password;
        admin.trains.train1 = "0";
        admin.trains.train2 = "0";
        admin.trains.train3 = "0";
        admin.save(function(err, savedPassenger) {
           if (err) {
               response.status(500).send({error:"Could not Login"});
           } else {
               response.send(savedPassenger);
           }
        });
    }else{
        response.send("email already taken");
    }
});
});

app.post('/addtrain', function(request, response) {
    console.log("body",request.body.trains)
    Admin.find({email:request.body.email},function(err, admin) {
        Passenger.update({email:request.body.email}, {train1: request.body.trains.train1}, function(err, array){
               if (err) {
                   response.status(500).send({error:err});
               } else {
                   console.log(array);
                   response.send(array);
               }
           });
});
});

app.post('/ticket', function(request, response) {
           Passenger.update({email:request.body.email}, {passengername:request.body.passengername,from:request.body.from,to:request.body.to,balance: request.body.balance,title:request.body.title}, function(err, array){
               if (err) {
                   response.status(500).send({error:err});
               } else {
                   console.log(array);
                   response.send(array);
               }
           });
});


app.listen(app.get('port'), function() {
    console.log("Swag Shop API running on port" ,app.get('port'));
});

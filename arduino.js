var five = require("johnny-five"); //Johnny Five being required as a function
var board = new five.Board(); //Identifying the arduino board
var MongoClient = require('mongodb').MongoClient; //requiring the connection to MongoDB
var url = "mongodb://Macauleyt:banana23@ds121565.mlab.com:21565/ultrasoundata"; //Personal URL to my databse stored  on mlab. Stored as a global variable for ease of use.


board.on("ready", function () { //Function run once board is ready
    var proximity = new five.Proximity({
        controller: "HCSR04" //Identifying the ultrasonic sensor
        , pin: 13 //Digital Pin
        , freq: 1000 //Frequency of data being read
    });
    proximity.on("data", function () {
        console.log(this.cm); //reading data as centimetre value
        console.log("-----------------"); 
        var test = this.cm // stroring value as centimetre
        console.log("test " + test);
        MongoClient.connect(url, function (err, db) { //Connection to MongoDB
            if (err) throw err;
            var myobj = { //
                distance: test // stroring value as an objection to be inserted into a collection
            };
            if (test<400){ //Creating a limit to what data can be uploaded to the database.
            
            db.collection("Distances").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("1 Document Created!"); //Checking if upload to databse is successful
              
                db.close();
            });
            }
            console.log(test);

            
            };
        });
    });

let express = require('express');
let router = express.Router();
const spawn = require("child_process").spawn;
const path = require("path");
const redis = require('redis');

const client = redis.createClient();

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});


router.post('/postForm', function(req, res, next) {

  // get the fields from the form, create array then pass to model (to transform then predict)
  let name = req.body.name;
  let category = req.body.category;
  let goal = req.body.goal;
  let deadlineMonth = req.body.deadlineMonth;
  let launchedMonth = req.body.launchedMonth;
  let pledgedAmount = req.body.pledgedAmount;
  let backers = req.body.backers;
  let country = req.body.country;

  let argumentsArray = [name, category, goal, deadlineMonth, launchedMonth, pledgedAmount, backers, country]
  let argumentsString = argumentsArray.toString();

  console.log(argumentsArray);

  // check to see if result is stored in redis
  client.get(argumentsString, function (err, jsonDataString) {
  
    if (jsonDataString != null) {
      console.log("data from redis = " + jsonDataString);
      let data = JSON.parse(jsonDataString);
      res.send(data);
    }
    else {
      // launch python script - transform then call classifier

      // transform the array
      let transformPath = path.join('python', 'scripts', 'transformArray.py');
      let transformProcess = spawn("python3", [transformPath, name, category, goal, deadlineMonth, launchedMonth, pledgedAmount, backers, country]);

      transformProcess.stdout.on('data', (data) => {
        // for now just send back the data
        data = data.toString().trim();
        console.log("data = " + data);
        
        // now that you have the dictionary of parameters call the predict  
        let predictPath = path.join('python', 'scripts', 'predict.py');
        let predictProcess = spawn("python3", [predictPath, data]);

        console.log([predictPath, data]);

        predictProcess.stdout.on('data', (predictData) => {
          console.log("predictData = " + predictData);
          
          // type(predictData) = json string
          // save result in redis
          client.set(argumentsArray, predictData, redis.print);

          res.send(predictData);
        });

        predictProcess.stderr.on('data', (data) => {
          // convert the Uint8Array to a readable string
          console.log(data.toString('utf8'));
        });
      });  


      transformProcess.stderr.on('data', (data) => {
        // As said before, convert the Uint8Array to a readable string.
        console.log(data.toString('utf8'));
      });
    }

  });

});

module.exports = router;

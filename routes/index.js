let express = require('express');
let router = express.Router();
const spawn = require("child_process").spawn;
const path = require("path");

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
    
  // transform the array
  let transformPath = path.join('python', 'scripts', 'transformArray.py');
  let transformProcess = spawn("python", [transformPath, name, category, goal, deadlineMonth, launchedMonth, pledgedAmount, backers, country]);

  transformProcess.stdout.on('data', (data) => {
    // for now just send back the data
    console.log("data = " + data);
    res.send(data);
    /*

    // now that you have the dictionary of parameters call the predict  
    let predictPath = path.join('python', 'scripts', 'predict.py');
    let predictProcess = spawn("python", [predictPath, data]);

    predictProcess.stdout.on('data', (predictData) => {
      console.log("predictData = " + predictData);
      res.send(predictData);
    });
    */


  });  
});

module.exports = router;

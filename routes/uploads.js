var express = require('express');
var multer  = require('multer');
var fs      = require('fs');

var router = express.Router();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1]);
  }
});

var upload = multer({storage: storage});

// FILE UPLOAD
router.post('/', upload.any() , function(req, res, next){
  var labelList = [];
  var inputFile = req.files[0].destination+req.files[0].filename;

  // call google vision api
  detectLabels(inputFile, function (err, labels) {
    if (err) {
      return callback(err);
    }
    console.log( JSON.stringify(labels));  // debug
    res.render('uploads', { src:"./uploads/"+req.files[0].filename , labels: labels});
  });
});


// GOOGLE VISION API
var Vision = require('@google-cloud/vision');
// Instantiate a vision client
var vision = Vision({
  projectId: 'logging-life',
  keyFilename: './api/logging-life.json',
});

function detectLabels (inputFile, callback) {
  // Make a call to the Vision API to detect the labels
  vision.detectLabels(inputFile, { verbose: true }, function (err, labels) {
    if (err) {
      return callback(err);
    }
    // console.log('result:', JSON.stringify(labels, null, 2)); // debug
    callback(null, labels);
  });
}

module.exports = router;

/* example output:
          {
            originalname: 'grumpy.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination: './uploads/',
            filename: '436ec561793aa4dc475a88e84776b1b9',
            path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
            size: 277056 }
 */

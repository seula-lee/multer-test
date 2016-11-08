var express = require('express');
var multer  = require('multer');
var fs      = require('fs');
var Vision = require('@google-cloud/vision');
// Instantiate a vision client
var vision = Vision({
  projectId: 'logging-life',
  keyFilename: './api/logging-life.json',
});

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

router.post('/', upload.any() , function(req, res, next){
  console.log(req.files);  // debug
  var inputFile = req.files[0].destination+req.files[0].filename;

  // call google vision api
  detectLabels(inputFile, function (err, labels) {
    if (err) {
      return callback(err);
    }
    console.log('Found label: ' + labels[0].desc + ' for ' + inputFile);
    console.log(labels);  // debug
  });

  res.render('uploads', { src:"./uploads/"+req.files[0].filename });
  res.status(204).end();
});

// GOOGLE VISION API
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

// [START run_application]
if (module === require.main) {
  if (process.argv.length < 3) {
    console.log('Usage: node labelDetection <inputFile>');
    process.exit(1);
  }
  var inputFile = process.argv[2];
  main(inputFile, console.log);
}


module.exports = router;


// var upload = multer({dest : 'public/uploads/'});

/*router.post('/', multer('./uploads/').single('file'), function(req,res){
	console.log(req.file); //form files
	res.status(204).end();
});
*/

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

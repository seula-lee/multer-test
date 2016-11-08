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

router.post('/', upload.any() , function(req, res, next){
  console.log(req.files);  // debug
  res.render('uploads', { src:"./uploads/"+req.files[0].filename });
	res.status(204).end();
});

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

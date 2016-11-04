var express = require('express');
var multer  = require('multer');

router.post('/', multer({ dest: './uploads/'}).single('upl'), function(req,res){
	console.log(req.file); //form files
	res.status(204).end();
});

/* example output:
          { fieldname: 'upl',
            originalname: 'grumpy.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination: './uploads/',
            filename: '436ec561793aa4dc475a88e84776b1b9',
            path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
            size: 277056 }
 */

module.exports = router;

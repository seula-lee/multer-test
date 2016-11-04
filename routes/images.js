var Q = require('q');
var express = require('express');
var multer  = require('multer');
var router = express.Router();
var imagePath = './uploads';

// sending img binary file support from multer
// method of multipart/form-data
// 1) 파일명 파라매터를 추가해서 업로드 경로를 설정할수 있도록 한다.
// 2) 구현을 위해서는 파일 데이터 뿐만 아니라
//    서버에 저장될 파일 이름도 클라이언트로 부터 받아야 한다.
//    filename이라는 파라매터를 추가하자.
// 3) 업로드 결과 파일명과 확장자를 리턴받는다.
var upload = function (req, res) {
  var deferred = Q.defer();
  var storage = multer.diskStorage({
    // saving server folder
    destination: function (req, file, cb) {
      cb(null, imagePath);
    },
    // saving file name
    filename: function (req, file, cb) {
      file.uploadedFile = {
        name: req.params.filename,
        ext: file.mimetype.split('/')[1]
      };
      console.log('FILE: ' + file.uploadedFile.name);
      cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
    }
  });

  var upload = multer({ storage: storage }).single('file');
  upload(req, res, function (err) {
    console.log('ERROR: ' + err);
    if (err) deferred.reject();
    else deferred.resolve(req.file.uploadedFile);
  });
  return deferred.promise;
};
/* Create new image */
router.post('/:filename', function(req, res, next) {
  console.log('TEST: ' + JSON.stringify(req.file));
  upload(req, res).then(function (file) {
    res.json(file);
  }, function (err) {
    res.send(500, err);
  });
});

module.exports = router;

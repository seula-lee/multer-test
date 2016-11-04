var express = require('express');
var router = express.Router();  // express.Router() 객체를 이용해 라우팅 로직을 설정

/* GET home page. */
/* funtion PARAMETER
   req: 클라이언트 요청정보를 담은 객체
   res: 요청한 클라이어트로 응답을 위한 객체
   next: 다음 로직 수행을 위한 함수명
*/
router.get('/', function(req, res, next) {
  // get함수의 첫번째 파라매터에 /만 설정한 이유는 app.js 파일에 있습니다.
  // 이미 app.js에 있는 app.use('/users', users) 코드로 라우팅이 설정되어 있기 때문에
  // users.js 모듈에서는 / 만으로 라우팅 설정을 할 수 있습니다.

  /* usage res function
    res.send(): 문자열로 응답
    res.json(): 제이슨(Json) 객체로 응답
    res.render(): 제이드 템플릿을 렌더링
    res.sendfile(): 파일 다운로드
  */
  res.render('index', { title: 'Express' });
});

module.exports = router;


var mongoose = require('mongoose');
//스키마 정의 (어쨌든 DB니까 데이터 모델링이 필요합니다)
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//사용할 문서 정의
Document = new Schema({
  properties: ['title', 'data', 'tags'],
  indexes: [
    'title'
  ]
});

// 몽구스에게 만들어진 문서 알려주기
mongoose.model('Document', Document);
exports.Document = function(db) {
  return db.model('Document');  // ‘Document’라는 문서모델에 접근한다.
};

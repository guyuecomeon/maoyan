var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');


//主页数据
router.post('/getCinema', function (req, res, next) {
  http.get('192.168.14.54:8080/cinema/find', req.body).then(function (data) {
    res.send(data);
  })
});

// 增加院线
router.post('/addSeatMove', function (req, res, next) {
  console.log(req.body)
 let seatAry={};
 seatAry.yardName=req.body.yardName
 seatAry.addmovebox=req.body.addmovebox
 if(req.body['ids[]']){
  seatAry.ids=req.body['ids[]']
 }
 else{
  seatAry=req.body
 }
 console.log(seatAry)
  http.post('192.168.14.54:8080/cinemaSeat/add', seatAry).then(function (data) {
    console.log()
    res.send(data)
  })
});

// 增加放映厅
router.post('/addmove', function(req, res, next) {
  console.log(req.body)
  http.post('192.168.14.54:8080/cinema/add',req.body).then(function(data){
      res.send(data)
  })
});

// 删除影院
router.post('/delmove', function (req, res, next) {
  http.get('192.168.14.54:8080/cinema/del', req.body).then(function (data) {
    res.send(data)
  })
});

//删除影院座位
router.post('/delSeatMove', function (req, res, next) {
  http.get('192.168.14.54:8080/cinemaSeat/del', req.body).then(function (data) {
    res.send(data)
  })
});

// 修改院线
router.post('/changemove', function (req, res, next) {
  http.post('192.168.14.54:8080/cinema/update', req.body).then(function (data) {
    res.send(data)
  })
});



module.exports = router;
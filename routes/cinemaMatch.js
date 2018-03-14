var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 主页面LOAD电影
router.post('/findMovie', function (req, res, next) {
  req.body.page = parseInt(req.body.page);
  req.body.rows = parseInt(req.body.rows);
  http.post('192.168.14.54:8080/movie/find', req.body).then(function (data) {
    res.send({
      total: data.total,
      rows: data.rows
    });
  })
});
// 初始化增加电影页面
router.post('/addMovie', function (req, res, next) {
  console.log(req.body)
  req.body.page = parseInt(req.body.page);
  req.body.rows = parseInt(req.body.rows);
  http.post('192.168.14.54:8080/movie/find', req.body).then(function (data) {
    res.send({
      total: data.total,
      rows: data.rows
    });
  })
});
// 传电影去数据库
router.post('/addMovieTo', function (req, res, next) {
  let param = {};
  if (req.body['ids[]']) {
    param.ids = req.body['ids[]'];
  }
  else {
    param = req.body;
    param.isAdd="1"
  }
  console.log(param)
  http.post('192.168.14.54:8080/movie/update', req.body).then(function (data) {
    res.send(data);
  })
});
// 传送数组到数据库
router.post('/addMovietoAll', function (req, res, next) {
  console.log(req.body)
  http.post('192.168.14.54:8080/movie/add', { submitType: "addMore", data: req.body }).then(function (data) {
    res.send(data);
  })
});
// 移除电影
router.post('/delMovie', function (req, res, next) {
  let param = {};
  if (req.body['ids[]']) {
    param.ids = req.body['ids[]'];
  }
  else {
    param = req.body;
    param.isAdd="0"
  }
  http.post('192.168.14.54:8080/movie/update', param).then(function (data) {
    res.send(data);
  })
});
// 获取电影院
router.post('/getCinema', function (req, res, next) {
  http.post('192.168.14.54:8080/cinema/find', req.body).then(function (data) {
    res.send(data);
  })
});
//获取放映厅
router.post('/getHall', function (req, res, next) {
  http.post('192.168.14.54:8080/cinemaHall/find', req.body).then(function (data) {
    res.send(data);
  })
});
// 删除院线
router.post('/delCinema', function (req, res, next) {
  let param = {};
  if (req.body['ids[]']) {
    param.ids = req.body['ids[]'];
  }
  else {
    param = req.body;
    param.isAdd="0"
  }
  http.post('192.168.14.54:8080/cinema/update', param).then(function (data) {
    res.send(data);
  })
});
// 增加院线
router.post('/addCinema', function (req, res, next) {
  let param = {};
  if (req.body['ids[]']) {
    param.ids = req.body['ids[]'];
  }
  else {
    param = req.body;
    param.isAdd="1"
  }
  http.post('192.168.14.54:8080/cinema/update', param).then(function (data) {
    res.send(data);
  })
});
// 增加放映厅
router.post('/addHall', function (req, res, next) {
  let param = {};
  if (req.body['ids[]']) {
    param.ids = req.body['ids[]'];
  }
  else {
    param = req.body;
    param.isAdd="1"
  }
  http.post('192.168.14.54:8080/cinemaHall/update', param).then(function (data) {
    res.send(data);
  })
});
// 移除放映厅
router.post('/delHall', function (req, res, next) {
  let param = {};
  if (req.body['ids[]']) {
    param.ids = req.body['ids[]'];
  }
  else {
    param = req.body;
    param.isAdd="0"
  }
  http.post('192.168.14.54:8080/cinemaHall/update', param).then(function (data) {
    res.send(data);
  })
});
module.exports = router;
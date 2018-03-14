var express = require('express');
var router = express.Router();
var http = require("ykt-http-client");
var multiparty = require('multiparty');
var util = require("util");

/* GET home page. */

//让页面显示的代码
router.get("/gettb", function (req, res) {
  req.body.page = parseInt(req.body.page);
  req.body.rows = parseInt(req.body.rows);
  console.log(req.query);
  http.post("127.0.0.1:8080/movie/find", req.query).then(function (data) {
    res.send(data);
  });
})

//增加
router.post("/addbtn", function (req, res) {
  http.post("127.0.0.1:8080/movie/add", req.body).then(function (data) {
    res.send(data);
  });
})

//编辑
router.post("/removebtn", function (req, res) {
  http.post("127.0.0.1:8080/movie/update", req.body).then(function (data) {
    res.send(data);
  });
})

//删除
router.post('/remove', function (req, res) {

  let param = {};

  if (req.body['ids[]'])
    param.ids = req.body['ids[]'];
  else
    param = req.body;



  http.post('127.0.0.1:8080/movie/del', param).then(function (data) {
    res.send(data)
  })
})


/* 上传*/
router.post('/upFile', function (req, res) {
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({ uploadDir: './public/showimg/' });  //文件路径可以修改，如果修改记得和下面的路径保持一致

  //上传完成后处理
  form.parse(req, function (err, fields, files) {

    var filesTmp = JSON.stringify(files, null, 2);

    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var files = files.inputFile;
    }

    //发送第一张图片的信息
    let str = files[0].path;
    let newPath = str.replace(/public/, '');

    res.send(newPath);    //发送消息回去
    // console.log(newPath)
  });
});

module.exports = router;
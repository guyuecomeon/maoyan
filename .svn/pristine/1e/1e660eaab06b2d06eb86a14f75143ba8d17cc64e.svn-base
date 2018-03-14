var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require("util");
var http = require('ykt-http-client');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取用户数据
router.post('/movieInfo', function (req, res) {
  

  req.body.page = parseInt(req.body.page);
  req.body.rows = parseInt(req.body.rows);
  console.log(req.body);
  http.post('127.0.0.1:8080/message/find', req.body).then(function (data) {
   console.log(data)
    res.send({
      total: data.total,
      rows: data.rows
    });

  })
});
//---------------------------------------------------------------------------
// 增加功能
router.post ('/message_addData', function (req, res) {
  // console.log(req.body.rel_pictrue);
  http.post('127.0.0.1:8080/message/add',req.body).then(function(data){
    res.send(data);
   console.log(data)
     })
});

/* 上传*/
router.post('/upFile', function(req, res){
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: './public/shopimg/'});  //文件路径可以修改，如果修改记得和下面的路径保持一致

  //上传完成后处理
  form.parse(req, function(err, fields, files) {

  var filesTmp = JSON.stringify(files,null,2);

  if(err){
      console.log('parse error: ' + err);
  }else{
      console.log('parse files: ' + filesTmp);
      var files = files.inputFile;
  }

//发送第一张图片的信息
let str = files[0].path;
  let newPath = str.replace(/public/, '');
      
  res.send(newPath);  
  // console.log(newPath)
    //发送消息回去
  });
});

//---------------------------------------------------------------------
//删除功能

router.post('/message_remove_one', function (req, res) {
  let param = {};
  if (req.body['ids[]'])
    param.ids = req.body['ids[]'];
  else
    param = req.body;

  http.post('127.0.0.1:8080/message/del', param).then(function (data) {
    res.send(data)
  })
})

//---------------------------------------------------------------------------
//修改功能
router.post('/message_edit', function (req, res) {
  
    http.post('127.0.0.1:8080/message/update', req.body).then(function (data) {
      res.send(data);
  
    })
  });

module.exports = router;
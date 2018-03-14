var express = require('express');
var router = express.Router();
var http = require('ykt-http-client')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

//获取电影数据
router.post('/getStartInfo', function (req, res) {
    req.body.page = Number(req.body.page);
    req.body.rows = Number(req.body.rows);
    http.post('127.0.0.1:8080/reflect/find', req.body).then(function (data) {
        res.send(data);

    })
});

//获取所有电影数据
router.post('/getAllMovie', function (req, res) {
    req.body.page = Number(req.body.page);
    req.body.rows = Number(req.body.rows);
    http.post('127.0.0.1:8080/allMovie/find', req.body).then(function (data) {
        res.send(data);

    })
});

//增加电影数据
router.post('/reflect_addNum', function (req, res) {
    http.post('127.0.0.1:8080/reflect/add', req.body).then(function (data) {
        res.send(data);

    })
});

//筛选数据

router.post('/delSameInfo', function (req, res) {
    let param = {};
    if (req.body['ids[]']) {
        param.ids = req.body['ids[]'];
    }
    else {
        param = req.body;
    }
    console.log(param)
    http.post("127.0.0.1:8080/allMovie/del",param).then(function (data) {
        res.send(data);
    });
});

//增加数据到表格，然后删除已添加的数据

router.post('/delAlreadyInfo', function (req, res) {
    let param = {};
    if (req.body['ids[]']) {
        param.ids = req.body['ids[]'];
    }
    else {
        param = req.body;
    }
    console.log(param)
    http.post("127.0.0.1:8080/allMovie/del",param).then(function (data) {
        res.send(data);
    });
});

router.post('/delpropnum', function (req, res) {
    http.post('127.0.0.1:8080/allMovie/del', req.body).then(function (data) {
        console.log("1");
        console.log("data");
        res.send(data);

    })
});

//删除电影数据
router.post('/delInfo', function (req, res) {
    let param = {};
    if (req.body['ids[]']) {
        param.ids = req.body['ids[]'];
    }
    else {
        param = req.body;
    }
    http.post("127.0.0.1:8080/reflect/del", param).then(function (data) {
        res.send(data);
    });
});



module.exports = router;
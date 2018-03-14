var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
var session = require('express-session');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

//注册
router.post('/reg', function (req, res) {

    req.body.phone = parseInt(req.body.phone);
    http.post('127.0.0.1:8080/users/add', req.body).then(function (data) {
        console.log(data);
        console.log('注册成功');
        // res.send("wewew");
        res.redirect('../modules/users/user_login.html');

        // res.redirect('user_login.html?isReg=1&name=张三&pwd=123');
    })
});
//登陆
router.post('/login', function(req, res) {
    let param = {acc: req.body.reg_acc, pwd: req.body.reg_pwd, findType:"exact"};
    console.log(param);
    http.post('127.0.0.1:8080/users/find', param).then(function(data){
        console.log(data);
        if(data.length =1){
            req.session.isLogin=req.body.reg_acc;
            res.redirect('../modules/users/user_vice.html');
        }
        else
            res.send('登陆失败，用户名或密码错误');
    })
});
// router.get('/getUsersName', function(req, res) {
//     console.log(req.query)
//     // console.log(req.session.isName);
//     // console.log(121)
//     console.log(req.session)
//     // res.send(req.session.isLogin)
//   });

//把数据库里面的数据显示到登陆成功后的页面中来

//获取用户信息
router.get('/getUser', function(req, res){
    console.log(req.query)
    //把该转数字的转数字
    req.query.page = parseInt(req.query.page);
    req.query.rows = parseInt(req.query.rows);
    
    console.log(req.query)
    http.post('127.0.0.1:8080/users/find', req.query).then(function(data){
        //2个数据 1数据源   2总数据的条数
        res.send({
            total: data.total,
            rows: data.rows
        })
    })
})

//添加一个用户信息
router.post('/addUser', function(req, res){
    console.log(req.body)
    http.post('127.0.0.1:8080/users/add', req.body).then(function(data){
        res.send(data)
    })
})


//修改一个用户的数据

router.post('/update', function(req, res){
    console.log(req.body)
    req.body.year = Number(req.body.year);
    req.body.money = Number(req.body.money);
    
    http.post('127.0.0.1:8080/users/update',req.body).then(function(data){
        res.send(data)
    })
})


//删除一个用户信息
router.post('/removeUser', function(req, res){
    
    let param = {};
    
    if(req.body['ids[]'])
        param.ids = req.body['ids[]'];
    else
        param = req.body;
    
    console.log(param);
    
    http.post('127.0.0.1:8080/users/del', param).then(function(data){
        res.send(data)
    })
})

//查询用户信息
router.post('/searchData', function(req, res){
    
    // req.body.acc3 = Number(req.body.acc);
    // req.body.pwd3 = Number(req.body.pwd);
    // req.body.phone3 = Number(req.body.phone);
    // req.body.email3 = Number(req.body.email);
    
    http.post('127.0.0.1:8080/users/find', req.body).then(function(data){
        res.send(data)
    })
})

// //登陆
// router.post('/login', function (req, res) {
//     // let param = { acc: req.body.login_acc, pwd: req.body.login_pwd, findType: "exact" };
//    // http.post('127.0.0.1:8080/user_name/find', param).then(function (data) {
//         console.log(data);

//         //    if(req.body.acc === 'F45' && req.body.pwd === 'F45'){
//         // req.session.islogin = req.body.acc;
//         // req.session.islogin = req.body.pwd;
        

//         //登陆成功
//         res.redirect('modules/users/user_index.html');
//         //    }else
//         //        res.send('登陆失败');

//     });



//     // //登陆
//     // router.post('/login', function(req, res) {
//     //     // let param = {acc: req.body.login_acc, pwd: req.body.login_pwd, findType:"exact"};
//     //     // http.post('127.0.0.1:8080/user_name/find', param).then(function(data){
//     //     //     console.log(data);
//     //     //     if(data.length == 1)
//     //     //         res.redirect('../modules/users/user_index.html');
//     //     //     else
//     //     //         res.send('登陆失败，用户名或密码错误');
//     //     // })
//     //     res.send('登陆成功');
//     //     // console.log(data);
//     // });




    module.exports = router;

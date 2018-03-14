var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//登录SESSION

router.post('/login', function(req, res) {
  if(req.body.acc){
    req.session.acc=req.body.acc;
    res.redirect('index.html')
  }else{
    res.redirect('login.html')
  }
  
});
router.get('/outlogin', function(req, res, next) {
  delete req.session.acc;
  res.send("ok");
});
//
router.get('/getUsersName', function(req, res) {
  // console.log(req.session.acc)
  res.send(req.session.acc);
});

module.exports = router;

var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');

/* GET users listing. */

router.get('/',(req, res)=>{
  let user = req.session.user;
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/user-view',{admin:false,products,user});
  })
});

router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/');
  }else{
    res.render('user/user-login',{loginErr:req.session.loginErr});
    req.session.loginErr=false;
  }
})

router.get('/signup',(req,res)=>{
  if(req.session.loggedIn==true){
    res.redirect('/');
  }else{
    res.render('user/user-signup');
  }
})

router.post('/signup',(req,res)=>{
  userHelpers.doSignUp(req.body).then((response)=>{
    req.session.loggedIn=true;
    req.session.user=response;
    console.log(req.session.user);
    res.redirect('/');
  })
})

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true;
      req.session.user=response.user;
      res.redirect('/');
    }else{
      req.session.loginErr="Invalid username or password";
      res.redirect('/login');
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/login');
})



module.exports = router;

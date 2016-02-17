var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema= mongoose.Schema({email:String,password:String});
var User = mongoose.model('user',UserSchema);
var session = router.session;





//mongoose connect
mongoose.connect('mongodb://localhost/test',function(err){
	if(err){
		console.log('mongoose connection error :'+err);
		throw err;
	}
});




/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});





	router.auth = function(req,res){
		var sessionUser = new User({email:'', password:''});
		console.log('인증여부 확인중');
		User.findOne({'email':req.body.email},function(err,user){
			if(err){	//에러 핸들러
				console.err(err);
				throw err;
			}
			//createUser(req.body.email, req.body.password);
			console.log(user);
			if(user!=null){//계정정보 있을때
				if(user.password == req.body.password){//인증성공
					console.log('인증성공');
					console.log(user);

					req.session.logined = user.email; //세션에 이메일 저장

					res.writeHead(302,{
						'Location' : 'main/main.html'
					});
					res.end();


				}else{//인증실패

					//req.session.user=sessionUser;
					res.writeHead(302,{
						'Location' : 'index'
					});
					res.end();
				}
			}else{	//계정정보 없을 때
				sessionUser = createUser(req.body.email, req.body.password);
				req.session.logined = sessionUser.email; //세션에 이메일 저장
				console.log("세션에 저장된 내용입니다."+req.session.logined);
				res.writeHead(302,{
					'Location' : 'main/main.html'
				});
				res.end();
			}

			//req.session.user=sessionUser;

		});



	};






function createUser(reqEmail,reqPassword){
	console.log('아이디 생성');
	var newUser = new User({email:reqEmail, password:reqPassword});
	newUser.save(function (err, silence) {
		if (err) {
			console.log(err);
			throw err;
		}
		console.log('생성성공 success');
		console.log('email : '+reqEmail);
	});
	return newUser;
}


module.exports = router;


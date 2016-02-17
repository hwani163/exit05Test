var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var MemoSchema= mongoose.Schema({email:String,contents:String,time:String});

var Memo = mongoose.model('memo',MemoSchema);



//mongoose connect
//mongoose.connect('mongodb://localhost/test',function(err){
//    if(err){
//        console.log('mongoose connection error :'+err);
//        throw err;
//    }
//});


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('memo with a resource');
});


router.post('/getListMemo.do',function(req,res,next) {

    console.log('/getListMemo.do');
    console.log('session : '+req.session.logined);

    var sessionEmail = req.session.logined;

    if(sessionEmail == undefined){
        console.log('세션 정보가 없습니다');
        //세션 정보가 없을 경우 로그인으로 보냄
        res.redirect('/index');
        res.end();
    }else {
        //
        Memo.find({email: sessionEmail}, function (err, memo) {
            if (err) {
                console.err(err);
                throw err;
            }
            if (memo == null) {
                memo = '';
            }
            console.log('memo : ' + memo);
            //console.log(memo.length);
            //console.log(memo[0]);

            res.send(200, memo);
            res.end();

        });
    }

});

router.post('/insertMemo.do',function(req,res,next) {
    console.log('/insertMemo.do');

    console.log('session : '+req.session.logined);
    var sessionEmail = req.session.logined;

    console.log('새로운 메모생성됨');
    time = new Date();
    console.log(time);
    var newMemo = new Memo({email:sessionEmail, contents:req.body.contents,time:time});
    newMemo.save(function (err, silence) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('생성성공 success');
        console.log('email : '+newMemo.email + ' , contents : '+newMemo.contents+' , time : '+newMemo.time);
    });

});






module.exports = router;

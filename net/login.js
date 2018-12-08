'use strict';
var app = require('express')();
var express = require("express");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql  = require('mysql');  
var fs = require('fs')
var QcloudSms = require("qcloudsms_js");

// 短信应用SDK AppID
var appid = 1400166150;  // SDK AppID是1400开头

// 短信应用SDK AppKey
var appkey = "b5f0e5248e1ddce5af2809505aacfaa5";


// 短信模板ID，需要在短信应用中申请
var templateId = 242762;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
//templateId 7839 对应的内容是"您的验证码是: {1}"
// 签名
var smsSign = "谁来剪月光";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

// 实例化QcloudSms
var qcloudsms = QcloudSms(appid, appkey);

// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, res, resData) {
    if (err) {
        console.log("err: ", err);
    } else {
        console.log("request data: ", res.req);
        console.log("response data: ", resData);
    }
}

var logger = fs.createWriteStream('../log/server.log', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'reji' 
}); 
 
connection.connect();

server.listen(3000);
io.on('connection', function (socket) {
	console.log('websocket has connected')
	var VerificationCode;//验证码

	/*const countDown = (second) => {
	const s = second % 60;
	const m = Math.floor(second / 60);

	return `${`00${m}`.slice(-2)} : ${`00${s}`.slice(-2)}`;
	};

	let time = 5 * 60;

	const timer = setInterval(() => {
	const show = countDown(time--);
	//console.log(show);
	if(time < 0) {
		console.log('倒计时结束！');
		VerificationCode=-1;
		console.log(VerificationCode);
		clearInterval(timer);
		}
	}, 1000);*/
	//注册事件
	socket.on('register_client',function(data){
		var  addSql = 'INSERT INTO user(account,password) VALUES(?,?)';
		console.log(data);
		var  addSqlParams = [data.account,data.password];
		connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
			logger.write(data.account);
			logger.write('：帐号已被注册\n');
			console.log('[INSERT ERROR] - ',err.message);
			socket.emit('register_server',{message:'帐号已经被注册'});
			return;//如果失败了就直接return不会继续下面的代码
        }
		if(data.code!=VerificationCode||data.code==-1)
		{
			logger.write(data.account);
			logger.write(':验证码错误\n');
			socket.emit('register_server',{message:'验证码错误'});
			return;
		}
		socket.emit('register_server',{message:'注册成功'});
		console.log("OK");
		logger.write(data.account);
		logger.write('帐号注册成功\n');
		});
	});
	//验证码
	socket.on('code_client',function(data){
		//生成随机数
		function RndNum(n){
			var rnd="";
			for(var i=0;i<n;i++)
				rnd	+=	Math.floor(Math.random()*10);
			return rnd;
		}
		VerificationCode=RndNum(5);
		console.log(VerificationCode);
		
		const countDown = (second) => {
			const s = second % 60;
			const m = Math.floor(second / 60);

			return `${`00${m}`.slice(-2)} : ${`00${s}`.slice(-2)}`;
		};

		let time = 30 * 60;//计时30分钟

		const timer = setInterval(() => {
			const show = countDown(time--);
			//console.log(show);
			if(time < 0) {
				VerificationCode=-1;
				console.log('倒计时结束！验证码修改为：',VerificationCode);
				clearInterval(timer);
			}
		}, 1000);
		// 需要发送短信的手机号码
		var phoneNumbers = [data.account];
		var ssender = qcloudsms.SmsSingleSender();
		var params = [VerificationCode,"30","15622184887"];//数组具体的元素个数和模板中变量个数必须一致，例如事例中templateId:5678对应一个变量，参数数组中元素个数也必须是一个
		ssender.sendWithParam(86, phoneNumbers[0], templateId,params, smsSign, "", "", callback);  // 签名参数未提供或者为空时，会使用默认签名发送短信
	});
	
	//登录事件
	socket.on('login_client',function(data){
		var SelectAccount='select* from user where account='+data.account;
		var SelectSQL = "select account,password from user where account = '"+data.account+"' and password = '"+data.password+"'";
		var SelectFlag="select flag from user where account="+data.account;
		var UpdateFlag='update user set flag=? where account='+data.account;
		var UFlag=[socket.id];
		connection.query(SelectAccount,function(err,result){
			if(err){
				console.log('[login error]-',err.message);
				return;
			}
			if(result==''){
				logger.write(data.account);
				logger.write(':帐号未注册\n');
				//logger.write(data);
				//logger.write('\n');
				console.log('帐号未注册');
				socket.emit('login_server',{message:'帐号未注册'});
				return;
			}
			else
			{
				connection.query(SelectSQL,function (err, result) {
					if(err){
						//logger.write('[login error]-');
						//logger.write(err.message);
						//logger.write('\n');
						console.log('[login ERROR] - ',err.message);
						return;
					}
						//console.log(result);
					if(result=='')
					{
						logger.write(data.account);
						logger.write(':帐号输入的密码错误\n');
						console.log("密码错误");
						socket.emit('login_server',{message:'密码错误'});
						return;
					}
					else//如果检测到用户已经在线则把前面的逼迫下线，同时把当前用户账号登录，并把当前的socket.id记录入数据库
					{
						connection.query(SelectFlag,function (err, result) {
							if(err){
								console.log('[login ERROR] - ',err.message);
								return;
							}
							//断开入旧了套接字的连接
							if (io.sockets.connected[result]) {
								io.sockets.connected[result].disconnect();
								logger.write(data.account);
								logger.write(':账号被逼下线\n');
							}
						};
						//把新的套接字id存入数据库
						connection.query(UpdateFlag,UFlag,function(err,result){
							if(err){
								console.log('[update error]-',err.message);
								return;
							}
						});
						logger.write(data.account);
						logger.write(':账号登录成功\n');
						console.log("登陆成功");
						socket.emit('login_server',{message:'登录成功'});
						return;
					}
				}); 
			}
		});	
	});
	
	//修改密码事件
	socket.on('password_client',function(data){
		var UpdatePassword='update user set password=? where account='+data.account;
		var Upassword=[data.password];
		if(data.code==VerificationCode&&data.code!=-1)
		{
			connection.query(UpdatePassword,Upassword,function(err,result){
				if(err){
					console.log('[update error]-',err.message);
					return;
				}
				logger.write(data.account);
				logger.write(':帐号修改密码成功');
				socket.emit('password_server',{message:'修改密码成功'});
				return;
			});
		}
		else
		{
			logger.write(data.account);
			logger.write(':输入验证码错误，修改密码失败');
			socket.emit('password_server',{message:'验证码错误'});
			return;
		}
	});
	
	//判断是否断开连接
	socket.on('disconnect',function(data){
		onlineFlag=flase;
		console.log(data+'-disconnect');
	});
	//首次登录给用户起名字
	socket.on('name_client',function(data){
		var SelectName='select name from user where account='+data.account;
		connection.query(SelectAccount,function(err,result){
			if(err){
				console.log('[login error]-',err.message);
				return;
			}
			if(result=='')
			{
				socket.emit('name_server',{message:用户未起名字});
			}
		)};
	})
});
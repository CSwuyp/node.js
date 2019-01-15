'use strict';
var QcloudSms = require("qcloudsms_js");
const { query } = require('../sql/DBConfig');
var userSQL = require('../sql/Usersql');
var fs = require('fs')//文件操作
var loginErrorLog = fs.createWriteStream('../log/loginError.log', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})
var userTimeLog = fs.createWriteStream('../log/userTime.log', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})
// 短信应用SDK AppID
var appid = 1400166150;  // SDK AppID是1400开头

// 短信应用SDK AppKey
var appkey = "b5f0e5248e1ddce5af2809505aacfaa5";

// 短信模板ID，需要在短信应用中申请
var templateId = 245369;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
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
var Account;
var VerificationCode;//验证码
//注册事件
//自动登录事件

function PhoneCode(account){
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
	var ssender = qcloudsms.SmsSingleSender();
	var params = [VerificationCode,"30"];//数组具体的元素个数和模板中变量个数必须一致，例如事例中templateId:5678对应一个变量，参数数组中元素个数也必须是一个
	ssender.sendWithParam(86, account, templateId,params, smsSign, "", "", callback);  // 签名参数未提供或者为空时，会使用默认签名发送短信	
}

async function login(Ip,SocketId){
	let SelectAccountResult = await query( userSQL.SelectAccount,Ip);
	if(SelectAccountResult==''){
		return -1;
	}else{
		Account= await SelectAccountResult[0].account;
		let SelectSocketIdResult=await query(userSQL.SelectSocketId,Account);
		var myDate = new Date();
		//把新的套接字id和登录时间存入数据库
		var UpdateSum=[SocketId,myDate.toLocaleString(),Account];
		let UpdateSocketIdResult=await query(userSQL.UpdateSocketId,UpdateSum);
		var myDate = new Date();//获取系统当前时间
		userTimeLog.write(myDate.toLocaleString()); //获取日期与时间
		userTimeLog.write('\t'); 
		userTimeLog.write(Account.toString());
		userTimeLog.write('\t登录成功\r\n');
		return SelectSocketIdResult[0].SocketId;
	}
}
async function Register(account,code,SocketId,Ip){
	Account=await account;
	var myDate = new Date();
	var  addSqlParams = [account,Ip,myDate.toLocaleString(),SocketId,0,0,0,1,2,3,0,0];
	if(code!=VerificationCode||code==-1){
		console.log('验证码错误\n');
		var myDate = new Date();//获取系统当前时间
		loginErrorLog.write(myDate.toLocaleString()); //获取日期与时间
		loginErrorLog.write('\t'); 
		loginErrorLog.write(account.toString());
		loginErrorLog.write(':验证码错误\n');
		//socket.emit('register_server',{message:'406'});
		return -1;
	}else{
		let RegisterAccountResult=await query(userSQL.RegisterAccount,account);
		//该帐号未注册就行进注册并登录
		if(RegisterAccountResult==''){
			let AddAccountResult=await query(userSQL.AddAccount,addSqlParams);
			console.log(account,'：帐号注册登录成功\n');
			var myDate = new Date();//获取系统当前时间
			userTimeLog.write(myDate.toLocaleString()); //获取日期与时间
			userTimeLog.write('\t'); 
			userTimeLog.write(Account.toString());
			userTimeLog.write('\t登录成功\r\n');
			return 1;	
		}else{
			console.log(account,':帐号登录成功\n');
			var myDate = new Date();//获取系统当前时间
			userTimeLog.write(myDate.toLocaleString()); //获取日期与时间
			userTimeLog.write('\t'); 
			userTimeLog.write(Account.toString());
			userTimeLog.write('\t登录成功\r\n');
			let SelectSocketIdResult= await query(userSQL.SelectSocketId,account);
			var UpIp=[Ip,myDate.toLocaleString(),SocketId,account];
			let UpdateIpResult=await query(userSQL.UpdateIp,UpIp);
			return SelectSocketIdResult[0].SocketId;
		}
		
	}
}


async function setName(){
	console.log('setName');
	console.log(Account);
	let SelectNameResult=await query(userSQL.SelectName,Account);
	if(SelectNameResult[0].name==null){
		return -1;
	}else{
		return SelectNameResult[0].name;
	}
}


//用户注册完毕就给三个英雄
async function addHero(){
	//查找用户当前所拥有的英雄
	let SelectOwnHeroResult=await query(userSQL.SelectOwnHero,Account);
	if(SelectOwnHeroResult==''){
		//插入英雄一
		var hero1=[Account,1,1,0];
		let AddHero1Result=await query(userSQL.AddHero,hero1);
		//插入英雄二
		var hero2=[Account,2,1,0];
		let AddHero2Result=await query(userSQL.AddHero,hero2);
		//插入英雄三
		var hero3=[Account,3,1,0];
		let AddHero3Result=await query(userSQL.AddHero,hero3);
	}
}


module.exports = {
	login,
	PhoneCode,
	Register,
	setName,
	addHero
}
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

server.listen(8000);
io.on('connection', function (socket) {
	console.log('websocket has connected');
	var VerificationCode;//验证码
	var Account;
	//注册事件
    console.log("New connection from :" + socket.request.connection.remoteAddress);
	var str=socket.request.connection.remoteAddress;
	var Ip=str.replace(/[^0-9]/ig,""); 
	//自动登录事件
	socket.on('login_client',function(data){
		
		//var SelectAccount='select account from user where UserIp='+socket.request.connection.remoteAddress;
		//找出该IP最近登录的账号是哪个
		var SelectAccount = 'select account from user where LoginTime in (select max(LoginTime) from user where UserIp='+Ip+')';
			console.log('进入login_client');
			console.log(socket.request.connection.remoteAddress);
			connection.query(SelectAccount,function(err,result){
				if(err){
					console.log('[SelectAccount err]-',err.message);
					return;
				}
				console.log(result);
				if(result==''){
					socket.emit('login_server',{message:'404'});
				}
				else{
					Account=result[0].account;//取出玩家的账号
					var SelectSocketId='select SocketId from user where account='+Account;
					var UpdateSocketId='update user set SocketId=?,LoginTime=? where account='+Account;
					//断开旧的套接字的连接
					connection.query(SelectSocketId,function(err,result){
						if(err){
							console.log('[SelectSocketId err]-',err.message);
							return;
						}
						console.log("里",Account);
						console.log('数据库中socket.id:',result[0].SocketId);
						//断开旧的套接字的连接
						if (io.sockets.connected[result[0].SocketId]) {
							io.sockets.connected[result[0].SocketId].disconnect();
							logger.write(Account);
							logger.write(':账号多地同时登录，先登录者被迫下线\n');
						}
					});
					var myDate = new Date();
					//把新的套接字id和登录时间存入数据库
					var UpdateSum=[socket.id,myDate.getTime()];
					connection.query(UpdateSocketId,UpdateSum,function(err,result){
						if(err){
							console.log('[UpdateSocketId]-',err.message);
							return;
						}
					});
					logger.write(Account);
					logger.write(':帐号登录成功\n');
					console.log(Account,'登录成功');
					socket.emit('login_server',{message:'200'});
					var SelectName='select name from user where account='+Account;
					connection.query(SelectName,function(err,result){
						if(err){
							console.log('[SelectName error]-',err.message);
							return;
						}
						console.log(result[0].name);
						if(result[0].name==null)
						{
							socket.emit('name_server',{name:"404"});
						}
						else{
							socket.emit('name_server',{name:result[0].name});
						}
					});
				}
			});
			
			
			
			//logger.write(Account);
			//logger.write(':帐号登录成功\n');
			//console.log(Account,'登录成功');
			//socket.emit('login_server',{message:'200'});
	});
	
	socket.on('register_client',function(data){
		var  addAccount = 'INSERT INTO user(account,UserIp,LoginTime,SocketId) VALUES(?,?,?,?)';
		var SelectAccount='select * from user where account='+data.account;
		console.log(data);
		var myDate = new Date();
		var  addSqlParams = [data.account,Ip,myDate.getTime(),socket.id];
		
		if(data.code!=VerificationCode||data.code==-1){
			console.log('验证码错误\n');
			logger.write(data.account);
			logger.write(':验证码错误\n');
			socket.emit('register_server',{message:'406'});
			return;
		}
		else{
			//先查询该帐号是否注册过如果注册过就直接登录，如果还未注册过就先写入数据库然后再登录
			connection.query(SelectAccount,function(err,result){
				if(err){
					console.log('[SelectAccount1 err]-',err.message);
					return;
				}
				//该帐号未注册，就进行注册
				if(result==''){
					connection.query(addAccount,addSqlParams,function (err, result) {
						if(err){
							console.log('[INSERT ERROR] - ',err.message);
							//logger.write(err.message);
							//logger.write('\n');f
							return;//如果失败了就直接return不会继续下面的代码
						}
						socket.emit('register_server',{message:'200'});
						console.log(data.account,'：帐号注册登录成功\n');
						logger.write(data.account);
						logger.write('帐号注册登录成功\n');
						Account=data.account;
						var SelectName='select name from user where account='+Account;
						connection.query(SelectName,function(err,result){
							if(err){
								console.log('[SelectName error]-',err.message);
								return;
							}
							console.log(result[0].name);
							if(result[0].name==null)
							{
								socket.emit('name_server',{name:"404"});
							}
							else{
								socket.emit('name_server',{name:result[0].name});
							}
						});
					});
				}
				else{
					socket.emit('register_server',{message:'200'});
					console.log(data.account,':帐号登录成功\n');
					logger.write(data.account);
					logger.write('帐号登录成功\n');
					Account=data.account;
					var SelectSocketId='select SocketId from user where account='+Account;
					connection.query(SelectSocketId,function(err,result){
						if(err){
							console.log('[SelectSocketId err]-',err.message);
							return;
						}
						console.log("里",Account);
						console.log('数据库中socket.id:',result[0].SocketId);
						//断开旧的套接字的连接
						if (io.sockets.connected[result[0].SocketId]) {
							io.sockets.connected[result[0].SocketId].disconnect();
							logger.write(Account);
							logger.write(':账号多地同时登录，先登录者被迫下线\n');
						}
					});
					var UpdateIp='update user set UserIp=?,LoginTime=?,SocketId=? where account='+Account;
					var SelectName='select name from user where account='+Account;
					var UpIp=[Ip,myDate.getTime(),socket.id];
					connection.query(UpdateIp,UpIp,function(err,result){
						if(err){
							console.log('[UpdateIp error]-',err.message);
							return;
						}
					});
					connection.query(SelectName,function(err,result){
						if(err){
							console.log('[SelectName error]-',err.message);
							return;
						}
						console.log(result[0].name);
						if(result[0].name==null)
						{
							socket.emit('name_server',{name:"404"});
						}
						else{
							socket.emit('name_server',{name:result[0].name});
						}
					});
				}
			});
			
		}
	});
	
	
	//验证码,验证码可以用于登录或者注册，如果还未注册就给注册并登录，如果已经注册了就登录
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
		var params = [VerificationCode,"30"];//数组具体的元素个数和模板中变量个数必须一致，例如事例中templateId:5678对应一个变量，参数数组中元素个数也必须是一个
		ssender.sendWithParam(86, phoneNumbers[0], templateId,params, smsSign, "", "", callback);  // 签名参数未提供或者为空时，会使用默认签名发送短信	
	});
	
	socket.on('name_client',function(data){
		if(data.name){
			var AddName='update user set name=? where account='+Account;
			connection.query(AddName,data.name,function(err,result){
				if(err){
					console.log('[AddName err]-',err.message);
					return;
				}
			});
		}
		
	});
	
	//判断能否进入该关卡，如果能就把关卡信息发送给客户端，如果不能就不给玩家进入该关卡
	/*socket.on('level_client',function(data){
		var 
	});*/
	
	//关卡结算
	//客户端把玩家通关数据一次性发给服务端，
	/*socket.on('result_client',function(data){
		if()
		//计算每小关通关星级
		var 
		//通过每小关星级给玩家派发奖励
		
	});*/
	//战斗结算，章程结束后，把当前获得的星级和数据库中的星级做一个比较
	//如果大于数据库中的星级就存入数据库，否则不做存入处理
	//var star1=0;//章程1的星级
	//var star2=0;//章程2的星级
	//var star3=0;//章程3的星级
	//var star4=0;//章程4的星级
	
	//进入游戏需要服务端告诉客户端的数据
	
	//背包事件，告诉客户端改玩家背包中有什么东西
	socket.on('Bag_client',function(data){
		//告诉该玩家背包中有什么东西
		var SelectGoods='select goods_id,goods_count from bag where account='+Account;
		connection.query(SelectGoods,function(err,result){
			if(err){
				console.log('[SelectGoods err]-',err.message);
				return;
			}
			socket.emit('Bag_server',{bag:result});
		});
	});
	
	//进入角色页面告诉客户端当前所拥有的角色和角色的各种属性
	socket.on('hero_client',function(data){
		
	});
	
	//角色升级
	socket.on('RoleGrade_client',function(data){
		//客户端告诉服务端现在要升级的角色id和使用的经验书数量
		//先查询当前角色所拥有的经验，然后加上使用的经验书之后的经验，再查询数据库使用经验书之后
		//应该有的等级，同时把新的等级和经验写入数据库
		var RoleExp=data.RoleExp;//存放角色经验
		var SelectRoleExp='select role_exp from users_roles where account='+Account+'role_id='+data.RoleId;
		var UpdateRoleGrade='update users_roles set role_exp=?,role_grade=? where account='+Account+'and role_id='+data.RoleId;
		var arrayexp=new Array(0,0,300,900,2700,6500,14000,23000,34000,48000,64000,85000,100000,120000,140000,165000,195000,225000,265000,305000,355000);//存放等级
		var RoleGrade;//角色等级
		connection.query(SelectRoleExp,function(err,result){
			if(err){
				console.log('[SelectRoleExp err]-',err.message);
				return;
			}
			RoleExp+=result[0].role_exp;
			//更新角色等级
			for(i=1;i<arrayexp.length;i++)
			{
				if(RoleExp<arrayexp[i]){
					RoleGrade=i-1;
					break;
				}
			}
			var UU=[RoleExp,RoleGrade];
			connection.query(UpdateRoleGrade,UU,function(err,result){
				if(err){
					console.log('[UpdateRoleGrade err]-',err.message);
					return;
				}
				socket.emit('RoleGrade_server',{message:RoleGrade});//告诉客户端操作后的等级
			});
		});
	});
	
	//物品消耗
	socket.on('GoodsConsume_client',function(){
		//客户端告诉服务端要使用的物品id和数量，服务端先查看该玩家是否有对应的物品和数量如果有就允许使用
		//同时更新数据库中的数据，如果没有就不允许使用并告诉客户端当前玩家实际的物品和数量，客户端对此作出
		//更正
	});
	//更新出战队列
	socket.on('HeroPlayed_client',function(data){
		var UpdateHero='update user set hero1=?,hero2=?hero3=? where account='+Account;
		var Uhero=[data.hero1,data.hero2,data.hero3];
		connection.query(UpdateHero,Uhero,function(err,result){
			if(err){
				console.log('[UpdateHero err]-',err.message);
				return;
			}
		});
	});
	
	//判断能否进入关卡和关卡胜利结算
	socket.on('battle_client',function(data){
		var arraygoods = new Array();//数组存放奖励物品id
		var arraynum=new Array();//数组存放奖励物品数量
		var arraygrade=new Array();//玩家新旧等级表
		var arraystarname=new Array('满足第一颗星星','满足第二颗星星','满足第三颗星星');
		var arraystarflag=new Array();
		var starsum=0;
		var goods;
		var goodsnum=0;
		var num=0;
		var exp1=0;
		var coin1=0;
		var UserGrade=0;
		var LevelExp=[[400,500,600],[800,1000,1200],[2500,3000,3500],
					  [3500,4500,5500],[5000,6500,8000],[7000,9000,11000],
					  [8000,10000,12000],[9500,12000,14500],[13000,16000,19000],
					  [16000,20000,24000],[18800,23600,28400],[24900,31800,38700],
					  [40000,50000,60000]];
		var LevelCoin=[[800,1000,1200],[1250,1500,1750,2000],[2500,3000,3500],
					  [4000,5000,6000],[5500,7000,8500],[8000,10000,12000],
					  [11000,14000,17000],[14000,18000,22000],[20000,25000,30000],
					  [26000,32000,38000],[32500,40000,47500],[50000,60000,70000],
					  [80000,100000,120000]];
		//首通经验奖励
		var FirstExp=[300,600,2000,2500,3500,5000,6000,7000,10000,12000,14000,18000,30000];
		//首通金币奖励
		var FirstCoin=[600,1000,2000,3000,4000,6000,8000,10000,15000,20000,25000,40000,60000];
		//角色和玩家升级所需经验值
		var arrayexp=new Array(0,0,300,900,2700,6500,14000,23000,34000,48000,64000,85000,100000,120000,140000,165000,195000,225000,265000,305000,355000);//存放等级
		//首通武器奖励
		var FirstWeapon=[101,301,502,503,701,702,702,1002,1003,1302,1502,1503,1803];//武器
		//固定掉落书籍
		var ArrayBook=[27,54,165,240,345,480,540,645,870,1080,1272,1701,2700];
		var SelectLevel='select level_id from user_level where account='+Account;
		var SelectStar='select star form user_level where account='+Account+'and level_id='+data.level;
		var AddLevel='insert into user_level(account,level_id,star) values(?,?,?)';
		var UpdateStar='update user_level set star=?where account='+Account+'and level_id='+data.level;
		var SelectMaxLevel='select max(level_id) from user_level where account='+Account;
		var AddGoods='insert into bag(account,goods_id,goods_count) values(?,?,?)';
		var SelectGoods='select goods_count from bag where account='+Account+'goods_id='+goods;
		var UpdateGoods='update bag set goods_count=godds_count+'+num+' where account='+Account+'and goods_id='+goods;
		var SelectExp='select exp_now from user where account='+Account;
		var UpdateGrade='update user set grade=? where account='+Account;
		var UpdateExp='update user set exp_now=? where account='+Account;
		var UpdateCoin='update user set coin=coin+'+coin1+'where account='+Account;
		var SelectGrade='select grade from user where account='+Account; 
		var SelectHero='select hero1,hero2,hero3 from user where account='+Account;
		//判断是否能进入该关卡
		var access=0;
		if(data.level=='1'){
			access=1;
		}
		else{
			connection.query(SelectMaxLevel,function(err,result){
				if(err){
					console.log('[SelectMaxLevel err]-',err.message);
					return;
				}
				if(data.level>result[0].level_id+1){
					socket.emit('battle_server',{enter:'no'});
				}
				else{
					socket.emit('battle_server',{enter:'yes'});
					access=1;
				}
			});
		}
		//如果能进入该关卡并且胜利
		if(access==1&&data.victory=='yes'){
			var star=1;
			//通关就可以拿到一颗星
			arraystarflag.push(1);
			//计算每小关通过星级
			if(data.level=='1'){
				//判断是否满足第二颗星,队伍中有薇薇安
				var star2=0;
				connection.query(SelectHero,function(err,result){
					if(err){
						console.log('[SelectHero err]-',err.message);
						return;
					}
					if(result[0].hero1=='薇薇安id'){
						star2=1;
					}
					else if(result[0].hero2==''){
						star2=1
					}
					else if(result[0].hero3==''){
						star2=1;
					}
					
				});
				if(star2==1){
					arraystarflag.push(1);
					star+=star2;
				}
				else{
					arraystarflag.push(0);
				}
				//判断是否满足第三颗星,因为网络有时延所以判断通关时间在客户端那边计算
				if(data.time<10){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			
			if(data.level=='2'){
				//计算每小关通过星级
				
				var star2=0;
				//判断是否满足第二颗星
				
				if(star2==1){
					arraystarflag.push(1);
					star+=star2;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			if(data.level=='3'){
				//计算每小关通过星级
				var star2=0;
				//判断是否满足第二颗星
				
				if(star2==1){
					arraystarflag.push(1);
					star+=star2;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			if(data.level=='4'){
				//计算每小关通过星级
				//判断是否满足第二颗星
				var star2=0;
				connection.query(SelectHero,function(err,result){
					if(err){
						console.log('[SelectHero err]-',err.message);
						return;
					}
					if(result[0].hero1=='莉可丽丝id'){
						star2=1;
					}
					else if(result[0].hero2=='莉可丽丝id'){
						star2=1
					}
					else if(result[0].hero3=='莉可丽丝id'){
						star2=1;
					}
					
				});
				if(star2==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			if(data.level=='5'){
				//计算每小关通过星级	
				var star2=0;
				//判断是否满足第二颗星
				
				if(star2==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			if(data.level=='6'){
				//计算每小关通过星级	
				var star2=0;
				//判断是否满足第二颗星
				
				if(star2==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			
			if(data.level=='7'){
				//计算每小关通过星级
				var star2=0;
				//判断是否满足第二颗星
				connection.query(SelectHero,function(err,result){
					if(err){
						console.log('[SelectHero err]-',err.message);
						return;
					}
					if(result[0].hero1=='美杜莎id'){
						star2=1;
					}
					else if(result[0].hero2=='美杜莎id'){
						star2=1
					}
					else if(result[0].hero3=='美杜莎id'){
						star2=1;
					}
					
				});
				if(star2==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			
			if(data.level=='8'){
				//计算每小关通过星级
				var star2=0;
				//判断是否满足第二颗星
				
				if(star2==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			
			if(data.level=='9'){
				//计算每小关通过星级
				var star2=0;
				//判断是否满足第二颗星
				
				if(star2==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			
			if(data.level=='10'){
				//计算每小关通过星级
				var star2=0;
				//判断是否满足第二颗星
				
				if(star2==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			
			if(data.level=='11'){
				//计算每小关通过星级
				var star2=0;
				//判断是否满足第二颗星
				
				if(star2==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			
			if(data.level=='12'){
				//计算每小关通过星级
				var star2=0;
				//判断是否满足第二颗星
				
				if(star2==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			
			if(data.level=='13'){
				//计算每小关通过星级
				var star2=0;
				//判断是否满足第二颗星
				
				if(star2==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
				var star3=0;
				//判断是否满足第三颗星
				
				if(star3==1){
					arraystarflag.push(1);
					star+=1;
				}
				else{
					arraystarflag.push(0);
				}
			}
			
			
			connection.query(SelectLevel,function(err,result){
				if(err){
					console.log('[Select error]-',err.message);
					return;
				}
				//首通
				if(result==''){
					goods=FirstWeapon[data.level];
					arraygoods.push(FirstWeapon[data.level]);
					arraynum.push(1);
					exp1+=FirstExp[data.level];
					coin1+=FirstCoin[data.level];
					//颁发首通奖励,告诉客户端奖励信息
					//socket.emit('battle_server',{:goodsnum})
					//把奖励物品录入数据库背包中,先查看数据库中是否有这个物品如果有则更新物品数量，如果没有就插入数据
					connection.query(SelectGoods,function(err,result){
						if(err){
							console.log('[SelectGoods err]-',err.message);
							return;
						}
						if(result[0].godds_count>0){
							num=1;
							connection.query(UpdateGoods,function(err,result){
								if(err){
									console.log('[UpdateGoods]-',err.message);
									return;
								}
							});
						}
						else{
							num=1;
							var addg=[Account,goods,num];
							connection.query(AddGoods,addg,function(err,result){
								if(err){
									colsole.log('[AddGoods err]-',err.message);
									return;
								}
							});
						}
					});
					
					//把首通获得星级记录入数据库
					var addl=[Account,data.level,star1];
					connection.query(AddLevel,addl,function(err,result){
						if(err){
							console.log('[insert error]-',err.message);
							return;
						}
					});
					socket.emit('battle_server',{flag:'首通奖励'});
				}
				
				//非首通如果当前获得星级大于历史星级则把星级记录入数据库
				else{
					connection.query(SelectStar,function(err,result){
						if(err){
							console.log('[SelectStar err]-',err.message);
							return;
						}
						if(star>result[0].star){
							connection.query(UpdateStar,star,function(err,result){
								if(err){
									console.log('[UpdateStar err]-',err.message);
									return;
								}
							});
						}
					});
				}
			});
			function RndNum(n){
				var rnd="";
				for(var i=0;i<n;i++){
					rnd+=Math.floor(Math.random()*10);
				}
				return rnd;
			}
			var num=RndNum(2);
			//关卡1可能掉落
			if(data.level=='1'){
				if(num>0&&num<=10){//10%掉落1级蓝色武器
					arraygoods.push(101);
					arraynum.push(1);
					goods=101;
				}
			}
			//关卡2可能掉落
			else if(data.level=='2'){
				if(num>0&&num<=20){
					arraygoods.push(301);
					arraynum.push(1);
					goods=301;
				}
			}
			//关卡3可能掉落
			else if(data.level=='3'){
				if(num>0&&num<=30){
					arraygoods.push(501);
					arraynum.push(1);
					goods=501;
				}
				else if(num>30&&num<=40){
					arraygoods.push(502);
					arraynum.push(1);
					goods=502;
				}
			}
			//关卡4可能掉落
			else if(data.level=='4'){
				if(num>0&&num<=30){
					arraygoods.push(501);
					arraynum.push(1);
					goods=501;
				}
				else if(num>30&&num<=40){
					arraygoods.push(502);
					arraynum.push(1);
					goods=502;
				}
			}
			//关卡5可能掉落
			else if(data.level=='5'){
				if(num>0&&num<=40){
					arraygoods.push(701);
					arraynum.push(1);
					goods=701;
				}
			}
			//关卡6可能掉落
			else if(data.level=='6'){
				if(num>0&&num<=20){
					arraygoods.push(701);
					arraynum.push(1);
					goods=701;
				}
				else if(num>20&&num<=40){
					arraygoods.push(702);
					arraynum.push(1);
					goods=702;
				}
			}
			//关卡7可能掉落
			else if(data.level=='7'){
				if(num>0&&num<=40){
					arraygoods.push(702);
					arraynum.push(1);
					goods=702;
				}
			}
			//关卡8可能掉落
			else if(data.level=='8'){
				if(num>0&&num<=30){
					arraygoods.push(1001);
					arraynum.push(1);
					goods=1001;
				}
				else if(num>30&&num<=40){
					arraygoods.push(1002);
					arraynum.push(1);
					goods=1002;
				}
			}
			//关卡9可能掉落
			else if(data.level=='9'){
				if(num>0&&num<=30){
					arraygoods.push(1002);
					arraynum.push(1);
					goods=1002;
				}
				else if(num==31){
					arraygoods.push(1003);
					arraynum.push(1);
					goods=1003;
				}
			}
			//关卡10可能掉落
			else if(data.level=='10'){
				if(num>0&&num<=30){
					arraygoods.push(1301);
					arraynum.push(1);
					goods=1301;
				}
				else if(num>30&&num<=40){
					arraygoods.push(1302);
					arraynum.push(1);
					goods=1302;
				}
				else if(num>40&&num<=45){
					arraygoods.push(1303);
					arraynum.push(1);
					goods=1303;
				}
			}
			//关卡11可能掉落
			else if(data.level=='11'){
				if(num>0&&num<=30){
					arraygoods.push(1501);
					arraynum.push(1);
					goods=1501;
				}
				else if(num>30&&num<=40){
					arraygoods.push(1502);
					arraynum.push(1);
					goods=1502;
				}
				else if(num==41){
					arraygoods.push(1503);
					arraynum.push(1);
					goods=1503;
				}
			}
			//关卡12可能掉落
			else if(data.level=='12'){
				if(num>0&&num<=20){
					arraygoods.push(1501);
					arraynum.push(1);
					goods=1501;
				}
				else if(num>20&&num<=60){
					arraygoods.push(1502);
					arraynum.push(1);
					goods=1502;
				}
				else if(num>60&&num<=80){
					arraygoods.push(1503);
					arraynum.push(1);
					goods=1503;
				}
			}
			//第13关无掉落
			if(data.level<=12){
				connection.query(SelectGoods,function(err,result){
					if(err){
						console.log('[SelectGoods err]-',err.message);
						return;
					}
					if(result[0].goods_count>0){
						num=1;
						connection.query(UpdateGoods,function(err,result){
							if(err){
								console.log('[UpdateGoods]-',err.message);
								return;
							}
						});
					}
					else{
						num=1;
						var addg=[Account,goods,num];
						connection.query(AddGoods,addg,function(err,result){
							if(err){
								colsole.log('[AddGoods err]-',err.message);
								return;
							}
						});
					}
				});
			}
			
			//固定掉落奖励,同时更新数据库背包中
			goods=6666;
			connection.query(SelectGoods,function(err,result){
				if(err){
					console.log('[SelectGoods err]-',err.message);
					return;
				}
				if(result[0].godds_count>0){
					num=ArrayBook[data.level];
					connection.query(UpdateGoods,function(err,result){
						if(err){
							console.log('[UpdateGoods]-',err.message);
							return;
						}
					});
				}
				else{
					num=ArrayBook[data.level];
					var addg=[Account,goods,num];
					connection.query(AddGoods,addg,function(err,result){
						if(err){
							colsole.log('[AddGoods err]-',err.message);
							return;
						}
					});
				}
			});
			arraygoods.push(6666);//掉落经验书
			arraynum.push(ArrayBook[data.level]);
			
			if(start==1){
				exp1+=LevelExp[data.level][1];
				coin1+=LevelCoin[data.level][1];
				socket.emit('battle_server',{goods1:arraygoods,goods2:arraynum,star:start1,exp:exp1,coin:coin1});
			}
			else if(start==2){
				exp1+=LevelExp[data.level][2];
				coin1+=LevelCoin[data.level][2];
				socket.emit('battle_server',{goods1:arraygoods,goods2:arraynum,star:start1,exp:exp1,coin:coin1});
			}
			else if(start==3){
				exp1+=LevelExp[data.level][3];
				coin1+=LevelCoin[data.level][3];
				socket.emit('battle_server',{goods1:arraygoods,goods2:arraynum,star:start1,exp:exp1,coin:coin1});
			}
			var exp_temp=0
			//查询玩家战斗前等级
			connection.query(SelectGrade,function(){
				if(err){
					console.log('[SelectGrade err]-',err.message);
					return;
				}
				arraygrade.push(result);
			});
			//查询玩家当前经验值，并把战斗所获经验加入，同时更新当前玩家等级
			connection.query(SelectExp,function(err,result){
				if(err){
					console.log('[SelectExp err]-',err.message);
					return;
				}
				exp_temp=result+exp1;
			});
			Uexp=[exp_temp];
			connection.query(UpdateExp,Uexp,function(err,result){
				if(err){
					console.log('[UpdateExp err]-',err.message);
					return;
				}
			});
			//更新玩家等级
			for(i=1;i<arrayexp.length;i++)
			{
				if(exp_temp<arrayexp[i]){
					UserGrade=i-1;
					return;
				}
			}
			UGrade=[UserGrade];
			connection.query(UpdateGrade,UGrade,function(err,result){
				if(err){
					console.log('[UpdateGrade]-',err.message);
					return;
				}
			});
			arraygrade.push(UserGrade);
			socket.emit('battle_server',{usergrade:arraygrade});
			//把玩家所获金币加入
			connection.query(UpdateCoin,function(err,result){
				if(err){
					console.log('[UpdateCoin err]-',err.message);
					return;
				}
			});
		}
		
	});
	
	//章节奖励,首先是查询到目前为止最大通过关卡id，计算一个大关得到的星级总数，然后再查询是否已经领取章节奖励，如果未领取
	//就告诉客户端可以领取，否则告诉客户端不能领取或已经领取，客户端领取后需要告诉服务端已经领取，服务端需要把领取的章节奖励做一个记录
	socket.on('award_client',function(data){
		var AwardWeaponStar6=[101,702,1002,1502];
		var AwardWeaponStar9=[502,703,1003,1503];
		var SelectMaxLevel='select max(level_id) from user_level where account='+Account;
		var MaxLevel;
		var LevelStar;
		connection.query(SelectMaxLevel,function(err,result){
			if(err){
				console.log('[SelectMaxLevel err]-',err.message);
				return;
			}
			MaxLevel=result[0].level_id;
		});
		
		for(var i=1;i<=MaxLevel;i++){
			var LevelId=parseInt(i/3);//计算属于第几大关
			var SelectStar='select star from user_level where account='+Account+'and level_id='+i;
			connection.query(SelectStar,function(err,result){
				if(err){
					console.log('[SelectStar err]-',err.message);
					return;
				}
				LevelStar+=result[0].star;
			});
			if(LevelStar>=6){
				var SelectAward='select award_star6 from award_level where account='+Account+'and level_id='+LevelId;
				connection.query(SelectAward,function(err,result){
					if(err){
						console.log('[SelectAward err]-'.err.message);
						return;
					}
					//如果找不到对应信息即还未领取，此时把信息记录入数据库
					if(result[0].award_star6==''){
						var AddAwardStart6='insert into award_level(account,level_id,award_star6)values(?,?,?)';
						var AStar6=[Account,LevelId,1];
						connection.query(AddAwardStart6,AStar6,function(err,result){
							if(err){
								console.log('[AddAwardStart6 err]-',err.message);
								return;
							}
						});
					}
					else if(result[0].award_star6==0){//玩家已经领取过了该奖励
						socket.emit('award_server',{level:LevelId,flag:'6404'});
					}
					if(result[0].award_star6==''||result[0].award_star6==1){
						socket.emit('award_server',{level:LevelId,flag:'6'});
					}
				});
			}
			if(LevelStar==9){
				var SelectAward='select award_star9 from award_level where account='+Account+'and level_id='+LevelId;
				connection.query(SelectAward,function(err,result){
					if(err){
						console.log('[SelectAward err]-',err.message);
						return;
					}
					//如果找不到对应信息即还未领取，如果领取了客户端需要告诉服务端
					if(result[0].award_star9==null){
						var UpdateAwardStart9='update award_level set award_star9=? where account='+Account+'and level_id='+LevelId;
						connection.query(UpdateAwardStart9,1,function(err,result){
							if(err){
								console.log('[AddAwardStart6 err]-',err.message);
								return;
							}
						});
					}
					else if(result[0].award_star9==0){//玩家已经领取过了该奖励
						socket.emit('award_server',{level:LevelId,flag:'9404'});
					}
					//玩家还未领取，通知玩家可以领取
					if(result[0].award_star9==null||result[0].award_star9==1){
						socket.emit('award_server',{level:LevelId,flag:'9'});
					}
				});
			}
			if(i%3==0){
				LevelStar=0;
			}
		}
		//客户端打开了哪些章节奖励要告诉服务端,告诉服务端打开的大关id和星级数目
		var UpdateAwardStart6='update award_level set award_star6=?where account='+Account+'and level_id='+data.level;
		var UpdateAwardStart9='update award_level set award_star9=?where account='+Account+'and level_id='+data.level;
		var num;
		if(data.flag=='6'){
			connection.query(UpdateAwardStart6,0,function(err,result){
				if(err){
					console.log('[UpdateAwardStart6 err]-',err.message);
					return;
				}
			});
			//把章节奖励信息告诉客户端并存入数据库中
			skocket.emit('award_server',{message:AwardWeaponStar6[data.level]});
			var SelectGoods='select goods_count from bag where account='+Account+'goods_id='+AwardWeaponStar6[data.level];
			var UpdateGoods='update bag set goods_count=godds_count+'+num+' where account='+Account+'and goods_id='+AwardWeaponStar6[data.level];
			connection.query(SelectGoods,function(err,result){
				if(err){
					console.log('[SelectGoods err]-',err.message);
					return;
				}
				if(result[0].goods_count>0){
					num=1;
					connection.query(UpdateGoods,function(err,result){
						if(err){
							console.log('[UpdateGoods]-',err.message);
							return;
						}
					});
				}
				else{
					num=1;
					var addg=[Account,goods,num];
					connection.query(AddGoods,addg,function(err,result){
						if(err){
							colsole.log('[AddGoods err]-',err.message);
							return;
						}
					});
				}
			});
		}
		if(data.flag=='9'){
			connection.query(UpdateAwardStart9,0,function(err,result){
				if(err){
					console.log('[UpdateAwardStart9 err]-',err.message);
					return;
				}
			});
			//把章节奖励信息告诉客户端并存入数据库中
			skocket.emit('award_server',{message:AwardWeaponStar9[data.level]});
			var SelectGoods='select goods_count from bag where account='+Account+'goods_id='+AwardWeaponStar9[data.level];
			var UpdateGoods='update bag set goods_count=godds_count+'+num+' where account='+Account+'and goods_id='+AwardWeaponStar9[data.level];
			connection.query(SelectGoods,function(err,result){
				if(err){
					console.log('[SelectGoods err]-',err.message);
					return;
				}
				if(result[0].goods_count>0){
					num=1;
					connection.query(UpdateGoods,function(err,result){
						if(err){
							console.log('[UpdateGoods]-',err.message);
							return;
						}
					});
				}
				else{
					num=1;
					var addg=[Account,goods,num];
					connection.query(AddGoods,addg,function(err,result){
						if(err){
							colsole.log('[AddGoods err]-',err.message);
							return;
						}
					});
				}
			});
		}
	});
	
});
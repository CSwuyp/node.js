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
    console.log("New connection from ", socket.request.connection.remoteAddress );
	socket.on('register_client',function(data){
		var  addSql = 'INSERT INTO user(account,password) VALUES(?,?)';
		console.log(data);
		var  addSqlParams = [data.account,data.password];
		if(data.code!=VerificationCode||data.code==-1){
			logger.write(data.account);
			logger.write(':验证码错误\n');
			socket.emit('register_server',{message:'406'});
			return;
		}
		else{
			connection.query(addSql,addSqlParams,function (err, result) {
			if(err){
				//logger.write(data.account);
				//logger.write('：帐号已被注册\n');
				//socket.emit('register_server',{message:'403'});
				console.log('[INSERT ERROR] - ',err.message);
				logger.write(err.message);
				logger.write('\n');
				return;//如果失败了就直接return不会继续下面的代码
			}
			socket.emit('register_server',{message:'200'});
			console.log("OK");
			logger.write(data.account);
			logger.write('帐号注册成功\n');
			});
		}
		
		
		
	});
	//验证码
	socket.on('code_client',function(data){
		var SelectAccount='select * from user where account='+data.account;
		connection.query(SelectAccount,function(err,result){
			if(result!=''){
				socket.emit('code_server',{message:'403'});//帐号已经被注册
				console.log(data.account);
				console.log(':帐号已经被注册');
				logger.write(data.account);
				logger.write(':帐号已经被注册\n');
				return;
			}
			else{
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
			}
		});
		
		
	});
	
	//登录事件
	var Account=0;
	socket.on('login_client',function(data){
		var SelectAccount='select* from user where account='+data.account;
		var SelectSQL = "select account,password from user where account = '"+data.account+"' and password = '"+data.password+"'";
		var SelectFlag="select flag from user where account="+data.account;
		var UpdateFlag='update user set flag=? where account='+data.account;
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
				socket.emit('login_server',{message:'404'});
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
						socket.emit('login_server',{message:'406'});
						return;
					}
					else//如果检测到用户已经在线则把前面的逼迫下线，同时把当前用户账号登录，并把当前的socket.id记录入数据库
					{
						connection.query(SelectFlag,function (err, result) {
							if(err){
								console.log('[login ERROR] - ',err.message);
								return;
							}
							console.log('数据库中socket.id:',result[0].flag);
							//断开旧的套接字的连接
							if (io.sockets.connected[result[0].flag]) {
								io.sockets.connected[result[0].flag].disconnect();
								logger.write(data.account);
								logger.write(':账号被逼下线\n');
							}
						});
						console.log('新的socket.id:',socket.id);
						//把新的套接字id存入数据库
						connection.query(UpdateFlag,socket.id,function(err,result){
							if(err){
								console.log('[update error]-',err.message);
								return;
							}
						});
						logger.write(data.account);
						logger.write(':账号登录成功\n');
						console.log("登陆成功");
						Account=data.account;
						socket.emit('login_server',{message:'200'});
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
		if(data.code==VerificationCode&&data.code!=-1){
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
		else{
			logger.write(data.account);
			logger.write(':输入验证码错误，修改密码失败');
			socket.emit('password_server',{message:'验证码错误'});
			return;
		}
	});
	
	//判断是否断开连接
	/*socket.on('disconnect',function(data){
		console.log(data+'-disconnect');
	});*/
	//首次登录给用户起名字
	socket.on('name_client',function(data){
		var SelectName='select name from user where account='+Account;
		connection.query(SelectAccount,function(err,result){
			if(err){
				console.log('[login error]-',err.message);
				return;
			}
			if(result=='')
			{
				socket.emit('name_server',{message:"用户未起名字"});
			}
		});
	});
	
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
	socket.on('battle_client',function(data){
		var arraygoods = new Array();//数组存放奖励物品id
		var arraynum=new Array();//数组存放奖励物品数量
		var arraygrade=new Array();//玩家新旧等级表
		var arraystarname=new Array('满足第一颗星星','满足第二颗星星','满足第三颗星星');
		var arraystarflag=new Array();
		var starsum=0;
		var goods=0;
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
		var SelectLevel='select level_id from user_level where account='+Account;
		var SelectStar='select start  form user_level where account='+Account+'and level_id='+data.level;
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
		//判断是否能进入该关卡
		var access=0;
		if(data.level==1){
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
		if(access==1&&data.victory==yes){
			//计算每小关通过星级
			//满足第一颗小星
			var star1=0;
			
			//判断是否满足第一颗星
			
			if(start1==1){
				arraystarflag.push(1);
			}
			else{
				arraystarflag.push(0);
			}
			
			var star2=0;
			//判断是否满足第二颗星
			
			if(star2==1){
				arraystarflag.push(1);
			}
			else{
				arraystarflag.push(0);
			}
			var star3=0;
			//判断是否满足第三颗星
			
			if(star3==1){
				arraystarflag.push(1);
			}
			else{
				arraystarflag.push(0);
			}
			
			connection.query(SelectLevel,function(err,result){
				if(err){
					console.log('[Select error]-',err.message);
					return;
				}
				//首通
				if(result==''){
					goods=101;
					arraygoods.push(101);
					arraynum.push(1);
					exp1+=300;
					coin1+=600;
					//颁发首通奖励,告诉客户端奖励信息
					//socket.emit('battle_server',{:goodsnum})
					//把奖励物品录入数据库背包中,先查看数据库中是否有这个物品如果有则更新物品数量，如果没有就插入数据
					connection.query(SelectGoods,function(err,result){
						if(err){
							console.log('[SelectGoods err]-',err.message);
							return;
						}
						if(result>0){
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
					var addl=[Account,1,star1];
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
						if(star1>result){
							connection.query(UpdateStar,star1,function(err,result){
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
			if(num>=0&&num<=10)//10%掉落1级蓝色武器
			{
				arraygoods.push(101);
				arraynum.push(1);
				goods=101;
				//socket.emit('battle_server',{weapon_id:goods});
				//同时更新数据库背包中
				connection.query(SelectGoods,function(err,result){
					if(err){
						console.log('[SelectGoods err]-',err.message);
						return;
					}
					if(result>0){
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
				if(result>0){
					num=6;
					connection.query(UpdateGoods,function(err,result){
						if(err){
							console.log('[UpdateGoods]-',err.message);
							return;
						}
					});
				}
				else{
					num=6;
					var addg=[Account,goods,num];
					connection.query(AddGoods,addg,function(err,result){
						if(err){
							colsole.log('[AddGoods err]-',err.message);
							return;
						}
					});
				}
			});
			arraygoods.push(6666);//掉落6本经验书
			arraynum.push(6);
			if(start1==1){
				exp1+=400;
				coin1+=800;
				socket.emit('battle_server',{goods1:arraygoods,goods2:arraynum,star:start1,exp:exp1,coin:coin1});
			}
			if(start1==2){
				exp1+=500;
				coin1+=1000;
				socket.emit('battle_server',{goods1:arraygoods,goods2:arraynum,star:start1,exp:exp1,coin:coin1});
			}
			if(start1==2){
				exp1+=600;
				coin1+=1200;
				socket.emit('battle_server',{goods1:arraygoods,goods2:arraynum,star:start1,exp:exp1,coin:coin1});
			}
			var exp_temp=0
			connection.query(SelectGrade,function(){
				if(err){
					console.log('[SelectGrade err]-',err.message);
					return;
				}
				arraygrade.push(result);
			})
			//查询玩家当前经验值，并把战斗所获经验加入，同时更新当前玩家等级
			connection.query(SelectExp,function(err,result){
				if(err){
					console.log('[SelectExp err]-',err.message);
					return;
				}
				var exp_temp=result+exp1;
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
});
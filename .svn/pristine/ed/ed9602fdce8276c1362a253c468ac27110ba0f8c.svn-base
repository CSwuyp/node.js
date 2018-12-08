//传输协议：服务端发送JSON格式的数据给客户端，客户端读取JSON格式的数据
'use strict';
var app = require('express')();
var express = require("express");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'reji' 
}); 
 
connection.connect();

server.listen(3000);

//app.use(express.static("./static"));//这是静态文件的路径

io.on('connection', function (socket) {
  console.log('websocket has connected')
  //socket.emit('message', { hello: '欢迎链接' });
  socket.on('connect',function(data){
	  onlineFlay=true;
	  console.log(data+'-connect');
	  //这里需要告诉客户端登录成功了，后期再加
  });
  socket.on('connect_error',function(data){
	  console.log(data+'-connect_error');
  });
  socket.on('connecct_timeout',function(data){
	  console.log(data+'-connecct_timeout');
  });
  socket.on('error',function(data){
	  console.log(data+'-error');
  });
  socket.on('disconnect',function(data){
	  onlineFlag=flase;
	  console.log(data+'-disconnect');
  });
  socket.on('reconnect',function(data){
	  console.log(data+'-reconnect');
  });
  socket.on('reconnect_attempt',function(data){
	  console.log(data+'-reconnect_attempt');
  });
  socket.on('reconnecting',function(data){
	  console.log(data+'-reconnecting');
  });
  socket.on('reconnect_error',function(data){
	  console.log(data+'-reconnect_error');
  });
  socket.on('reconnect_failed',function(data){
	  console.log(data+'-reconnect_failed');
  });
  socket.on('ping',function(data){
	  console.log(data+'-ping');
  });
  socket.on('pong',function(data){
	  console.log(data+'-pong');
  });
  //用户登录成功后客户端告诉服务端用户登录成功，发送事件是‘user_client’监听事件是“user_server”,服务端监听事件是“user_client”
  //发送事件是“user_server”,服务端把用户的基本信息发送给客户端
  socket.on('user_client', function (data) {
	var account_s = "select name from user where account='"+data.account+"'";
	connection.query(account_s,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
		result = JSON.stringify(result);
		result = JSON.parse(result);
       console.log(result);
	   socket.emit('user_server',result);//传一个name变量给客户端
	});
  });
 
  //服务端把玩家所拥有的角色信息发送给客户端
    socket.on('RoleMessage_client',function(data){
	  //var role_s='select * from users_roles,role where users_roles.role_id=role.role_id and users_roles.account='+data.account;
	  var role_s='select * from users_roles,role,weapon_levels where users_roles.role_id=role.role_id and weapon_levels.weapon_id=users_roles.weapon_id and users_roles.account='+data.account;
	  connection.query(role_s,function(err,result){
		  if(err){
			  console.log('[select error]-',err.message);
			  return;
		  }
		  result=JSON.stringify(result);
		  result=JSON.parse(result);
		  console.log(result);
		  socket.emit('RoleMessage_server',result);
	  });
  });
  //把玩家所拥有的角色对应的技能信息发送给客户端
socket.on('RoleSkill_client',function(data){
	var skill='select * from skill';
	connection.query(skill,function (err, result) {
		if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		result = JSON.stringify(result);
		result = JSON.parse(result);
		console.log(result);
		socket.emit('RoleSkill_server',result);	
	});
});
  //服务端把对应关卡的怪物信息发送给客户端,在进入每一个关卡之前，客户端给服务端发送对应关卡id然后服务端把对应关卡怪物信息发送给客户端
socket.on('Monster_client',function(data){
	
	
	
	
	socket.emit('Monster_server',result);
});
 //服务端把对应关卡的地图信息发送给客户端
 
 
  //作弊验证——技能id(data.id)、技能CD(data.time)、技能伤害验证(data.hurt)
  	var d=new Date();//
	var time_low001=d.getTime();//技能1上次释放的时间
	var count=0;//数据异常次数计算
  socket.on('Skill_client',function(data){
	if(data.id==='001')//对技能001进行判断
	{
		var cd=data.time-time_low001;
		var time_cd ='select skill_cooldown from skill where skill_id='+data.id; //查找技能CD时间
		connection.query(time_cd,function (err, result) {
			if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
			}
			if(cd<result)
			{
				count++;
			}
		});
		time_low001=data.time;//存放技能释放时间点
		var hurt_s='select skill_hurt from skill where skill_id='+data.id;//查找技能伤害
		connection.query(hurt_s,function(err,result){
			if(err){
				console.log('[SELECT ERROR]-',err.message);
				return;
			}
			if(data.hurt>skill_hurt)
			{
				count++;
			}
		});
		if(count>10)//检测到数据异常后是否要进行玩家进行处理后期再决定，现在做的是只是进行提醒
		{
			socket.emit('skill_server','检测到你的战斗数据存在异常，请诚实游戏');
		}
	}
  });
  /*socket.on('say', function (data) {
    console.log(data);
    if (data.my === '走，一起吃饭吧') {
      io.sockets.emit('eating', { hello: '果断走起呀！' });
      return;
    }
    io.sockets.emit('news', { hello: data.my });
  });*/
});
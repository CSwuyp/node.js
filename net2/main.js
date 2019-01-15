'use strict';
// 导入MySql模块
var mysql = require('mysql');
const { query } = require('../sql/DBConfig');
var userSQL = require('../sql/Usersql');
var app = require('express')();
var express = require("express");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs')//文件操作
var loginErrorLog = fs.createWriteStream('../log/loginError.log', {
  flags: 'a'
})
var BattleLog = fs.createWriteStream('../log/battle.log', {
  flags: 'a' 
})
var userTimeLog = fs.createWriteStream('../log/userTime.log', {
  flags: 'a' 
})
var Login=require('./login');
var Battle=require('./battle');
var LevelStar=require('./levelStar');
var HeroPlayed=require('./heroPlayed');
var Consume=require('./consume');
var Bag=require('./bag');
var Battle=require('./battle');
var Cheat=require('./cheat');
var LoginTime=require('../analyze/loginTime');

server.listen(8000);
io.on('connection',function(socket){
	console.log('websocket has connected');
	var str=socket.request.connection.remoteAddress;
	var Account;
	var Ip=str.replace(/[^0-9]/ig,"");
	//自动登录
	socket.on('login_client',function(data){
		console.log(Ip);
		console.log(socket.id);
		async function getData(){
			let DataList =await Login.login(Ip,socket.id);
			if(DataList==-1){
				socket.emit('login_server',{message:'404'});
			}else{
				if(io.sockets.connected[DataList.SocketId]){
					io.sockets.connected[DataList.SocketId].disconnect();
				}
				let SelectAccountResult = await query( userSQL.SelectAccount,Ip);
				Account= await SelectAccountResult[0].account;
				socket.emit('login_server',{message:'200'});
				getName();
				Login.addHero();
			}
		}
		async function getName(){
			let DataList=await Login.setName();
			console.log('自动登录',DataList)
			if(DataList==-1){
				socket.emit('name_server',{name:'404'});
			}else{
				socket.emit('name_server',{name:DataList});
			}
		}
		getData()
	});
	//发送手机验证码
	socket.on('code_client',function(data){
		console.log('准备发送验证码');
		console.log(data.account);
		Login.PhoneCode(data.account);
	});
	//登录注册实现
	socket.on('register_client',function(data){
		async function getData(){
			let DataList =await Login.Register(data.account,data.code,socket.id,Ip);
			if(DataList==-1){
				socket.emit('register_server',{message:'406'});
			}
			if(DataList==1){
				Account=await data.account;
				socket.emit('register_server',{message:'200'});
				getName();
				Login.addHero();
			}
			else{
				Account=await data.account;
				if(io.sockets.connected[DataList]){
					io.sockets.connected[DataList].disconnect();
				}
				socket.emit('register_server',{message:'200'});
				getName();
				Login.addHero();
				loginErrorLog.write(data.account);
				loginErrorLog.write(':账号多地同时登录，先登录者被迫下线\n');
			}
		}
		async function getName(){
			let DataList=await Login.setName();
			console.log('登录注册实现：',DataList);
			if(DataList==-1){
				socket.emit('name_server',{name:'404'});
			}else{
				socket.emit('name_server',{name:DataList});
			}
		}
		getData();
		
	});
	
	//关卡结算
	socket.on('battle_client',function(data){
		console.log('data.level',data.level);
		console.log(Account);
		//玩家进入关卡前先检查出战队列是否为空，如果为空就不允许进入关卡，如果不为空就允许进入关卡
		async function battleHero(){
			let result=await Battle.battleHero(Account);
			if(result==-1){
				console.log('出战队列为空',reuslt);
				socket.emit('battle_server',{BattleHero:'404'});
			}else{
				console.log('出战队列为',result);
				socket.emit('battle_server',{BattleHero:reuslt});
			}
		}
		async function getData(){
			// var temp=(LevelId).replace(/[^0-9]/ig,"");
			// var Level=parseInt((temp[0]-1)*3)+parseInt(temp[1]);
			//计算通关星级
			let DataStar=await Battle.star(data.level,Account,data.time,data.QTE,data.StrikeCount,data.RoleDeath );
			
			//角色一等级经验变化
			let DataRole1=await Battle.role1Grade(data.level,Account,data.time,data.QTE,data.StrikeCount,data.RoleDeath );
			//角色一等级经验变化
			let DataRole2=await Battle.role2Grade(data.level,Account,data.time,data.QTE,data.StrikeCount,data.RoleDeath );
			//角色一等级经验变化
			let DataRole3=await Battle.role3Grade(data.level,Account,data.time,data.QTE,data.StrikeCount,data.RoleDeath );
			Battle.levelStarSQL(data.level,Account,data.time,data.QTE,data.StrikeCount,data.RoleDeath);
			
			console.log('玩家在该关卡中所获星级:',DataStar);
			console.log('角色1等级经验变化',DataRole1);
			console.log('角色2等级经验变化',DataRole2);
			console.log('角色3等级经验变化',DataRole3);
			socket.emit('battle_server',{Star:DataStar,role1:DataRole1,role2:DataRole2,role3:DataRole3});
		}
		//如果战斗胜利就进行关卡结算,如果战斗失败就不进行关卡结算，只是把玩家的出战队列，进入关卡时间，角色等级记录到日志中
		if(Account){
			console.log('玩家账号',Account);
			console.log('玩家关卡信息',data);
			battleHero();
			//不管战斗胜利或者失败都将玩家战斗记录记下来
			//Battle.userLog(LevelId,Account,data.time,data.QTE,data.StrikeCount,data.RoleDeath,data.victory);
		}
	});
	
	//各个关卡对应星级
	socket.on('LevelStar_client',function(data){
		//告诉玩家大关的星级
		let BigLevelStar=new Array();
		
		async function getData(){
			//大关星级[第一大关星级，第二大关星级]
			for(var i=1;i<=2;i++){
				let DataList=await LevelStar.selectLevelStarSum(Account,i);
				BigLevelStar.push(DataList);
			}
			//[level_id,star,star1,star2,star3];
			let DataList=await LevelStar.levelStar(Account);
			
			socket.emit('LevelStar_server',{BigLevelStar:BigLevelStar,small:DataList})
		}
		
		
		if(Account){
			getData();
		}

	});
	
	//出战队列
	socket.on('HeroPlayed_client',function(data){
		if(Account){
			console.log(data.hero1,data.hero2,data.hero3);
			console.log(Account);
			HeroPlayed.heroPlayed(Account,data.hero1,data.hero2,data.hero3);
		}
		
		/*if(Account){
			getData();
		}
		async function getData(){
			HeroPlayed.heroPlayed(Account,data,hero1,data.hero2,data.hero3);
		}*/
	});
	
	
	// //物品消耗
	// socket.on('GoodsConsume_client',function(data){
		// if(data.goods_id){
			// Consume.goodsConsume(Account,data.goods_id,data.goods_count);
		// }
		// if(data.coin){
			// Consume.coinConsume(Account,data.coin);
		// }
	// });
	
	//背包信息
	// socket.on('bag_client',function(data){
		// if(Account){
			// getData();
		// }
		// async function getData(){
			// let dataList=await Bag.bag(Account);
			// socket.emit('bag_server',{bag:dataList});
		// }
	// });
	
	socket.on('cheat_client',function(data){
		async function getData(){
			//[英雄id，技能id，技能释放时间，技能伤害]
			let dataList=await Cheat.cheat(Account,data.message);
		}
		if(Account){
			getData();
		}
	});
	
	//星级奖励
	socket.on('awardLevel_client',function(data){
		
	});
	//告诉客户端所拥有的英雄和对应英雄的各种属性
	socket.on('hero_client',function(data){
		console.log('hero:');
		async function getData(){
			let SelectAccountResult = await query( userSQL.SelectAccount,Ip);
			Account= await SelectAccountResult[0].account;
			if(Account){
				let dataList=await HeroPlayed.heroInformation(Account);
				console.log(dataList);
				socket.emit('hero_server',{HeroInformation:dataList});
			}
		}
		getData();
	});
	
	//记录玩家离开游戏的时间
	socket.on('disconnect',function(data){
		if(Account){
			LoginTime.UserOnLineTime(Account);
		}
	});
	
	//玩家起名
	socket.on('name_client',function(data){
		if(Account&&data.name!=null){
			getData();
		}
		async function getData(){
			console.log(data);
			console.log(Account);
			var AUNR=[data.name,Account];
			let AddUserNameResult=await query(userSQL.AddUserName,AUNR);
		}
	});

});


/*
// 从连接池获取连接
    pool.getConnection(function (err, connection) {
        // 建立连接 添加一个用户信息
        connection.query(userSQL.SelectAccount, [15622184887], function (err, result) {
            if(err){
				console.log('err',err.message);
				return;
			}

            // 以json形式，把操作结果返回给前台页面
            console.log(result);

            // 释放链接
            connection.release();
        });
    });*/
	

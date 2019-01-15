'use strict';
// 导入MySql模块
var mysql = require('mysql');
const { query } = require('../sql/DBConfig');
var userSQL = require('../sql/Usersql');

//玩家在线时长统计
async function UserOnLineTime(Account){
	var myDate = new Date();//获取系统当前时间
	console.log('当前登录时间',myDate);
	//查询玩家登陆时的时间
	let LoginTimeResult= await query(userSQL.UserLoginTime,Account);
	
	var Temp = LoginTimeResult[0].LoginTime.replace(/\-/g, "/");
	var date = new Date(d1)
	console.log('上次登录时间',date);
	//得到这次玩家在线时长
	var time=parseInt(myDate-date) / 1000 / 60/60;
	console.log('玩家此次在线时长',time);
	//更新玩家总在线时长
	var UUOT=[time,Account];
	let UpdateUserOnlineTimeResult=await query(userSQL.UpdateUserOnlineTime,UUOT);
	console.log(UpdateUserOnlineTimeResult);
}


//这里输出最近七天未登录的玩家信息

//玩家上次登录时间





//这里输出一个月未登录的玩家信息

//玩家上次登录的时间



//玩家在线总时长排序



module.exports = {
	UserOnLineTime
}
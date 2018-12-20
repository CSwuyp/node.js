'use strict';
var app = require('express')();
var express = require("express");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql  = require('mysql');  
var fs = require('fs')
var QcloudSms = require("qcloudsms_js");


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

	console.log('websocket has connected')
	var VerificationCode;//验证码
	var Account=11;
	//注册事件
	
	//自动登录事件
		
		//var SelectAccount='select account from user where UserIp='+socket.request.connection.remoteAddress;
		//找出该IP最近登录的账号是哪个
		//var SelectAccount="select account from user where LoginTime in (select max(LoginTime) from user where UserIp='"+socket.request.connection.remoteAddress+"')'";
		var SelectAccount = 'select account from user where LoginTime in (select max(LoginTime) from user where UserIp='+19216835221+')';
		//var SelectAccount='select account from user where UserIp='+socket.request.connection.remoteAddress;
		//var SelectSQL = "select account,password from user where account = '"+data.account+"' and password = '"+data.password+"'";
		//var SelectSocketId='select SocketId from user where account='+Account;
		//var UpdateSocketId='update user set SocketId=?,LoginTime=? where account='+Account;
		console.log('fsdfs');
		connection.query(SelectAccount,function(err,result){
			if(err){
				console.log('[SelectAccount err]-',err.message);
				return;
			}
			console.log(result);
		});
		
		console.log('fdsd');
	
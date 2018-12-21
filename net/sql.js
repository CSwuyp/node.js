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
	var data=1;
	//自动登录事件
		var data=1;
		var SelectName='select name from user where account='+Account;
		connection.query(SelectName,function(err,result){
			if(err){
				console.log('[SelectName error]-',err.message);
				return;
			}
			console.log(result[0].name);
			if(result[0].name==null&&data==1)
			{
				console.log('404');
			}
		});
	
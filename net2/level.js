//测试用
'use strict';
// 导入MySql模块
var mysql = require('mysql');
const { query } = require('../sql/DBConfig');
var userSQL = require('../sql/Usersql');
var LevelStar=require('./levelStar');

var Account=15622184887;
var LevelId=1;
async function test(){
	LevelStar.selectLevelStarSum(Account,LevelId);
	LevelStar.levelStar(Account);
}
test();

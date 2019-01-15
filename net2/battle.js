//战斗结算
'use strict';
const { query } = require('../sql/DBConfig');
var userSQL = require('../sql/Usersql');
var fs = require('fs')//文件操作
var battleLog = fs.createWriteStream('../log/battle.log', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

//计算通关星级和星级对应条件，星级总数
async function star(LevelId,Account,Time,QTE,strike,death){
	//判断是否能进入该关卡
	/*var access=0;
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
	}*/
	var arraystarflag=new Array();
	//如果能进入该关卡并且胜利
	var star=1;
	//通关就可以拿到一颗星
	arraystarflag.push(1);
	//中文显示通关条件，可以是客户端显示也可以是放在同一个数组中，放在数字后面例如：
	arraystarflag.push('关卡通关');
	let SelectHeroResult = await query( userSQL.SelectHero,Account);
	//计算每小关通过星级
	if(LevelId=='1_1'){
		//判断是否满足第二颗星,队伍中有薇薇安
		var star2=0;
		if(SelectHeroResult[0].hero1=='1'){
			star2=1;
		}
		else if(SelectHeroResult[0].hero2=='1'){
			star2=1;
		}
		else if(SelectHeroResult[0].hero3=='1'){
			star2=1;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('队伍中含有薇薇安');
			star+=star2;
		}else{
			arraystarflag.push(0);
			arraystarflag.push('队伍中含有薇薇安');
		}
		//判断是否满足第三颗星，因为考虑到网络存在延时所以判断通关时间应该在客户端那边进行计时比较可靠
		if(Time<10){
			arraystarflag.push(1);
			arraystarflag.push('xx秒内过关');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('xx秒内过关');
		}
	}
	if(LevelId=='1_2'){
		//计算每小关通过星级
		
		var star2=0;
		
		//判断是否满足第二颗星
		if(strike<=40){
			star2=1;
		}else{
			star2=0;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('受击数不高于40');
			star+=star2;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('受击数不高于40');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(Time<10){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('xx秒内通关');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('xx秒内通关');
		}
	}
	if(LevelId=='1_3'){
		//计算每小关通过星级
		var star2=0;
		//判断是否满足第二颗星
		if(QTE=='true'){
			star2=1;
		}else{
			star2=0;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('在关卡中使用一次QTE');
			star+=star2;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('在关卡中使用一次QTE');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(death=='false'){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('无角色死亡');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('无角色死亡');
		}
	}
	if(LevelId=='2_1'){
		//计算每小关通过星级
		//判断是否满足第二颗星
		var star2=0;
		if(SelectHeroResult[0].hero1=='2'){
			star2=1;
		}
		else if(SelectHeroResult[0].hero2=='2'){
			star2=1;
		}
		else if(SelectHeroResult[0].hero3=='2'){
			star2=1;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('队伍中含有角色莉可丽丝');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('队伍中含有角色莉可丽丝');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(Time<=10){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('xx秒内过关');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('xx秒内过关');
		}
	}
	if(LevelId=='2_2'){
		//计算每小关通过星级	
		var star2=0;
		//判断是否满足第二颗星
		if(strike<=40){
			star3=1;
		}else{
			star3=0;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('受击数不高于40');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('受击数不高于40');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(Time<=10){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('xx秒内过关');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('xx秒内过关');
		}
	}
	if(LevelId=='2_3'){
		//计算每小关通过星级	
		var star2=0;
		//判断是否满足第二颗星
		if(QTE=='true'){
			star2=1;
		}else{
			star2=0;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('在关卡中使用一次QTE');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('在关卡中使用一次QTE');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(death=='false'){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('无角色死亡');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('无角色死亡');
		}
	}
	
	if(LevelId=='3_1'){
		//计算每小关通过星级
		var star2=0;
		//判断是否满足第二颗星
		if(SelectHeroResult[0].hero1=='3'){
			star2=1;
		}
		else if(SelectHeroResult[0].hero2=='3'){
			star2=1;
		}
		else if(SelectHeroResult[0].hero3=='3'){
			star2=1;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('队伍中含有角色美杜莎');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('队伍中含有角色美杜莎');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(Time<=10){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('xx秒内过关');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('xx秒内过关');
		}
	}
	
	if(LevelId=='3_2'){
		//计算每小关通过星级
		var star2=0;
		//判断是否满足第二颗星
		if(strike<=40){
			star2=1;
		}else{
			star2=0;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('受击数不高于40');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('受击数不高于40');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(Time<=10){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('xx秒内过关');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('xx秒内过关');
		}
	}
	
	if(LevelId=='3_3'){
		//计算每小关通过星级
		var star2=0;
		//判断是否满足第二颗星
		if(QTE=='true'){
			star2=1;
		}else{
			star2=0;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('在关卡中使用一次QTE');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('在关卡中使用一次QTE');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(death=='false'){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('无角色死亡');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('无角色死亡');
		}
	}
	
	if(LevelId=='4_1'){
		//计算每小关通过星级
		var star2=0;
		//判断是否满足第二颗星
		if(strike<=40){
			star2=1;
		}else{
			star2=0
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('受击数不高于40');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('受击数不高于40');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(Time<=10){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('xx秒内过关');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('xx秒内过关');
		}
	}
	
	if(LevelId=='4_2'){
		//计算每小关通过星级
		var star2=0;
		//判断是否满足第二颗星
		if(strike<=40){
			star2=1;
		}else{
			star2=0;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('受击数不高于40');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('受击数不高于40');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(Time<=40){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('xx秒内过关');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('xx秒内过关');
		}
	}
	
	if(LevelId=='4_3'){
		//计算每小关通过星级
		var star2=0;
		//判断是否满足第二颗星
		if(QTE=='true'){
			star2=1;
		}else{
			star2=0;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('在关卡中使用一次QTE');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('在关卡中使用一次QTE');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(death=='false'){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('无角色死亡');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('无角色死亡');
		}
	}
	
	if(LevelId=='5'){
		//计算每小关通过星级
		var star2=0;
		//判断是否满足第二颗星
		if(QTE=='true'){
			star2=1;
		}else{
			star2=0;
		}
		if(star2==1){
			arraystarflag.push(1);
			arraystarflag.push('在关卡中使用一次QTE');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('在关卡中使用一次QTE');
		}
		var star3=0;
		//判断是否满足第三颗星
		if(death=='false'){
			star3=1;
		}else{
			star3=0;
		}
		if(star3==1){
			arraystarflag.push(1);
			arraystarflag.push('无角色死亡');
			star+=1;
		}
		else{
			arraystarflag.push(0);
			arraystarflag.push('无角色死亡');
		}
	}
	arraystarflag.push(star);
	//console.log('star',arraystarflag);
	return arraystarflag;
}


//判断是否首通
async function firstPassLevel(Account,LevelId){
	var SL=[Account,LevelId];
	//console.log('判断首通',SL);
	let SelectLevelResult = await query( userSQL.SelectLevel,SL);
	if(SelectLevelResult==''){
		return 1;
	}else{
		return -1;
	}
}


//计算战斗所获经验
async function gainExp(LevelId,Account,Time,QTE,strike,death){
	//各关卡经验奖励
	var LevelExp=[[],[400,500,600],[800,1000,1200],[2500,3000,3500],
				  [3500,4500,5500],[5000,6500,8000],[7000,9000,11000],
				  [8000,10000,12000],[9500,12000,14500],[13000,16000,19000],
				  [16000,20000,24000],[18800,23600,28400],[24900,31800,38700],
				  [40000,50000,60000]];
	//首通经验奖励
	var FirstExp=[0,300,600,2000,2500,3500,5000,6000,7000,10000,12000,14000,18000,30000];
	let LevelStar=await star(LevelId,Account,Time,QTE,strike,death);
	//console.log('战斗所获星级',LevelStar);
	let isFirstPassLevel=await firstPassLevel(Account,LevelId);
	//console.log('战斗经验计算判断是否首通',isFirstPassLevel);
	var temp=(LevelId).replace(/[^0-9]/ig,"");
	var Level=parseInt((temp[0]-1)*3)+parseInt(temp[1]);
	//查找参加战斗的英雄
	/*let SelectHeroResult =await query(userSQL.SelectHero,Account);
	//查找战斗前参战英雄已拥有经验值
	let SHE=[Account,SelectHeroResult[0].hero1];
	let SelectHeroExpResult=await query(userSQL.SelectHeroExp,SHE,Account);*/
	//如果是首通
	var RoleExp;
	if(isFirstPassLevel==1){
		// console.log('关卡',Level);
		// console.log('首通关卡一',FirstExp[Level]);
		// console.log('返回值7',LevelStar[6]);
		// console.log('关卡一',LevelExp[Level][LevelStar[6]-1]);
		RoleExp=FirstExp[Level]+LevelExp[Level][LevelStar[6]-1];
		console.log('首通经验奖励',RoleExp);
	}else{
		RoleExp=LevelExp[Level][LevelStar[6]-1];
		console.log('非首通奖励',RoleExp);
	}
	//console.log('战斗所获得经验值',RoleExp);
	return RoleExp;
}


//参战角色一等级和经验值变化，并更新数据库中角色的等级和经验值，和角色一升级后的伤害
async function role1Grade(LevelId,Account,Time,QTE,strike,death){
	//console.log('角色一',Account);
	//角色和玩家升级所需经验值
	var arrayexp=new Array(0,0,300,900,2700,6500,14000,23000,34000,48000,64000,85000,100000,120000,140000,165000,195000,225000,265000,305000,355000);//存放等级
	var Change=new Array();
	let RoleExp=await gainExp(LevelId,Account,Time,QTE,strike,death);
	//console.log('角色一',RoleExp);
	var RoleGrade;
	//查找参加战斗的英雄
	let SelectHeroResult=await query(userSQL.SelectHero,Account);
	//console.log('参战英雄',SelectHeroResult);
	let SHE=[Account,SelectHeroResult[0].hero1];
	//查找战斗前参战英雄已拥有经验值
	let SelectHeroExpResult=await query(userSQL.SelectHeroExp,SHE);
	//console.log('英雄1',SelectHeroExpResult);
	RoleExp+=SelectHeroExpResult[0].role_exp;
	//console.log(RoleExp);
	Change.push(SelectHeroExpResult[0].role_exp);
	Change.push(RoleExp);
	//查找战斗前参战英雄已拥有的等级
	let SelectHeroGrade=await query(userSQL.SelectHeroGrade,SHE);
	Change.push(SelectHeroGrade[0].role_grade);
	//战斗后角色等级
	for(var i=1;i<arrayexp.length;i++)
	{
		if(RoleExp<arrayexp[i]){
			RoleGrade=i-1;
			break;
		}
	}
	Change.push(RoleGrade);
	
	//查询角色一升级前的伤害值和生命值
	var SHHDR1=[SelectHeroResult[0].hero1,SelectHeroGrade[0].role_grade];
	let SelectHeroHpDamageResult1=await query(userSQL.SelectHeroHpDamage,SHHDR1);
	Change.push(SelectHeroHpDamageResult1[0].hp);
	//查询角色一升级后的伤害和生命值
	var SHHDR2=[SelectHeroResult[0].hero1,RoleGrade];
	let SelectHeroHpDamageResult2=await query(userSQL.SelectHeroHpDamage,SHHDR2);
	Change.push(SelectHeroHpDamageResult2[0].hp);
	Change.push(SelectHeroHpDamageResult1[0].damage);
	Change.push(SelectHeroHpDamageResult2[0].damage);
	
	//更新角色一等级
	let URG=[RoleGrade,Account,SelectHeroResult[0].hero1];
	let UpdateRoleGradeResult=await query(userSQL.UpdateRoleGrade,URG);
	//更新角色一经验值
	let UHE=[RoleExp,Account,SelectHeroResult[0].hero1];
	let UpdateHeroExpResult=await query(userSQL.UpdateHeroExp,UHE);
	//console.log('角色一变化',Change);
	return Change;
}

//参战角色二等级和经验值变化，并更新数据库中角色的等级和经验值
async function role2Grade(LevelId,Account,Time,QTE,strike,death){
	//角色和玩家升级所需经验值
	var arrayexp=new Array(0,0,300,900,2700,6500,14000,23000,34000,48000,64000,85000,100000,120000,140000,165000,195000,225000,265000,305000,355000);//存放等级
	var Change=new Array();
	let RoleExp=await gainExp(LevelId,Account,Time,QTE,strike,death);
	var RoleGrade;
	//查找参加战斗的英雄
	let SelectHeroResult=await query(userSQL.SelectHero,Account);
	let SHE=[Account,SelectHeroResult[0].hero2];
	//查找战斗前参战英雄已拥有经验值
	let SelectHeroExpResult=await query(userSQL.SelectHeroExp,SHE);
	RoleExp+=SelectHeroExpResult[0].role_exp;
	Change.push(SelectHeroExpResult[0].role_exp);
	Change.push(RoleExp);
	//查找战斗前参战英雄已拥有的等级
	let SelectHeroGrade=await query(userSQL.SelectHeroGrade,SHE);
	Change.push(SelectHeroGrade[0].role_grade);
	//战斗后角色等级
	for(var i=1;i<arrayexp.length;i++)
	{
		if(RoleExp<arrayexp[i]){
			RoleGrade=i-1;
			break;
		}
	}
	Change.push(RoleGrade);
	
	//查询角色一升级前的伤害值和生命值
	var SHHDR1=[SelectHeroResult[0].hero2,SelectHeroGrade[0].role_grade];
	let SelectHeroHpDamageResult1=await query(userSQL.SelectHeroHpDamage,SHHDR1);
	Change.push(SelectHeroHpDamageResult1[0].hp);
	//查询角色一升级后的伤害和生命值
	var SHHDR2=[SelectHeroResult[0].hero2,RoleGrade];
	let SelectHeroHpDamageResult2=await query(userSQL.SelectHeroHpDamage,SHHDR2);
	Change.push(SelectHeroHpDamageResult2[0].hp);
	Change.push(SelectHeroHpDamageResult1[0].damage);
	Change.push(SelectHeroHpDamageResult2[0].damage);
	
	//更新角色二等级
	let URG=[RoleGrade,Account,SelectHeroResult[0].hero2];
	let UpdateRoleGradeResult=await query(userSQL.UpdateRoleGrade,URG);
	//更新角色二经验值
	let UHE=[RoleExp,Account,SelectHeroResult[0].hero2];
	let UpdateHeroExpResult=await query(userSQL.UpdateHeroExp,UHE);
	//console.log('角色2变化',Change);
	return Change;
}

//参战角色三等级和经验值变化，并更新数据库中角色的等级和经验值
async function role3Grade(LevelId,Account,Time,QTE,strike,death){
	//角色和玩家升级所需经验值
	var arrayexp=new Array(0,0,300,900,2700,6500,14000,23000,34000,48000,64000,85000,100000,120000,140000,165000,195000,225000,265000,305000,355000);//存放等级
	var Change=new Array();
	let RoleExp=await gainExp(LevelId,Account,Time,QTE,strike,death);
	var RoleGrade;
	//查找参加战斗的英雄
	let SelectHeroResult=await query(userSQL.SelectHero,Account);
	let SHE=[Account,SelectHeroResult[0].hero3];
	//查找战斗前参战英雄已拥有经验值
	let SelectHeroExpResult=await query(userSQL.SelectHeroExp,SHE);
	RoleExp+=SelectHeroExpResult[0].role_exp;
	Change.push(SelectHeroExpResult[0].role_exp);
	Change.push(RoleExp);
	//查找战斗前参战英雄已拥有的等级
	let SelectHeroGrade=await query(userSQL.SelectHeroGrade,SHE);
	Change.push(SelectHeroGrade[0].role_grade);
	//战斗后角色等级
	for(var i=1;i<arrayexp.length;i++)
	{
		if(RoleExp<arrayexp[i]){
			RoleGrade=i-1;
			break;
		}
	}
	Change.push(RoleGrade);
	
	//查询角色一升级前的伤害值和生命值
	var SHHDR1=[SelectHeroResult[0].hero3,SelectHeroGrade[0].role_grade];
	let SelectHeroHpDamageResult1=await query(userSQL.SelectHeroHpDamage,SHHDR1);
	Change.push(SelectHeroHpDamageResult1[0].hp);
	//查询角色一升级后的伤害和生命值
	var SHHDR2=[SelectHeroResult[0].hero3,RoleGrade];
	let SelectHeroHpDamageResult2=await query(userSQL.SelectHeroHpDamage,SHHDR2);
	Change.push(SelectHeroHpDamageResult2[0].hp);
	Change.push(SelectHeroHpDamageResult1[0].damage);
	Change.push(SelectHeroHpDamageResult2[0].damage);
	
	//更新角色三等级
	let URG=[RoleGrade,Account,SelectHeroResult[0].hero3];
	let UpdateRoleGradeResult=await query(userSQL.UpdateRoleGrade,URG);
	//更新角色三经验值
	let UHE=[RoleExp,Account,SelectHeroResult[0].hero3];
	let UpdateHeroExpResult=await query(userSQL.UpdateHeroExp,UHE);
	//console.log('角色3变化',Change);
	return Change;
}

//判断出战队列是否为空
async function battleHero(Account){
	let SelectHeroResult=await query(userSQL.SelectHero,Account);
	if(SelectHeroResult[0].hero1==''||SelectHeroResult[0].hero2==''||SelectHeroResult[0].hero3==''){
		return -1;
	}
	return SelectHeroResult;
}

//更新关卡星级，如果是首通则直接插入，如果不是首通则更新关卡新的星级
async function levelStarSQL(LevelId,Account,Time,QTE,strike,death){
	//先判断是否是首通
	let isFirstPassLevel=await firstPassLevel(Account,LevelId);
	let LevelStar=await star(LevelId,Account,Time,QTE,strike,death);
	
	if(isFirstPassLevel==1){
		//首通
		var ASR=[Account,LevelId,LevelStar[6],LevelStar[0],LevelStar[2],LevelStar[4]];
		let AddLevelStarResult= await query(userSQL.AddLevelStar,ASR);
	}else{
		//如果当前所获星级高于历史星级则把当前所获星级写入数据库
		//查询战斗前该关卡的星级
		var SLSR=[LevelId,Account];
		let SelectLevelStarResult=await query(userSQL.SelectStar,SLSR);
		if(LevelStar[6]>SelectLevelStarResult[0].star)
		{
			var ULS=[LevelStar[6],LevelStar[0],LevelStar[2],LevelStar[4],LevelId,Account];
			console.log(ULS);
			let UpdateLevelStarResult =await query(userSQL.UpdateLevelStar,ULS);
			console.log(UpdateLevelStarResult);
			
			//更新大关所获星级
			var BigLevelStar=LevelStar[6]-SelectLevelStarResult[0].star;
			var temp=parseInt(LevelId);
			var UBL=[BigLevelStar,Account,temp];
			let UpdateBigLevelStarResult=await query(userSQL.UpdateBigLevelStar,UBL);
		}else{
			//如果当前所获星级低于历史星级则只把当前获得的星级条件做更新
			var ULSF=[LevelStar[0],LevelStar[2],LevelStar[4],LevelId,Account];
			let UpdateLevelStarFlagResult=await query(userSQL.UpdateLevelStarFlag,ULSF);
		}
	}
}

//计算获得金币




//关卡掉落，随机掉落和固定掉落
function RndNum(n){
	var rnd="";
	for(var i=0;i<n;i++){
		rnd+=Math.floor(Math.random()*10);
	}
	return rnd;
}

async function dropOutLevel(Account,LevelId){
	var arraygoods=new Array();//掉落物品id
	var arraynum=new Array();//掉落物品数量
	var num=RndNum(2);
	//关卡1可能掉落
	if(LevelId=='1_1'){
		if(num>0&&num<=10){//10%掉落1级蓝色武器
			arraygoods.push(101);
			arraynum.push(1);
			goods=101;
			levelsql(goods,Account);
		}
	}
	//关卡2可能掉落
	else if(LevelId=='1_2'){
		if(num>0&&num<=20){
			arraygoods.push(301);
			arraynum.push(1);
			goods=301;
			levelsql(goods,Account);
		}
	}
	//关卡3可能掉落
	else if(LevelId=='1_3'){
		if(num>0&&num<=30){
			arraygoods.push(501);
			arraynum.push(1);
			goods=501;
			levelsql(goods,Account);
		}
		else if(num>30&&num<=40){
			arraygoods.push(502);
			arraynum.push(1);
			goods=502;
			levelsql(goods,Account);
		}
	}
	//关卡4可能掉落
	else if(LevelId=='2_1'){
		if(num>0&&num<=30){
			arraygoods.push(501);
			arraynum.push(1);
			goods=501;
			levelsql(goods,Account);
		}
		else if(num>30&&num<=40){
			arraygoods.push(502);
			arraynum.push(1);
			goods=502;
			levelsql(goods,Account);
		}
	}
	//关卡5可能掉落
	else if(LevelId=='2_2'){
		if(num>0&&num<=40){
			arraygoods.push(701);
			arraynum.push(1);
			goods=701;
			levelsql(goods,Account);
		}
	}
	//关卡6可能掉落
	else if(LevelId=='2_3'){
		if(num>0&&num<=20){
			arraygoods.push(701);
			arraynum.push(1);
			goods=701;
			levelsql(goods,Account);
		}
		else if(num>20&&num<=40){
			arraygoods.push(702);
			arraynum.push(1);
			goods=702;
			levelsql(goods,Account);
		}
	}
	//关卡7可能掉落
	else if(LevelId=='3_1'){
		if(num>0&&num<=40){
			arraygoods.push(702);
			arraynum.push(1);
			goods=702;
			levelsql(goods,Account);
		}
	}
	//关卡8可能掉落
	else if(LevelId=='3_2'){
		if(num>0&&num<=30){
			arraygoods.push(1001);
			arraynum.push(1);
			goods=1001;
			levelsql(goods,Account);
		}
		else if(num>30&&num<=40){
			arraygoods.push(1002);
			arraynum.push(1);
			goods=1002;
			levelsql(goods,Account);
		}
	}
	//关卡9可能掉落
	else if(LevelId=='3_3'){
		if(num>0&&num<=30){
			arraygoods.push(1002);
			arraynum.push(1);
			goods=1002;
			levelsql(goods,Account);
		}
		else if(num==31){
			arraygoods.push(1003);
			arraynum.push(1);
			goods=1003;
			levelsql(goods,Account);
		}
	}
	//关卡10可能掉落
	else if(LevelId=='4_1'){
		if(num>0&&num<=30){
			arraygoods.push(1301);
			arraynum.push(1);
			goods=1301;
			levelsql(goods,Account);
		}
		else if(num>30&&num<=40){
			arraygoods.push(1302);
			arraynum.push(1);
			goods=1302;
			levelsql(goods,Account);
		}
		else if(num>40&&num<=45){
			arraygoods.push(1303);
			arraynum.push(1);
			goods=1303;
			levelsql(goods,Account);
		}
	}
	//关卡11可能掉落
	else if(LevelId=='4_2'){
		if(num>0&&num<=30){
			arraygoods.push(1501);
			arraynum.push(1);
			goods=1501;
			levelsql(goods,Account);
		}
		else if(num>30&&num<=40){
			arraygoods.push(1502);
			arraynum.push(1);
			goods=1502;
			levelsql(goods,Account);
		}
		else if(num==41){
			arraygoods.push(1503);
			arraynum.push(1);
			goods=1503;
			levelsql(goods,Account);
		}
	}
	//关卡12可能掉落
	else if(LevelId=='4_3'){
		if(num>0&&num<=20){
			arraygoods.push(1501);
			arraynum.push(1);
			goods=1501;
			levelsql(goods,Account);
		}
		else if(num>20&&num<=60){
			arraygoods.push(1502);
			arraynum.push(1);
			goods=1502;
			levelsql(goods,Account);
		}
		else if(num>60&&num<=80){
			arraygoods.push(1503);
			arraynum.push(1);
			goods=1503;
			levelsql(goods,Account);
		}
	}
	FixedDrop(Account,LevelId,arraygoods,arraynum);
	return {
		arraygoods:arraygoods,
		arraynum:arraynum
	};
}

//把关卡掉落物品写入数据库
async function levelsql(goods,Account){
		var SGR=[goods,Account];
		let SelectGoodsCountResult=await query(userSQL.SelectGoodsCount,SGR);
		if(SelectGoodsCountResult[0].goods_count>0){
			var UGR=[1,Account,goods];
			let UpdateGoodsResult=await query(userSQL.UpdateGoods,UGR);
		}else{
			var AGR=[Account,goods,1];
			let AddGoodsResult=await query(userSQL.AddGoods,AGR);
		}
}

//固定掉落奖励,同时更新数据库背包中
async function FixedDrop(Account,LevelId,arraygoods,arraynum){
	var temp=(LevelId).replace(/[^0-9]/ig,"");
	var Level=parseInt((temp[0]-1)*3)+parseInt(temp[1])
	//固定掉落书籍
	var ArrayBook=[27,54,165,240,345,480,540,645,870,1080,1272,1701,2700];
	var goods=666;
	var SGCR=[goods,Account];
	let SelectGoodsCountResult=await query(userSQL.SelectGoodsCount,SGCR);
	if(SelectGoodsCountResult[0].goods_count>0){
		var UGR=[1,Account,goods];
		let UpdateGoodsResult=await query(userSQL.UpdateGoods,UGR);
	}else{
		var AGR=[Account,goods,1];
		let AddGoodsResult=await query(userSQL.AddGoods,AGR);
	}
	
	arraygoods.push(666);//掉落经验书
	arraynum.push(ArrayBook[Level]);
}




//把玩家的战斗信息记录入日志
async function userLog(LevelId,Account,Time,QTE,strike,death,victory){
	//玩家帐号信息
	battleLog.write(Account.toString());
	battleLog.write('\t');
	//玩家选择的关卡
	battleLog.write(LevelId.toString());
	battleLog.write('\t');
	
	//玩家出战队列
	let result=await query(userSQL.SelectHero,Account);
	//查找战斗前参战英雄1的等级
	let SHE1=[Account,result[0].hero1];
	let SelectHeroGradeResult1=await query(userSQL.SelectHeroGrade,SHE1);
	battleLog.write((result[0].hero1).toString());
	battleLog.write('\t');
	battleLog.write((SelectHeroGradeResult1[0].role_grade).toString());
	battleLog.write('\t');
	
	//查询战斗前英雄2的等级
	let SHE2=[Account,result[0].hero2];
	let SelectHeroGradeResult2=await query(userSQL.SelectHeroGrade,SHE2);
	battleLog.write((result[0].hero2).toString());
	battleLog.write('\t');
	battleLog.write((SelectHeroGradeResult2[0].role_grade).toString());
	battleLog.write('\t');
	
	//查询战斗前英雄3的等级
	let SHE3=[Account,result[0].hero3];
	let SelectHeroGradeResult3=await query(userSQL.SelectHeroGrade,SHE3);
	battleLog.write((result[0].hero3).toString());
	battleLog.write('\t');
	battleLog.write((SelectHeroGradeResult3[0].role_grade).toString());
	battleLog.write('\t');
	
	
	//玩家在关卡中的时间
	battleLog.write(Time);
	battle.write('\t');
	//玩家战斗结束信息，胜利或者失败
	battleLog.write(victory);
	battleLog.write('\t');
	//玩家获得的奖励信息，也可以从这里来做到防作弊的效果，如果玩家修改自己的背包物品的数据，可以从奖励信息和实际拥有信息做一个对比就知道数据是否异常
	
	//
	battleLog.write('\r\n');
}








module.exports = {
	star,
	firstPassLevel,
	gainExp,
	role1Grade,
	role2Grade,
	role3Grade,
	battleHero,
	levelStarSQL,
	userLog
}
'use strict';
const { query } = require('../sql/DBConfig');
var userSQL = require('../sql/Usersql');

//告诉玩家他所拥有的英雄和英雄的各种属性
//[英雄id,英雄等级，exp,下次升级需要的经验，hp,damage]

async function heroInformation(Account){
	var HeroInformationArray=new Array();
	//首先查询玩家有哪些英雄users_roles
	let SelectOwnHeroResult=await query(userSQL.SelectOwnHero,Account);
	console.log('查询玩家有哪些英雄',SelectOwnHeroResult);
	console.log('chanfdu',SelectOwnHeroResult.length);
	for(var i=0;i<SelectOwnHeroResult.length;i++){
		//查找该英雄升级到下一级所需经验值
		var SHNGE=[SelectOwnHeroResult[i].role_id,SelectOwnHeroResult[i].role_grade+1];
		//console.log('SHNGE',SHNGE);
		//console.log(SelectOwnHeroResult[i].role_id);
		let SelectHeroNextGradeExp= await query(userSQL.SelectHeroNextGradeExp,SHNGE);
		//console.log('下一等级需要的经验',SelectHeroNextGradeExp);
		//通过英雄id和等级 查找该英雄生命值和伤害值
		var SHHD=[SelectOwnHeroResult[i].role_id,SelectOwnHeroResult[i].role_grade];
		let SelectHeroHpDamageResult=await query(userSQL.SelectHeroHpDamage,SHHD);
		var temp=new Array();
		for(var v in SelectOwnHeroResult[i]){
			temp.push(SelectOwnHeroResult[i][v]);
			//console.log(v+':'+SelectOwnHeroResult[i][v]);
		}
		temp.push(SelectHeroNextGradeExp[0].role_exp);
		temp.push(SelectHeroHpDamageResult[0].hp);
		temp.push(SelectHeroHpDamageResult[0].damage);
		HeroInformationArray.push(temp);	 
	}
	console.log('英雄 信息',HeroInformationArray);
	return HeroInformationArray;
	
}


//更新出战队列，
async function heroPlayed(Account,hero1,hero2,hero3){
	var Uhero=[hero1,hero2,hero3,Account];
	let UpdateHeroResult=await query(userSQL.UpdateHero,Uhero);
	
}

//heroInformation(1870096555);

module.exports = {
	heroPlayed,
	heroInformation
}
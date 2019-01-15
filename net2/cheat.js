//作弊检查
'use strict';
const { query } = require('../sql/DBConfig');
var userSQL = require('../sql/Usersql');
var fs = require('fs')//文件操作



async function cheat(Account,arraySum){
	var CheatCount=0;
	//先对技能id进行排序
	function sortNumber(a,b){
		return a[1]-b[1];
	}
	//对技能id进行排序
	let newArray=arraySum.sort(sortNumber);
	for(var i=1;i<newArray.length();i++){
		if(newArray[i-1][[1]==newArray[i][1]]){
			//判断技能CD是否合法
			let SelectHeroSkillCDResult=await query(userSQL.SelectHeroSkillCD,newArray[i-1][1]);
			if(newArray[i][2]-newArray[i-1][2]<SelectHeroSkillCDResult){
				CheatCount++;
			}
			//判断技能伤害是否合法
			let SelectHeroSkillDamageResult=await query(userSQL.SelectHeroSkillDamage,newArray[i-1][1]);
			if(newArray[i][3]>SelectHeroSkillDamageResult||newArray[i-1][3]>SelectHeroSkillDamageResult){
				CheatCount++;
			}
		}
	}
	//把作弊次数记录进数据库
	var UC=[CheatCount,Account];
	let UpdateCheatResult=await query(userSQL.UpdateCheat,UC);
	return CheatCount;
}


/*async function cheat(Account,arraySum){
	var flag=0;//判断数据异常次数
	//查找出出战的三个英雄
	var RoleSkill=0;
	var skill2=0;
	var skill3=0;
	let SelectHeroResult=await query(userSQL.SelectHero,Account);
	//[英雄id，技能id，技能释放时间，技能伤害]
	for(let i=0;i<arraySum.length;i++){
		for (let j=0;j<4;j++){
			if(arraySum[i][0]==SelectHeroResult[0].hero1){
				SHS=[Account,SelectHeroResult[0].hero1];
				let SelectHeroSkillResult=await query(userSQL.SelectHeroSkill,SHS);
				if(arraySum[i][1]=SelectHeroSkillResult[0].skill1){
					//技能cd判断
					let cd=await query(userSQL.SelectHeroSkillCD,SelectHeroSkillResult[0].skill1);
					if(arraySum[i][3]-skill1<cd){
						flag++;
					}
					skill1=arraySum[i][3];
					技能伤害判断
					let damage=await query(userSQL.SelectHeroSkillDamage,SelectHeroSkillResult[0].skill1);
					if(arraySum[i][4])
				}
				else if(arraySum[i][1]=SelectHeroSkillResult[0].skill2){
					
				}
				else if(arraySum[i][1]=SelectHeroSkillResult[0].skill3){
					
				}
			}
			else if(arraySum[i][0]==SelectHeroResult[0].hero2){
				
			}
			else if(arraySum[i][0]==SelectHeroResult[0].hero3){
				
			}
		}
	}
}*/


module.exports = {
	cheat
}
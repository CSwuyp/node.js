//关卡星级，星级奖励，关卡信息（暂时不发）
'use strict';
const { query } = require('../sql/DBConfig');
var userSQL = require('../sql/Usersql');


async function levelStar(Account){
	let SelectLevelStarResult=await query(userSQL.SelectLevelStar,Account);
	console.log(SelectLevelStarResult);
	return SelectLevelStarResult;
}



//查询大关的星级，用于告诉客户端
async function selectLevelStarSum(Account,LevelId){
	//查询每一个大关所获得的星级
	//var temp=parseInt(LevelId);
	console.log('大关的id',LevelId);
	var SBL=[Account,LevelId];
	console.log(SBL);
	let SelectBigLevelStarResult=await query(userSQL.SelectBigLevelStar,SBL);
	console.log(SelectBigLevelStarResult);
	if(SelectBigLevelStarResult==''){
		return 0;
	}else{
		return SelectBigLevelStarResult[0].star;
	}
	//return SelectBigLevelStarResult[0].star;
	//查询每一个大关的星级奖励是否领取
}

//领取大关的星级奖励，并对数据库做更新


// socket.on('award_client',function(data){
	// var AwardWeaponStar6=[101,702,1002,1502];
	// var AwardWeaponStar9=[502,703,1003,1503];
	// var SelectMaxLevel='select max(level_id) from user_level where account='+Account;
	// var MaxLevel;
	// var LevelStar;
	// connection.query(SelectMaxLevel,function(err,result){
		// if(err){
			// console.log('[SelectMaxLevel err]-',err.message);
			// return;
		// }
		// MaxLevel=result[0].level_id;
	// });
	
	// for(var i=1;i<=MaxLevel;i++){
		// var LevelId=parseInt(i/3);//计算属于第几大关
		// var SelectStar='select star from user_level where account='+Account+'and level_id='+i;
		// connection.query(SelectStar,function(err,result){
			// if(err){
				// console.log('[SelectStar err]-',err.message);
				// return;
			// }
			// LevelStar+=result[0].star;
		// });
		// if(LevelStar>=6){
			// var SelectAward='select award_star6 from award_level where account='+Account+'and level_id='+LevelId;
			// connection.query(SelectAward,function(err,result){
				// if(err){
					// console.log('[SelectAward err]-'.err.message);
					// return;
				// }
				// //如果找不到对应信息即还未领取，此时把信息记录入数据库
				// if(result[0].award_star6==''){
					// var AddAwardStart6='insert into award_level(account,level_id,award_star6)values(?,?,?)';
					// var AStar6=[Account,LevelId,1];
					// connection.query(AddAwardStart6,AStar6,function(err,result){
						// if(err){
							// console.log('[AddAwardStart6 err]-',err.message);
							// return;
						// }
					// });
				// }
				// else if(result[0].award_star6==0){//玩家已经领取过了该奖励
					// socket.emit('award_server',{level:LevelId,flag:'6404'});
				// }
				// if(result[0].award_star6==''||result[0].award_star6==1){
					// socket.emit('award_server',{level:LevelId,flag:'6'});
				// }
			// });
		// }
		// if(LevelStar==9){
			// var SelectAward='select award_star9 from award_level where account='+Account+'and level_id='+LevelId;
			// connection.query(SelectAward,function(err,result){
				// if(err){
					// console.log('[SelectAward err]-',err.message);
					// return;
				// }
				// //如果找不到对应信息即还未领取，如果领取了客户端需要告诉服务端
				// if(result[0].award_star9==null){
					// var UpdateAwardStart9='update award_level set award_star9=? where account='+Account+'and level_id='+LevelId;
					// connection.query(UpdateAwardStart9,1,function(err,result){
						// if(err){
							// console.log('[AddAwardStart6 err]-',err.message);
							// return;
						// }
					// });
				// }
				// else if(result[0].award_star9==0){//玩家已经领取过了该奖励
					// socket.emit('award_server',{level:LevelId,flag:'9404'});
				// }
				// //玩家还未领取，通知玩家可以领取
				// if(result[0].award_star9==null||result[0].award_star9==1){
					// socket.emit('award_server',{level:LevelId,flag:'9'});
				// }
			// });
		// }
		// if(i%3==0){
			// LevelStar=0;
		// }
	// }
	// //客户端打开了哪些章节奖励要告诉服务端,告诉服务端打开的大关id和星级数目
	// var UpdateAwardStart6='update award_level set award_star6=?where account='+Account+'and level_id='+data.level;
	// var UpdateAwardStart9='update award_level set award_star9=?where account='+Account+'and level_id='+data.level;
	// var num;
	// if(data.flag=='6'){
		// connection.query(UpdateAwardStart6,0,function(err,result){
			// if(err){
				// console.log('[UpdateAwardStart6 err]-',err.message);
				// return;
			// }
		// });
		// //把章节奖励信息告诉客户端并存入数据库中
		// skocket.emit('award_server',{message:AwardWeaponStar6[data.level]});
		// var SelectGoods='select goods_count from bag where account='+Account+'goods_id='+AwardWeaponStar6[data.level];
		// var UpdateGoods='update bag set goods_count=goods_count+'+num+' where account='+Account+'and goods_id='+AwardWeaponStar6[data.level];
		// connection.query(SelectGoods,function(err,result){
			// if(err){
				// console.log('[SelectGoods5 err]-',err.message);
				// return;
			// }
			// if(result[0].goods_count>0){
				// num=1;
				// connection.query(UpdateGoods,function(err,result){
					// if(err){
						// console.log('[UpdateGoods]-',err.message);
						// return;
					// }
				// });
			// }
			// else{
				// num=1;
				// var addg=[Account,goods,num];
				// connection.query(AddGoods,addg,function(err,result){
					// if(err){
						// colsole.log('[AddGoods err]-',err.message);
						// return;
					// }
				// });
			// }
		// });
	// }
	// if(data.flag=='9'){
		// connection.query(UpdateAwardStart9,0,function(err,result){
			// if(err){
				// console.log('[UpdateAwardStart9 err]-',err.message);
				// return;
			// }
		// });
		// //把章节奖励信息告诉客户端并存入数据库中
		// skocket.emit('award_server',{message:AwardWeaponStar9[data.level]});
		// var SelectGoods='select goods_count from bag where account='+Account+'goods_id='+AwardWeaponStar9[data.level];
		// var UpdateGoods='update bag set goods_count=goods_count+'+num+' where account='+Account+'and goods_id='+AwardWeaponStar9[data.level];
		// connection.query(SelectGoods,function(err,result){
			// if(err){
				// console.log('[SelectGoods4 err]-',err.message);
				// return;
			// }
			// if(result[0].goods_count>0){
				// num=1;
				// connection.query(UpdateGoods,function(err,result){
					// if(err){
						// console.log('[UpdateGoods]-',err.message);
						// return;
					// }
				// });
			// }
			// else{
				// num=1;
				// var addg=[Account,goods,num];
				// connection.query(AddGoods,addg,function(err,result){
					// if(err){
						// colsole.log('[AddGoods err]-',err.message);
						// return;
					// }
				// });
			// }
		// });
	// }
//});



module.exports = {
	levelStar,
	selectLevelStarSum
}
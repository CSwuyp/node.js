//物品金币的消耗
'use strict';
const { query } = require('../sql/DBConfig');
var userSQL = require('../sql/Usersql');

//背包物品消耗
async function goodsConsume(Account,GoodsId,GoodsCount){
	let GoodsConsumeResult=await query(userSQL.GoodsConsume,[GoodsCount,Account,GoodsId]);
	
}
//金币消耗
async function coinConsum(Account,coin){
	let CoinConsumeResult=await query(userSQL.CoinConsume,[coin,Account]);
}



module.exports = {
	goodsConsume,
	coinConsum
}
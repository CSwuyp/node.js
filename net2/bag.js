//背包相关信息，暂时给客户端发送背包中有什么东西，
//背包的扩容，背包的等级，背包的各种属性等
'use strict';
const { query } = require('../sql/DBConfig');
var userSQL = require('../sql/Usersql');

async function bag(Account){
	let SelectGoodsResult=await query(SelectGoods,Account);
	return SelectGoodsResult;
}


module.exports = {
	bag
}
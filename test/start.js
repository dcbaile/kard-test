'use strict';
import transactions from './transactions.json';

const fs = require('fs');
const REFERRING_PARTNER_ACCOUNT_ID = "referringPartnerAccountId"

const KARD = "Kard"
const VERSION = "v1.0"
const STARTFEED = "STARTFEED"
const ENDFEED = "ENDFEED"


function getTransactionJsonObjectList(){
	let transactionJson = fs.readFileSync('test/transactions.json');
	return JSON.parse(transactionJson).data
}

function transactionListToPartnerAccountMap(transactionList){
	let transactionMap = new Map()

	for(let transaction of transactionList){
		let referringPartnerAccountId = transaction['referringPartnerAccountId'];
		transactionMap[referringPartnerAccountId] = transactionMap[referringPartnerAccountId] || transactionMap.set(referringPartnerAccountId, []);
		transactionMap.get(referringPartnerAccountId).push(transaction)
	}
	return transactionMap;
}

function calculateTotalLineNumber(transactionMap){
	let totalCount = 0
	totalCount += transactionMap.size
	for(let [accountNumber, transactions] of transactionMap){
		totalCount += transactions.length
	}
	return totalCount
}

//Please write your code below this line.
export default function() {

	let transactionList = getTransactionJsonObjectList();

	let transactionMap = transactionListToPartnerAccountMap(transactionList);
	console.log(`number of transactions in this: ${transactionList.length}`)
	console.log(calculateTotalLineNumber(transactionMap))
}

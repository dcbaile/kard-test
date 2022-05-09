//Please write your code below this line.
'use strict';

const fs = require('fs');
const REFERRING_PARTNER_ACCOUNT_ID = "referringPartnerAccountId"

const TRANSACTION_RESULTS_PATH = 'test/transactions_result.txt'
const TRANSACTIONS_JSON_PATH = 'test/transactions.json'


function getTransactionJsonObjectList() {
    let transactionJson = fs.readFileSync(TRANSACTIONS_JSON_PATH);
    return JSON.parse(transactionJson).data
}

function transactionListToPartnerAccountMap(transactionList) {
    let transactionMap = new Map()

    for (let transaction of transactionList) {
        let referringPartnerAccountId = transaction['referringPartnerAccountId'];
        transactionMap[referringPartnerAccountId] = transactionMap[referringPartnerAccountId] || transactionMap.set(referringPartnerAccountId, []);
        transactionMap.get(referringPartnerAccountId).push(transaction)
    }
    return transactionMap;
}

function lineNumberTotal(transactionMap) {
    let totalCount = 0
    totalCount += transactionMap.size
    for (let [accountNumber, transactions] of transactionMap) {
        totalCount += transactions.length
    }
    return totalCount
}

function settledCommissionSum(transactionList) {
    let settledCommissionSum = 0;
    for (let transaction of transactionList) {
        settledCommissionSum += (transaction.status === "SETTLED") ? transaction.commissionToUserInCents : 0
    }
    return settledCommissionSum;
}

function generateHeader(lineNumberTotal) {
    let currentTimeStamp = new Date()
    return `V1.0|STARTFEED|Kard|${currentTimeStamp.toISOString()}|${lineNumberTotal}\n`
}

function generateFooter(totalCommission, totalTransactionAmount){
    return `ENDFEED|${totalCommission}|${totalTransactionAmount}`
}

function generatePartnerAccountHeader(accountNumber, transactions) {
    return `|${accountNumber}||AG|||${settledCommissionSum(transactions)}||\n`
}

function generateTransactionLine(transaction) {
    let id = transaction._id;
    let referringPartnerAccountId = transaction.referringPartnerAccountId;
    let offerId = transaction.offerId;
    let status = transaction.status;
    let transactionDate = transaction.transactionDate;
    let merchantName = transaction.merchantName;
    let commissionToUserInCents = transaction.commissionToUserInCents;
    let transactionAmountInCents = transaction.transactionAmountInCents;
    let source = transaction.source

    return `${id}|${referringPartnerAccountId}|${offerId}|${status}|${transactionDate}|${merchantName}|${commissionToUserInCents}|${transactionAmountInCents}|${source}`
}


function processTransactionsToTxtFile(transactionMap) {
    let [totalUserCommissionSum, totalTransactionAmountInCents] = [0,0];
    let lineIndex = 1

    fs.writeFileSync(TRANSACTION_RESULTS_PATH, generateHeader(lineNumberTotal(transactionMap)), (error) => {
        if (error) {
            console.log('something bad happened')
        }
    })

    for (let [accountNumber, transactions] of transactionMap) {
        let accountHeader = generatePartnerAccountHeader(accountNumber, transactions)
        fs.appendFileSync(TRANSACTION_RESULTS_PATH, `${lineIndex++}|${accountHeader}`, (error) => {
            if (error) {
                console.log('file Write failed')
            }
        })

        for (let transaction of transactions) {
            totalUserCommissionSum += transaction.commissionToUserInCents
            totalTransactionAmountInCents += transaction.transactionAmountInCents
            fs.appendFileSync(TRANSACTION_RESULTS_PATH, `${lineIndex++}|${generateTransactionLine(transaction)}\n`)
        }
    }
    fs.appendFileSync(TRANSACTION_RESULTS_PATH, generateFooter(totalUserCommissionSum, totalTransactionAmountInCents),(error) => {
        if (error) {
            console.log('something bad happened')
        }
    })
}

export default function () {

    let transactionList = getTransactionJsonObjectList();

    let transactionMap = transactionListToPartnerAccountMap(transactionList);
    /*
        for(let[accountNumber, transactions] of transactionMap){
        }*/
    processTransactionsToTxtFile(transactionMap)
}

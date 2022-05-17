//Please write your code below this line.
'use strict';

const fsPromises = require('fs/promises');
require('regenerator-runtime')

const REFERRING_PARTNER_ACCOUNT_ID = "referringPartnerAccountId"
const TRANSACTION_RESULTS_PATH = 'test/transactions_result.txt'
const TRANSACTIONS_JSON_PATH = 'test/transactions.json'

let lineIndex = 1;

const getTransactionList = async () => {
    let buffer = await fsPromises.readFile(TRANSACTIONS_JSON_PATH)
    return JSON.parse(buffer).data
}

function transactionListToPartnerAccountMap(transactionList) {
    let transactionMap = new Map()

    for (let transaction of transactionList) {
        let referringPartnerAccountId = transaction[REFERRING_PARTNER_ACCOUNT_ID];
        transactionMap[referringPartnerAccountId] = transactionMap[referringPartnerAccountId] || transactionMap.set(referringPartnerAccountId, []);
        transactionMap.get(referringPartnerAccountId).push(transaction)
    }
    return transactionMap;
}

function lineNumberTotal(transactionMap) {
    let totalCount = 0
    totalCount += transactionMap.size
    transactionMap.forEach((transactions) => {
        totalCount += transactions.length
    })
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

function generateFooter(totalCommission, totalTransactionAmount) {
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


async function processTransactionsToTxtFile(transactionMap) {
    let [totalUserCommissionSum, totalTransactionAmountInCents] = [0, 0];

    await fsPromises.writeFile(TRANSACTION_RESULTS_PATH, generateHeader(lineNumberTotal(transactionMap)))

    for (let [accountNumber, transactions] of transactionMap) {
        let accountHeader = generatePartnerAccountHeader(accountNumber, transactions)
        await fsPromises.appendFile(TRANSACTION_RESULTS_PATH, `${lineIndex++}|${accountHeader}`)

        for (let transaction of transactions) {
            totalUserCommissionSum += transaction.commissionToUserInCents
            totalTransactionAmountInCents += transaction.transactionAmountInCents
            await fsPromises.appendFile(TRANSACTION_RESULTS_PATH, `${lineIndex++}|${generateTransactionLine(transaction)}\n`)
        }
    }
    await fsPromises.appendFile(TRANSACTION_RESULTS_PATH, generateFooter(totalUserCommissionSum, totalTransactionAmountInCents))
}


export default function () {
    let transactionMap;
    getTransactionList().then((transactionList) => {
        transactionMap = transactionListToPartnerAccountMap(transactionList);

        processTransactionsToTxtFile(transactionMap).then(() => {
            console.log("Transactions successfully parsed")
        })
    });
}

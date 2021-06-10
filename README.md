# kard-interview

## Overview

Before starting you are expected to **Fork** this repository to your own local repo. All work should be done in your repo and when complete should be submitted via Pull Request.

The boilerplate is built on the following:

    - Node 10.x.x

**To run the project run the following:**   

`npm start`

**Your task is to create a text file from a transaction JSON file (provided), parse the data and write the file (JSON) format into the output folder.**  

  All fields should contain values with pipe delimited format.
  
**Header should contain the following:**  
  
    V1.0|STARTFEED|Kard|[timestamp of when the file was generated in ISO format]|[# of total lines in this text file excluding the header and the footer]
  
**Main content should contain the following:**  

    1||[referringPartnerAccountId]||AGG|||[sum of the commissionToUserInCents with SETTLED status only]||  
    2|[_id]|[referringPartnerAccountId]|[offerId]|[status]|[transactionDate]|[merchantName]|[commissionToUserInCents]|[transactionAmountInCents]|[source]

- First row should always be the aggregate sum of the total commission issued to a specific user. *Please take into account for negative value as well
- Rest should display itemized transactions for a specific user.

**Footer should contain the following:**  
  
    ENDFEED|[total sum of commissionToUserInCents]|[total sum of the transactionAmountInCents]


**Expected Output:**  

    V1.0|STARTFEED|Kard|2021-06-10T17:18:21.959Z|24
    1||22222333333||AG|||610||
    2|5d3f58ddbb30563b59e906ba|22222333333|12312GFSDS|PENDING|2019-07-28T10:00:00.052Z|inkjets.com|211|4385|WEB
    3|5d3f5ggsdew1259e906ba|22222333333|12312GFSDS|SETTLED|2019-07-28T10:00:00.052Z|biking.com|311|6399|WEB
    4|iojadosfij12312312sdfa|22222333333|12312GFSDS|SETTLED|2019-07-28T10:00:00.052Z|biking.com|125|2000|WEB
    5|iojadosfij12312312sdfa|22222333333|12312GFSDS|SETTLED|2019-07-28T10:00:00.052Z|biking.com|-36|-456|WEB
    6|wethohdfgdfg123123sdgfsdfg|22222333333|drgjeroitj43453534|PENDING|2019-07-28T10:00:00.052Z|bestbuy.com|45|1223|WEB
    7|5d3f58xxyy30563b59e906ba|22222333333|12312GFSDS|SETTLED|2019-07-28T10:00:00.052Z|inkjets.com|210|1299|WEB
    8||123123123123||AG|||0||
    9|cd3f58ddbb30563b59e106ed|123123123123|GFSDS123123123|SETTLED|2019-07-28T10:00:00.052Z|flowers.com|121|2385|WEB
    10|ghd3f58ddbb30563b59e106ed|123123123123|GFSDS123123123|SETTLED|2019-07-28T10:00:00.052Z|flowers.com|-121|-2385|WEB
    11||AASDF21312312||AG|||91||
    12|cd3f58ddbb30563b59e106ed|AASDF21312312|GFSDS123123123|SETTLED|2019-07-28T10:00:00.052Z|Postcards.com|121|2385|WEB
    13|cd3f58ddbb30563b59e106ed|AASDF21312312|drgjeroitj43453534|PENDING|2019-07-28T10:00:00.052Z|bestbuy.com|460|2385|WEB
    14|cd3f58ddbb30563b59e106ed|AASDF21312312|drgjeroitj43453534|SETTLED|2019-07-28T10:00:00.052Z|bestbuy.com|-30|-900|WEB
    15||PASDF12312SDFSD||AG|||118||
    16|Ad3fasdfasd123sadaasdf|PASDF12312SDFSD|jhowe12312|SETTLED|2019-07-28T10:00:00.052Z|fakemerchant.com|-2|-15|WEB
    17|asdfadsfjhkh12312312asdf|PASDF12312SDFSD|poigsiuhwe512sdf|SETTLED|2019-07-28T10:00:00.052Z|fakemerchant.com|120|1100|WEB
    18|PADSFadsfklj2312312|PASDF12312SDFSD|gjkhgs354345sdfs|PENDING|2019-07-28T10:00:00.052Z|fakemerchant.com|-32|-190|WEB
    19|kjasdhfkjhadsf123123|PASDF12312SDFSD|123adsfaf123sdfsd|PENDING|2019-07-28T10:00:00.052Z|fakemerchant.com|34|998|WEB
    20||ADSWETDFFGTUHK||AG|||161||
    21|jshfgksdjfgp235345345|ADSWETDFFGTUHK|ertoiuodfg134234|SETTLED|2019-07-28T10:00:00.052Z|fakemerchant.com|12|100|WEB
    22|ewrhcoiasdjknaweo124234|ADSWETDFFGTUHK|ertoiuodfg134234|SETTLED|2019-07-28T10:00:00.052Z|fakemerchant.com|120|2000|WEB
    23|35437812sdfgakjdhas3|ADSWETDFFGTUHK|ertoiuodfg134234|SETTLED|2019-07-28T10:00:00.052Z|fakemerchant.com|29|-349|WEB
    24|kjakdsf2353453453adkjho|ADSWETDFFGTUHK|ertoiuodfg134234|PENDING|2019-07-28T10:00:00.052Z|fakemerchant.com|29|-349|WEB
    ENDFEED|1727|22015

## BONUS  
If you were able to finish the task within given time, feel free to refactor your code in a more readable manner.

## FAQ

**Can I use external libraries?** - Absolutely.  Do so thoughtfully and where necessary.

**Can I leave comments in code?** - Leaving comments to express your logic or your thoughts is great!.

**I couldn't complete everything in the alotted time, what do I do?** - Submit what you can. We don't expect a flawless system given the time constraints, we expect to see how you think.
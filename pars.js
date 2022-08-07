const cheerio = require('cheerio');
const fs = require('fs')
const path = require('path')
const glob = require('glob');
const moment = require('moment')
const snapshots = glob.sync("./One_Piece_Snapshots/*")

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'one_piece_stats.csv',
    header: [
        {id: 'score', title: 'Score'},
        {id: 'scoredby', title: 'Scored by'},
        {id: 'popularity', title: 'Popularity Rank'},
        {id: 'rank', title: 'Rating Rank'},
        {id: 'members', title: 'Members'},
        {id: 'date', title: 'Date'},

    ]
});

const records = []

for(const filePath of snapshots){
    console.log(filePath)
    const $ = cheerio.load(fs.readFileSync(filePath,'utf8'));
    const score = $('span[itemprop=ratingValue]').text()
    const scoredby = $('span[itemprop=ratingCount]').text()

    const descs = $('div').text().split(/\s+/)
    const popularity = descs[descs.indexOf("Popularity:")+1].substring(1)
    const rank = descs[descs.indexOf("Ranked:")+1].substring(1)
    const members = descs[descs.indexOf("Members:")+1]

    const date = moment(path.basename(filePath).split('.')[0], "YYYYMMDDhhmmss").toDate()  
    console.log(score, scoredby, popularity, rank, members)

    records.push({
        score, scoredby, popularity, rank, members, date
    })
    // break
}

csvWriter.writeRecords(records)       // returns a promise
.then(() => {
    console.log('Done writing csv');
})

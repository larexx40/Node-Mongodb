const { MongoClient, Collection } = require("mongodb")
const assert = require('assert')
const dbOperation = require('./operations')

const url = 'mongodb://127.0.0.1:27017'
const dbname = 'confusion'

MongoClient.connect(url).then((client)=>{
    console.log("Connect to the server correctly");

    const db = client.db(dbname);

    dbOperation.insertDocument(db, {name: "Egusi riro", description: "Delicious melon soup"}, 'dishes')
        .then((result)=>{
            console.log("insert document: \n ", result);

            return dbOperation.findDocuments(db, 'dishes')
        })
        .then((docs)=>{
            console.log('Found Documents: \n',docs );

            return dbOperation.updateDocument(db, {name: 'Egusi riro'}, {description: "updated Details of Egusi riro"}, 'dishes')
        })
        .then((result)=>{
            console.log('Updated document printout: \n', result);

            return dbOperation.findDocuments(db, 'dishes')
        })
        .then((docs)=>{
            console.log('Found Updated Document: \n', docs);

            return db.dropCollection('dishes');
        })
        .then((result)=>{
            console.log("Dropped Collection:", result);

            return client.close()
        })
        .catch((err)=>{
            console.log(err);
        })
})
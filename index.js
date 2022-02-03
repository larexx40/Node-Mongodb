const { MongoClient } = require("mongodb")
const assert = require('assert')
const dbOperation = require('./operations')

const url = 'mongodb://127.0.0.1:27017'
const dbname = 'confusion'

MongoClient.connect(url).then((client)=>{
    console.log('connected to server correctly')
    const db = client.db(dbname)
    const collection = db.collection('dishes');

    const insert = collection.insertOne({"name":"Ewa4", "description": "beans, my best food"}, (err,result)=>{
        assert.equal(err, null)
        console.log('After Insert:\n')
        console.log(result);

        collection.find({}).toArray((err, docs)=>{
            assert.equal(err, null);
            console.log('found:\n')
            console.log(docs)

            db.dropCollection('dishes', (err, result)=>{
                assert.equal(err, null)
                client.close()
            })
            
        })
    })

})
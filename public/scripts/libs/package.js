var DB_address = 'mongodb://localhost:27017';
var mongodb = require('mongodb');

function mongodbs(collectName, cb) {

    mongodb.MongoClient.connect(DB_address, { useNewUrlParser: true }, function(err, con) {
        if (err) {
            return typeof cb == 'function' && cb(err)
        }
        var db = con.db('text');
        var collection = db.collection(collectName)
        typeof cb == 'function' && cb(null, collection)
            //console.log(db)
    })
}
module.exports = mongodbs;
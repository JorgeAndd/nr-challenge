var mongo = require('mongodb').MongoClient,
    config = require('../config/config.js');

var db;

module.exports = {    
    connect: function(callback) {
        var url = config.mongoUrl + config.mongoDatabase;

        mongo.connect(url, function(err, database) {
            db = database;
            
            if (err !== null) {
                console.log(err.name + ': ' + err.message);
            }
            else {
                console.log('Connected to mongo database');
                callback();
            } 
        });
    },

    storePregao: function(pregao) {
        var collection = db.collection(config.mongoCollection);

        collection.insertOne(pregao, function(err, r) {
            if (err !== null) {
                console.log(err.name + ': ' + err.message);
            }
        });
    },

    storeAttachment: function(id, attachment) {
        var collection = db.collection(config.mongoCollection);

        collection.updateOne({id: id}, {$push: { documentos: attachment}}, function(err, r) {
            if (err !== null) {
                console.log(err.name + ': ' + err.message);
            }              
        });
    }
}

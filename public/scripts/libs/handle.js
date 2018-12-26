//增删改查
var getCollection = require('./package.js');
var mongodb = require('mongodb');
//增
exports.insert = function(collection, content, cb) {
    var fn = Array.isArray(content) ? 'insertMany' : 'insertOne';
    collection[fn](content, function(err, result) {
        if (err) {
            return typeof cb == 'function' && cb(err)
        }
        typeof cb == 'function' && cb(null, result)
    })
}


//删除
exports.delete = function(collection, condition, cb) {
        collection.deleteMany(condition, function(err, result) {
            if (err) {
                return typeof cb == 'function' && cb(err)
            }
            typeof cb == 'function' && cb(null, result)
        })
    }
    //修改
exports.update = function(collection, condition, newdata, cb) {
        collection.updateMany(condition, { $set: newdata }, function(err, result) {
            if (err) {
                return typeof cb == 'function' && cb(err)
            }
            typeof cb == 'function' && cb(null, result)
        })
    }
    //查
exports.find = function(collection, condition, cb) {
    if (typeof condition === "function") {
        cb = condition;
        condition = {}
    }
    collection.find(condition).toArray(function(err, result) {
        if (err) {
            return typeof cb == 'function' && cb(err)
        }
        typeof cb == 'function' && cb(null, result)
    })

}
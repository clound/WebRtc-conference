var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');

var util = require('util');


for (var m in models) {
    console.log("m in models:" + m);
    mongoose.model(m, new Schema(models[m]));
};

/*****  注册用户   ***/
var _addUser = function (userInfo) {
    var userModel = _getModel("user");
    var newUser = new userModel({
        name: userInfo.uname,
        password: userInfo.upwd,
        state: false
    });
    newUser.save();
    console.log("_addUser over");
    return _findUser(userInfo.uname) ? true : false;
}

/******  返回Schema   ***/
var _getModel = function (type) {
    return mongoose.model(type);
};

/*******   检测用户是否存在 ****/
var _findUser = function (userName) {
    var userModel = _getModel("user");
    userModel.findOne({'name': userName}, 'name', function (err, doc) {
        if (err) {
            return false;
        }
        if (!doc) {
            console.log("_findUser : no user");
            return false;
        } else return true;
    });
    console.log("_findUser over");
};


module.exports = {
    getModel: function (type) {
        return _getModel(type);
    },
    addUser: function (userInfo) {
        return _addUser(userInfo);
    }
};

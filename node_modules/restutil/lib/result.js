var resultmsg = require("./resultmsg.js");

module.exports.GET = function(outcod, content, exception){
    var out = {
        Return: outcod,
        Content: content,
        Exception: exception
    }
    return out;
}
module.exports.OK = function(content){
    var out = {
        Return: 0,
        Content: content,
        Exception: ""
    }
    return out;
}
module.exports.ERROR = function(error){
    var out = {
        Return: error,
        Content: "",
        Exception: resultmsg.getMessage(error)
    }
    return out;
}
module.exports.SYSERROR = function(exception){
    var out = {
        Return: 1,
        Content: "",
        Exception: exception
    }
    return out;
}
module.exports.VALIDERROR = function(errors){
    var out = {
        Return: 2,
        Content: "",
        Exception: errors
    }
    return out;
}


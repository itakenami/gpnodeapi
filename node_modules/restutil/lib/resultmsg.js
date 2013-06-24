var info = require("./../../../resultmsg.json");

var ERROR_MESSAGE = [];

ERROR_MESSAGE[0] = "Requisição Realizada com Sucesso";
ERROR_MESSAGE[1] = "Exceção de Sistema";
ERROR_MESSAGE[2] = "Exceção de Validação";

info.messages.forEach(function(item){
    ERROR_MESSAGE.push(item.message);
});

return ERROR_MESSAGE;

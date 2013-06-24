var controller = require('restutil');

module.exports = function(app) {
    var AnalistasController = controller(app.models.analista,'analista')
    return AnalistasController;
};
var controller = require('restutil');

module.exports = function(app) {
    var CargosController = controller(app.models.cargo,'cargo')
    return CargosController;
};
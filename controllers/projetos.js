var controller = require('restutil');

module.exports = function(app) {
    var ProjetosController = controller(app.models.projeto,'projeto')
    return ProjetosController;
};
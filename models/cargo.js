var	genericmodel = require('genericmodel');

module.exports = function(app) {
    return genericmodel().crud(app.get('pool'),'cargos');
}
module.exports = function(app) {

    var cargos = app.controllers.cargos;

    app.get('/cargos', cargos.index);
    app.post('/cargos', cargos.save);
    app.get('/cargos/:id', cargos.view);
    app.put('/cargos/:id', cargos.update);
    app.del('/cargos/:id', cargos.delete);

    var analistas = app.controllers.analistas;

    app.get('/analistas', analistas.index);
    app.post('/analistas', analistas.save);
    app.get('/analistas/:id', analistas.view);
    app.put('/analistas/:id', analistas.update);
    app.del('/analistas/:id', analistas.delete);

    var projetos = app.controllers.projetos;

    app.get('/projetos', projetos.index);
    app.post('/projetos', projetos.save);
    app.get('/projetos/:id', projetos.view);
    app.put('/projetos/:id', projetos.update);
    app.del('/projetos/:id', projetos.delete);

};
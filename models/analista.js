var	genericmodel = require('genericmodel');

module.exports = function(app) {

    var Model = genericmodel().crud(app.get('pool'),'analistas');

    Model.findAll = function(func){
        Model.executeQuery('SELECT a.*,c.nome as cargo FROM analistas as a JOIN cargos as c ON a.cargo_id = c.id', function(result, err){
            if(err){
                func(null,err);
                return
            }
            var analistas = [];
            result.forEach(function(item){
                var a ={
                    id:item.id,
                    nome: item.nome,
                    especialidade: item.especialidade,
                    cargo: {
                        nome: item.cargo
                    }
                }
                analistas.push(a);
            });
            func(analistas);

        });
    }

    Model.findById = function(id, func){
        Model.executeQuery('SELECT a.*,c.nome as cargo FROM analistas as a JOIN cargos as c ON a.cargo_id = c.id WHERE a.id='+id, function(result, err){

            if(err){
                func(null,err);
                return
            }

            var item = result[0];
            var analista = [{
                id:item.id,
                nome: item.nome,
                especialidade: item.especialidade,
                cargo: {
                    nome: item.cargo
                }
            }];
            func(analista);

        });
    }

    return Model;

}
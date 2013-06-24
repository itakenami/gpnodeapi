var	genericmodel = require('genericmodel');
var dateFormat = require('dateformat');

module.exports = function(app) {

    var Model = genericmodel().crud(app.get('pool'),'projetos');

    Model.findAll = function(func){
        Model.executeQuery('SELECT * FROM projetos', function(result, err){

            if(err){
                func(null,err);
                return
            }

            var projetos = [];
            result.forEach(function(item){
                item.data_inicio = dateFormat(item.data_inicio, "mmm dd, yyyy h:MM:ss TT");
                item.data_fim = dateFormat(item.data_fim, "mmm dd, yyyy h:MM:ss TT");
                projetos.push(item);
            });
            func(projetos);

        });
    }

    Model.findById = function(id, func){

        Model.executeQuery('SELECT * FROM projetos WHERE id='+id, function(result, err){

            if(err){
                func(null,err);
                return
            }

            var item = result[0];

            var projeto = {
                id: item.id,
                nome: item.nome,
                descricao: item.descricao,
                data_inicio: dateFormat(item.data_inicio, "mmm dd, yyyy h:MM:ss TT"),
                data_fim: dateFormat(item.data_fim, "mmm dd, yyyy h:MM:ss TT")
            }

            Model.executeQuery('SELECT a.id,a.nome,a.especialidade FROM analistas_projetos AS ap JOIN analistas AS a ON ap.analista_id = a.id WHERE ap.projeto_id='+item.id, function(analistas, err){

                if(err){
                    func(null,err);
                    return
                }

                projeto.analistas = [];
                analistas.forEach(function(item){
                    projeto.analistas.push(item);
                });
                func([projeto]);
            });

        });
    }

    Model.insert = function(param, func){

        var di = param.data_inicio.split("/");
        var df = param.data_fim.split("/");

        var projeto = {
            nome: param.nome,
            descricao: param.descricao,
            data_inicio: dateFormat(new Date(di[2],di[1],di[0]), "yyyy-mm-dd"),
            data_fim: dateFormat(new Date(df[2],df[1],df[0]), "yyyy-mm-dd")
        }

        Model.execute('INSERT INTO projetos SET ?', projeto, function(result, err){

            if(err){
                func(null,err);
                return
            }

            param.analista_id.forEach(function(item){
                var ap = {
                    analista_id: item,
                    projeto_id: result.insertId
                }
                Model.execute('INSERT INTO analistas_projetos SET ?', ap);
            });
            func(result);

        });
    }

    Model.update = function(param, func){

        var di = param.data_inicio.split("/");
        var df = param.data_fim.split("/");

        var projeto = {
            nome: param.nome,
            descricao: param.descricao,
            data_inicio: dateFormat(new Date(di[2],di[1],di[0]), "yyyy-mm-dd"),
            data_fim: dateFormat(new Date(df[2],df[1],df[0]), "yyyy-mm-dd")
        }

        Model.execute('UPDATE projetos SET ? WHERE id='+param.id, projeto, function(result, err){

            if(err){
                func(null, err);
            }

            Model.executeQuery('DELETE FROM analistas_projetos WHERE projeto_id = '+param.id, function(result, err){

                if(err){
                    func(null,err);
                    return
                }

                param.analista_id.forEach(function(item){
                    var ap = {
                        analista_id: item,
                        projeto_id: param.id
                    }
                    Model.execute('INSERT INTO analistas_projetos SET ?', ap, function(result, err){
                        if(err){
                            func(null,err);
                            return
                        }
                    });
                });

                func(result);
            });

        });
    }

    Model.delete = function(id, func){
        Model.executeQuery('DELETE FROM analistas_projetos WHERE projeto_id='+id, function(result, err){
            if(err){
                func(null,err);
                return
            }
            Model.executeQuery('DELETE FROM projetos WHERE id='+id, function(result, err){
                if(err){
                    func(null,err);
                    return
                }
                func(result);
            });
        });
    }

    return Model;

}
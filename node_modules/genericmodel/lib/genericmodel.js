var mysql = require('mysql');

//Metodos Provados
var executeQuery = function(pool, query, func){
    pool.getConnection(function(err, connection) {
        if(err){
            func(null, err);
        }else{
            connection.query(query, function(err, result) {
                connection.end();
                if(func){
                    func(result, err);
                }
            });
        }
    });
}

var execute = function(pool, query, param, func){
    pool.getConnection(function(err, connection) {
        if(err){
            func(null, err);
        }else{
            connection.query(query, param, function(err, result) {
                connection.end();
                if(func){
                    func(result, err);
                }
            });
        }
    });
}

//Classe principal
var GenericModel = function() {
	
  	var model = {
		
		query: function(pool){
			var funcs = {
				executeQuery: function(sql, func){
                    executeQuery(pool, sql, func);
				},
                execute: function(sql, param, func){
                    execute(pool, sql, param, func);
                }
			}
			return funcs;
		},
		
		crud: function(pool,table){
			
			var crud = {
				findAll: function(func){
                    executeQuery(pool,'SELECT * FROM '+table,func);
				},
				findById: function(id, func){
                    executeQuery(pool,'SELECT * FROM '+table+' WHERE id='+id,func);
				},
				insert: function(param, func){
                    execute(pool,'INSERT INTO '+table+' SET ?', param, func);
				},
				update: function(param,func){
                    execute(pool, 'UPDATE '+table+' SET ? WHERE id='+param.id, param, func);
				},
				delete: function(id,func){
                    executeQuery(pool, 'DELETE FROM '+table+' WHERE id='+id, func);
				},
                executeQuery: function(sql, func){
                    executeQuery(pool, sql, func);
                },
                execute: function(sql, param, func){
                    execute(pool, sql, param, func);
                }
			}

			return crud;
		}
		
	}
	
	return model;
}

//Metodos publicos
module.exports = function() {
	return new GenericModel();
}

module.exports.getPool = function(props) {
	return mysql.createPool(props);
}
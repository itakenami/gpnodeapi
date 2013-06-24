{
  "name": "teste",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "private-repo": "git+ssh://git@github.com:itakenami/genericmodel.git"
  }
}


var genericmodel = require('genericmodel');

var pool = genericmodel.getPool({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'demo'
});

var dao = genericmodel().crud(pool,'contatos');

dao.findAll(function(contatos){
	contatos.forEach(function(item){
		console.log(item);
	});
});




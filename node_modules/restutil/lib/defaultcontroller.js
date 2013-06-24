var Result = require("./result.js");

var DefaultController = function(model, domain) {

    var controller = {

        index: function(req, res) {
            model.findAll(function(rows, err){
                if(err){
                    res.json(Result.SYSERROR(err));
                }else{
                    res.json(Result.OK(rows));
                }
            });
        },

        save: function(req, res) {
            var row = eval('req.body.'+domain);

            model.insert(row, function(result, err){
                if(err){
                    res.json(Result.SYSERROR(err));
                }else{
                    res.json(Result.OK(result));
                }
            });

        },

        view: function(req, res) {

            model.findById(req.params.id,function(row, err){
                if(err){
                    res.json(Result.SYSERROR(err));
                }else{
                    res.json(Result.OK(row[0]));
                }
            });

        },

        update: function(req, res) {
            var form = eval('req.body.'+domain);
            form.id=req.params.id;
            model.update(form,function(result, err){
                if(err){
                    res.json(Result.SYSERROR(err));
                }else{
                    res.json(Result.OK(result));
                }
            });
        },

        delete: function(req, res) {
            model.delete(req.params.id,function(result, err){
                if(err){
                    res.json(Result.SYSERROR(err));
                }else{
                    res.json(Result.OK(result));
                }
            });
        }

    }

    return controller;
};

module.exports = function(model,domain) {
    return new DefaultController(model,domain);
}
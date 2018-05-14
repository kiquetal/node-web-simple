module.exports = app => {
        const Tasks = app.db.models.Tasks;


        app.route("/tasks")
              .get((req,res)=>{
                Tasks.findAll({}).
                then( (results)=>{
                   res.json(results);
                    })
                .catch(error => {
                    res.status(412).json({msg:error});
                    });
            })
            .post((req,res)=>{

                Tasks.create(req.body)
                    .then(results=> res.json(results))
                    .catch(error=>{
                        res.status(412).json({message:error})
                    });
            });



        app.route("/tasks/:id")
            .get( (req,res)=>{
                Tasks.findOne({where:req.params})
                    .then( results=>{
                     if (results)
                         res.json(results);
                     else {
                         res.status(404);
                         res.json({message:"Could not be found"});
                     }
                    })
                    .catch(error =>
                    res.status(412).json({message:error}));
            })
            .put((req,res)=>{
                Tasks.update(req.body,{where:req.params})
                    .then(results=> res.sendStatus(204))
                    .catch(error => res.status(412).json({message:error}));
            })
            .delete((req,res)=>{
                Tasks.destroy({where:req.params})
                    .then(result=> res.sendStatus(204))
                    .catch(error => res.status(412).json({message:error}));
                });

       };

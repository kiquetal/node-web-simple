   module.exports = app => {

         app.db.sequelize.sync().done( () => {
         app.listen(app.get("port"), () => {
               console.log(`NTask API             - Port ${app.get("port")}`);
             });
         app.use((req,res,next)=>{

            res.status(404).json({message:"not found url"});
         });
         app.use( function (e,req, res, next) {
             console.log("using this" + e);
             switch (e.statusCode)
             {
                 case 400:
                     res.status(400).send({message:"Bad request"});
                     break;
                 case 404:
                     res.status(404).send({message:"Not found"});
                     break;
                 default:
                     res.status(500).send({message:"Server Error"});
                     break;
             }

         });
   });
};
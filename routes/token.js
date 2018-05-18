import jwt from "jwt-simple";

   module.exports = app => {
         const cfg = app.libs.config;
         const Users = app.db.models.Users;
         app.post("/token", (req, res) => {
               if (req.body.email && req.body.password) {
                     const email = req.body.email;
                     const password = req.body.password;
                     console.log(email);
                     console.log(password);
                     Users.findOne({where: {email: email}})
                       .then(user => {
                            console.log("found: " + user.getDataValue("password"));
                             if (Users.options.classMethods.isPassword(user.password, password)) {
                                   const payload = {id: user.id};
                                   res.json({
                                         token: jwt.encode(payload, cfg.jwtSecret)
                                   });
                                 } else {
                                   console.log("error aqui");
                                   res.sendStatus(401);
                                 }
                           })
                       .catch(error => {
                            console.log("error aqui catch");
                           res.sendStatus(401)
                       });
                   } else {
                     res.sendStatus(401);
                   }
             });
       };
import passport from 'passport';
import {Strategy,ExtractJwt} from 'passport-jwt';

module.exports=app => {
  const Users=app.db.models.Users;
  const cfg= app.libs.config;
  const params={
      secretOrKey:cfg.jwtSecret,
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
  };
  const strategy=new Strategy(params,(payload,done)=>{
      Users.findById(payload.id)
          .then(user=>{
              if(user){
                  console.log("strategy ");
                  return done(null,{id:user.id,email:user.email});
              }
              else {
                  console.log("not found");
              }
              return done(null,false);
          })
          .catch(error => {
              console.log("error "+error);
              done(error, null);

          })
  });
  passport.use(strategy);
  return {
      initialize: () => {
          return passport.initialize();
      },
      authenticate: (req,res,next) => {
          //     return passport.authenticate("jwt",cfg.jwtSession),function(req,res){console.log(req.user.id);res.json({"algo":"ok"});}

          passport.authenticate('jwt', {session: false}, function(err, user, info) {
              if (err) console.log("que paso");// next(err);
              if (user)
              next();
              else
                  res.status(403).json({"message":"no authorizado"});
          })(req, res, next);
      }
  }

};
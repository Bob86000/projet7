const db = require("../models");
const User = db.users;

// add contraint on resquest same origin userID

exports.SavedUser = (req, res, next) => {
     User.findOne(({ where: { id: req.body.userId} }))
     .then((data) => {
         if( data !== null) {
     next();}
     else {
         return res.status(401).json({
            error: "utilisateur non trouvé"
        })
    }})
    .catch( () => {
     return res.status(401).json({
        error: "utilisateur non trouvé"
    })
})
}
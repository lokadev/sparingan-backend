const Match = require("../model/Match");
const User = require("../model/User");
const Sport = require("../model/Sport");

exports.read = (req,res) => {
  Match.find().then(Match => {
      res.status(200).json(Match)
  })
  .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured",
      }); 
    });
}

exports.create = (req,res) => {
  try{
      Match.find({id_user:req.body.id_user}).then(user => {
          const dataMatch = new Match({
            id_user: req.body.id_user,
            id_sport: req.body.id_sport,
            match_player: req.body.match_player,
            match_description: req.body.match_description,
            match_location_lat: req.body.match_location_lat,
            match_location_lang: req.body.match_location_lang,
            match_location_city: req.body.match_location_city,
            match_location_district: req.body.match_location_district,
            match_location_address: req.body.match_location_address,
            match_date: req.body.match_date,
            match_cost: req.body.match_cost,
          });
 
          dataMatch.save().then(data => {
            const success = {
              data,
              meta: {
                message: "Successfully to make Match"
              }
            }
            res.json(success)
          }).catch((err) => {
            res.status(500).send({
              message: "Failed to registred or Please fill out all the forms",
              technical_error: err,
            });
          });
      })
  }catch(err){
      console.log({message: err});
  }
}

exports.find = (req,res) => {
  try{
    Match.findById(req.params.id)
    .then(match => {
        if (!match) {
            return res.status(404).send({
              message: "Match not found with id " + req.params.id,
            });
          }
          User.findById(match.id_user).then(user => {
            Sport.findById(match.id_sport).then(sport => {
              const success = {
                match,
                user,
                sport
              }
              res.status(200).send(success);
            })
          })
    })
  }catch(err) {
      return res.status(500).send({
          message: "Error retrieving Match with id " + req.params.id,
        });
  }
}

exports.update = (req,res) => {
  Match.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((match) => {
    if (!match) {
      return res.status(404).send({
        message: "no match found",
      });
    }
    const success = {
      match,
      meta:{
        message: "Successfully update"
      }
    }
    res.status(200).send(success);
  })
  .catch((err) => {
    return res.status(404).send({
      message: "error while updating the post",
    });
  });
}

exports.delete = (req, res) => {
  try{
    Match.findByIdAndRemove(req.params.id)
    .then(match => {
        if (!match){
            return res.status(404).send({
                message: "match not found ",
              });
        }
        res.send({ message: "match deleted successfully!" });
    })
  }catch(err) {
    return res.status(500).send({
        message: "Cannot delete match",
      });
  }
}

exports.FindMatchViaCity = (req,res) => {
  Match.find({match_location_city: {'$regex': req.body.city ,$options:'i'}}).then(match => {
    if (match.length == 0){
      return res.status(404).send({
        meta: {
          message: "Match not found"
        }
      })
    }
    return res.status(200).send({
      match,
      meta: {
        message: `${match.length} matches found`
      }
    })
  })
}

exports.FindMatchViaDistrict = (req,res) => {
  Match.find({match_location_district: {'$regex': req.body.district ,$options:'i'}}).then(match => {
    if (match.length == 0){
      return res.status(404).send({
        meta: {
          message: "Match not found"
        }
      })
    }
    return res.status(200).send({
      match,
      meta: {
        message: `${match.length} matches found`
      }
    })
  })
}
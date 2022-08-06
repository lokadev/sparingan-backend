const Sport = require("../model/Sport");

exports.read = (req, res) => {
  Sport.find().then(Sport => {
    res.status(200).json(Sport)
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error Occured"
    })
  })
}

exports.create = (req, res) => {
  try{
    const dataSport = new Sport({
      sport_name: req.body.sport_name
    });

    dataSport.save().then(data => {
      const success = {
        data,
        meta: {
          message: "Successfully to add sport"
        }
      }
      res.json(success);
    }).catch((err) => {
      res.status(500).send({
        message: "Failed to add sport"
      })
    })
  }catch(err){
    console.log({message: err})
  }
}

exports.find = (req, res) => {
  try {
    Sport.findById(req.params.id).then(sport => {
      if(!sport){
        res.status(404).send({
          message: "Sport not found with id " + req.params.id,
        })
      }
      res.status(200).send(sport);
    })
  }catch{
    res.status(500).send({
      message: "Error retrieving sport with id " + req.params.id,
    });
  }
}

exports.update = (req, res) => {
  Sport.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((sport) => {
    if(!sport){
      res.status(404).send({
        message: "no sport found"
      })
    }
    const success = {
      sport,
      meta: {
        message: "Successfully update"
      }
    }

    res.status(200).send(success)
  })
  .catch((err) => {
    res.status(404).send({
      message: "Error updating"
    });
  })
}

exports.detele = (req, res) => {
  try{
    Sport.findByIdAndRemove(req.params.id).then(sport => {
      if(!sport) {
        res.status(404).send({
          message: "Sport id not found"
        })
      }
      res.send({
        sport,
        meta: {
          message: "Sport deleted sucessfully!"
        }
      })
    })
  }
  catch(err) {
    res.status(500).send({
      message: "Cannot delete sport"
    })
  }
}

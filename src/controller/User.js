const User = require("../model/User");

exports.read = (req,res) => {
  User.find().then(user => {
      res.status(200).json(user)
  })
  .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured",
      }); 
    });
}


exports.create = (req,res) => {
  try{
      User.find({email:req.body.email}).then(user => {
        if(user.length == 0){
          const dataUser = new User({
            name: req.body.name,
            city: req.body.city,
            whatsapp: req.body.whatsapp,
            description: req.body.description,
            isProfessional: req.body.isProfessional,
            email: req.body.email,
            password: req.body.password,
          });

          dataUser.save().then(data => {
            const success = {
              data,
              meta: {
                message: "Successfully to register"
              }
            }
            res.json(success)
          }).catch((err) => {
            res.status(500).send({
              message: "Failed to registred or Please fill out all the forms",
              technical_error: err
            });
          });

        }else{
          res.status(500).send({
            message: "Email has been registred.",
          });
        }
      })
  }catch(err){
      console.log({message: err});
  }
}

exports.update = (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "no user found",
      });
    }
    const success = {
      user,
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

exports.find = (req,res) => {
  try{
      User.findById(req.params.id)
      .then(user => {
          if (!user) {
              return res.status(404).send({
                message: "User not found with id " + req.params.id,
              });
            }
            res.status(200).send(user);
      })
  }catch(err) {
      return res.status(500).send({
          message: "Error retrieving user with id " + req.params.id,
        });
  }
}

exports.delete = (req,res) => {
  try{
      User.findByIdAndRemove(req.params.id)
      .then(user => {
          if (!user){
              return res.status(404).send({
                  message: "User not found ",
                });
          }
          res.send({ message: "User deleted successfully!" });
      })
  }catch(err) {
      return res.status(500).send({
          message: "Cannot delete user",
        });
  }
}

exports.login = (req,res) => {
  try{
    User.find({email: req.body.email, password: req.body.password}).then(user => {
      if(user.length == 1){
        return res.status(200).send({
          user,
          meta: {
            message: "Successfully Login"
          }
        })
      }else{
        return res.status(404).send({
          message: "Failed to Login, Username or password is invalid",
        })
      }
    })
  }catch(err){
    console.log(err);
    return res.status(500).send({
      message: "Please fill out all the forms",
      technical_error: err
    })
  }
}
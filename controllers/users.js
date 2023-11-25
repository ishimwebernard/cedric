const Users = require("../models").Users

module.exports = {
    signUp(req, res){

            Users.create({
                Username: req.body.Username, Email: req.body.Email, Phone: req.body.Phone, Location: req.body.Location, Role: req.body.Role, Password: req.body.Password
            }).then (() =>  {
                return res.status(201).send({message: "User Successfully created"})
            }).catch((error)=> {return res.status(400).send(error)})
         
    },
    login(req, res){
        Users.findAll({
            where: {
                Email: req.body.Email,
            }
        }).then((users) => {
            if (users.length == 0) return res.status(400).send({message: "User not found"})

            if ( users[0].Password == req.body.Password)
            return res.status(200).send({message: "Login Succesful", credentials:users[0]})
            return res.status(400).send({message: "Enter the correct password"})
        }).catch((error) => res.status(400).send(error))
    }
}
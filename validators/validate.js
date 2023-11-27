const FeedbackSchema = require('../validate-schema').FeedbackSchema
const Users = require('../validate-schema').Users
const DesignTrack = require('../validate-schema').DesignTrack
const LoginSchema = require('../validate-schema').Login
const UserdbModel = require('../models').Users
const UpdateModel = require('../validate-schema').Update
module.exports =  {
    async validateFeedback (req, res, next) {
        const {error} = await FeedbackSchema.validate(req.body)
        if (error){
            return res.status(400).send(error)
        }else{
            next()
        }
    },
    async validateUsers (req, res, next) {
        const {error} = await Users.validate(req.body)
        if (error){
            return res.status(400).send(error)
        }else{
            UserdbModel.findAll({where: {Email: req.body.Email}}).then((users) => {
                console.log(users.length)
                if(users.length > 0) return res.status(400).send({message: "Email already in use"})
                next()
            }).catch((error) => res.status(400).send(error))
        }

    },
    async validateLogin(req, res, next){
        const {error} = await LoginSchema.validate(req.body)
        if (error){
            return res.status(400).send(error)
        }else{
            next()
        }
    }
    ,
    async validateDesignTrack(req, res, next) {
        const {error} = await DesignTrack.validate(req.body)
        if (error){
            return res.status(400).send(error)
        }else{
            next()
        }

    },
    async validateUpdate(req, res, next) {
        const {error} = await UpdateModel.validate(req.body)
        if (error){
            return res.status(400).send(error)
        }else{
            if([0,1,2,3].includes(req.body.Status))
            return next()
            else return res.status(400).send({message: 'Status should be 0,1,2,3'})
        }

    }
}
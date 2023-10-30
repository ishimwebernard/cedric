var express = require('express');
var router = express.Router();
const Validator = require('../validators/validate')
const multer = require("multer")
const upload = multer({ dest: './public/data/uploads/' })
const DesignTrack = require('../validate-schema').DesignTrack
const FeedbackSchema = require('../validate-schema').FeedbackSchema


const UsersController = require('../controllers').User
const DesignTrackModel = require('../models').DesignTrack
const FeedbackModel = require('../models').Feedback

var RequestObject = {}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/signup', Validator.validateUsers, UsersController.signUp)
router.post('/api/login', Validator.validateLogin, UsersController.login)

router.post('/api/submitdesign',upload.single('uploaded_file'), function (req, res, next) {
  console.log(req.body)
  if (!req.file){
    return res.status(400).send({message: "Send at least one file"})
  }
  RequestObject = req.body
  RequestObject.Files = req.file.filename
  RequestObject.Status = 0
  next()
}, async function (req, res) {
  const {error} = await DesignTrack.validate(RequestObject)
  if (error){
      return res.status(400).send(error)
  }else {
     return DesignTrackModel.create(RequestObject).then(()=> res.status(201).send({message: "Design Succesfully submitted"}))
      .catch((error)=>res.status(400).send(error))
  }
});

router.post('/api/submitfeedback',upload.single('uploaded_file'), function (req, res, next) {
  console.log(req.body)
  if (!req.file){
    return res.status(400).send({message: "Send at least one file"})
  }
  RequestObject = req.body
  console.log(req.file)
  RequestObject.CustomerFiles = req.file.filename
  next()
}, async function (req, res) {
  const {error} = await FeedbackSchema.validate(RequestObject)
  if (error){
      return res.status(400).send(error)
  }else {
     return FeedbackModel.create(RequestObject).then(()=> res.status(201).send({message: "Feedback Succesfully submitted"}))
      .catch((error)=>res.status(400).send(error))
  }
});


module.exports = router;

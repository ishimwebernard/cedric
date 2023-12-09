var express = require('express');
var router = express.Router();
const Validator = require('../validators/validate')
//const upload = multer({ dest: './public/data/uploads/' })

var multer = require('multer');
var path = require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
var upload = multer({ storage: storage });


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
router.get('/api/getAllCustomers', UsersController.giveAllCustomers)


router.post('/api/submitdesign',upload.single('uploaded_file'), function (req, res, next) {
  console.log(req.body)
  console.log('Files', req.file)
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
router.post('/api/getFeedbackCustomer',(req,res)=>{
  FeedbackModel.findAll({
    where: {
        CustomerEmail: req.body.CustomerEmail,
    }
}).then((feedbacks)=>{
  res.status(200).send(feedbacks)
}).catch((error)=>{
  res.status(400).send({message: "Something went wrong"})
})
})
router.post('/api/getFeedbackDesigner',(req,res)=>{
  FeedbackModel.findAll({
    where: {
        DesignerEmail: req.body.DesignerEmail,
    }
}).then((feedbacks)=>{
  res.status(200).send(feedbacks)
}).catch((error)=>{
  res.status(400).send({message: "Something went wrong"})
})
})

router.post('/api/viewSubmittedContent', (req, res)=>{
  DesignTrackModel.findAll({
    where: {
      DesignerEmail: req.body.DesignerEmail,
    }
}).then((designs)=>{
  res.status(200).send(designs)
})
})
router.post('/api/viewDesignerRejectedDesingns', (req, res)=>{
  DesignTrackModel.findAll({
    where: {
      DesignerEmail: req.body.DesignerEmail,
      Status: 3
    }
}).then((designs)=>{
  res.status(200).send(designs)
})
})


router.post('/api/viewDesignerApprovedDesingns', (req, res)=>{
  DesignTrackModel.findAll({
    where: {
      DesignerEmail: req.body.DesignerEmail,
      Status: 2
    }
}).then((designs)=>{
  res.status(200).send(designs)
})
})


router.post('/api/viewCustomerAddressedDesign', (req, res)=>{
  DesignTrackModel.findAll({
    where: {
      CustomerEmail: req.body.CustomerEmail,
    }
}).then((designs)=>{
  res.status(200).send(designs)
})
})


router.get('/api/viewAllContent', (req, res)=>{
  DesignTrackModel.findAll().then((designs)=>{
  res.status(200).send(designs)
})
})
router.post('/api/updateDesign/:id', Validator.validateUpdate,(req, res)=>{
  return DesignTrackModel.findByPk(req.params.id).then(design=>{
    if (!design) {
      return res.status(404).send({
        message: 'Design Not Found',
      });
    }
    return design.update({Status: req.body.Status}).then((s)=>{
      console.log(req.body)
      return res.status(200).send({message: 'Success'})
    }).catch((error)=>{
      console.log(error)
      return res.status(400).send({message: 'Something went wrong!'})
    })
  })
})

module.exports = router;

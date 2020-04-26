var express = require('express');
var router = express.Router();
var cors = require('cors');
var models = require('./../models/model');

router.use(cors());

// @route   GET /employeeData
// @desc    Get all Item
// @access  Public

router.get('/employeeData', function(req, res) {
  models.find()
        .then(response=>{
          res.status(200).send(response);
        }).catch(err=>{
          res.status(500).send(err.message);
        })
});

// @route   GET /employeeData/:id
// @desc    Get individual Item
// @access  Public

router.get('/employeeData/:id', function(req, res) {
  models.findById({_id: req.params.id}, (err, task)=>{
    if(err) return res.status(500).send(err.message);
    res.status(200).send(task);
  })    
});

// @route   PUT /employeeData/
// @desc    Update Item
// @access  Public

router.put('/employeeData/:id', (req, res)=>{
  let id = req.params.id;

  models.findById({_id: id}, (err, task)=>{
    task.name = req.body.name;
    task.mobile = req.body.mobile;
    task.email = req.body.email;

    task.save((err, task)=>{
      if(err) return res.status(500).send(err.message);
      res.status(200).json(task);
    })
  })
})

// @route   DELETE /employeeData/:id
// @desc    Delete Item
// @access  Public

router.delete('/deleteEmployee/:id', (req, res)=>{
  models.findById(req.params.id)
    .then(item=>{
      item.remove();
      models.find()
        .then(response=>{
          res.send(response);
        })
    }).catch(err=>{
      res.status(404).send(err.message);
    })
})

// @route   POST /addEmployee
// @desc    Add Item
// @access  Public

router.post('/addEmployee', (req, res)=>{
  const newItem = new models({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile
  })
  newItem.save()
    .then(item=>res.json(item))
    .catch(err=>res.status(500).send(err.message));
})

module.exports = router;

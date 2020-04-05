'use strict';

const express = require('express');
const db = require('../models');
const Campus = db.models.campus;
const Student = db.models.student;

// This router is already mounted on `/api/campuses` in server/app.js
const router = express.Router();

// router.get('/api/campuses', function (req, res, next){
// 	Campus.findAll()
//   	.then(campuses => res.send(campuses))
//   	.catch(next);

// });
router.get('/', function (req, res, next){
	Campus.findAll()
  	.then(campuses => res.status(200).send(campuses))
  	.catch(next);

});


router.get('/:id', function (req, res, next){
	// Student.findAll({ where: {campusId: req.params.id}})
    //   .then(students => res.send(students))
	//   .catch(next);
	  

	  Campus.findOne({ where: {id: req.params.id}})
      .then(campus => res.send(campus))
	  .catch(next);

});

router.get('/:id/students', function (req, res, next){
	Student.findAll({ where: {campusId: req.params.id}})
      .then(students => res.send(students))
	  .catch(next);
});

router.post('/', function (req, res, next) {
	Campus.create(req.body)
	.then(campus => res.status(201).send(campus))
	.catch(next);
  });


  router.post('/:id/students', function (req, res, next) {
	Student.create(Object.assign({}, req.body, {campusId: req.params.id}))
	.then(message => res.status(201).send(message))
	.catch(next);
  });


module.exports = router;

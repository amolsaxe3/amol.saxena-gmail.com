const express = require('express');
const {db, Student, Campus} = require('../db')

// This router is already mounted on /users in server/app.js
const router = express.Router();

router.get('/', async function (req, res, next){
	try {
		const students = await Student.findAll()
  		res.status(200).send(students)
	} catch (error) {
		console.log(error)
		next(error)
	}
});

router.get('/:id', async function (req, res, next){
	try {
		const student = await Student.findOne({
			where: {
			  id: req.params.id
			},
			include: [{
				model: Campus
			}]
		})
  		res.status(200).send(student)
	} catch (error) {
		console.log(error)
		next(error)
	}  	
});

router.post('/', function (req, res, next) {
	Student.create(req.body)
	.then(student => res.status(201).send(student))
	.catch(next);
  });

  router.put('/:id', (req, res, next) => {
	const { firstName, lastName, email, campusId } = req.body;
	const { id } = req.params;
	Student.findByPk(id)
	  .then(foundStudent => {
		return foundStudent.update({
			firstName, lastName, email, campusId
		});
	  })
	  .then(updatedStudent => {
		return res.status(201).send(updatedStudent);
	  })
	  .catch(err => next(err));
  });

  router.delete('/:id', (req, res, next) => {
	const { id } = req.params;
	Student.destroy({
	  where: {
		id,
	  },
	})
	  .then(() => res.status(200).end())
	  .catch(err => next(err));
  });

  
module.exports = router; 
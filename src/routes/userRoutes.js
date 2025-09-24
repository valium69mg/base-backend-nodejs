const express = require('express');
const router = express.Router();

const UserRepository = require('../models/userRepository.js');
const UserService = require('../services/userService.js');
const UserController = require('../controllers/userController.js');
const { getPool } = require('../../config/database.js');

const userRepository = new UserRepository(getPool());
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/', (req, res) => userController.register(req, res));
router.put('/', (req, res) => userController.update(req, res));
router.get('/all', (req, res) => userController.getAllUsers(req, res));
router.get('/:id', (req, res) => userController.getUserById(req, res));
router.delete('/:id', (req, res) => userController.deleteUserById(req, res));

module.exports = router;

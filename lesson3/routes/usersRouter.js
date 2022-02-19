const {Router} = require('express');
const UsersController = require("../controllers/usersController");

const usersRouter = Router();

usersRouter.get('/', UsersController.renderUsers);
usersRouter.get('/:id', UsersController.getUserById);

module.exports = usersRouter;
const {Router} = require('express');
const deleteController = require("../controllers/deleteController");

const deleteRouter = Router();

deleteRouter.post('/', deleteController.deleteUser);

module.exports = deleteRouter;
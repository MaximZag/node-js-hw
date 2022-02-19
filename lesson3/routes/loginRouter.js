const {Router} = require('express');
const LoginController = require("../controllers/loginController");
const LoginMiddleWare = require("../middleware/isAllData")

const loginRouter = Router();

loginRouter.get('/', LoginController.renderLogin);
loginRouter.post('/', LoginMiddleWare, LoginController.addingUsers);


module.exports = loginRouter;
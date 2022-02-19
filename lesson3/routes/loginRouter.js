const {Router}=require('express');
const LoginController = require("../controllers/loginController");

const loginRouter=Router();

loginRouter.get('/',LoginController.renderLogin);
loginRouter.post('/',LoginController.addingUsers);


module.exports=loginRouter;
const {Router} = require('express');
const SigninController = require("../controllers/signinController")

const signinRouter = Router();

signinRouter.get('/', SigninController.renderSignIn);
signinRouter.post('/', SigninController.signinUser);

module.exports = signinRouter;
const {Router} = require('express');
const SigninController = require("../controllers/signinController");
const SigninMiddleWare = require("../middleware/emailSign");

const signinRouter = Router();

signinRouter.get('/', SigninController.renderSignIn);
signinRouter.post('/', SigninMiddleWare, SigninController.signinUser);

module.exports = signinRouter;
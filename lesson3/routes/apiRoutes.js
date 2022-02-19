const {Router} = require('express');
const usersRouter = require("./usersRouter");
const loginRouter = require("./loginRouter");
const errorRouter = require("./errorRouter");
const userRouter = require("./userRouter");
const signinRouter = require("./signinRouter");
const deleteRouter = require("./deleteRouter");

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/login', loginRouter);
routes.use('/error', errorRouter);
routes.use('/user', userRouter);
routes.use('/signin', signinRouter);
routes.use('/delete', deleteRouter);

module.exports = routes;

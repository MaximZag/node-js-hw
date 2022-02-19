const users = require("../db/users");

function isEmailPresent(req, res, next) {
    try {
        const {email, password} = req.body;

        if (!users.some(user => user.email === email)) {
            throw new Error('Email not found!!')
        }

        if (users.some(user => user.email === email && user.password !== password)) {
            throw new Error('Password is incorrect!!')
        }

        next();
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
}

module.exports = isEmailPresent;
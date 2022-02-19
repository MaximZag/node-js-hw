const users = require("../db/users");

class SigninController {
    renderSignIn(req, res) {
        res.render('signin');
    }

    signinUser(req, res) {
        let user = {}
        for (const uniquser of users) {
            if (uniquser.email === req.body.email && uniquser.password === req.body.password) {
                user = {...uniquser};
            }
        }
        if (Object.keys(user).length > 0) {
            res.render('user', {user});
        } else {
            let error = 'Email or password not found'
            res.render('error', {error});
        }
    }

}

module.exports = new SigninController();
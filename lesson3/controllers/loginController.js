const users = require("../db/users");

class LoginController {

    renderLogin(req, res) {
        res.render('login');
    }

    addingUsers(req, res) {

        if (users.length > 0) {
            if (users.map(user => user.email).includes(req.body.email)) {
                let error = 'This email already exists!!!'
                res.render('error', {error});
            } else {
                users.push(req.body);
                res.redirect('/users');
            }
        } else {
            users.push(req.body);
            res.redirect('/users');
        }
    }
}

exports = users
module.exports = new LoginController();
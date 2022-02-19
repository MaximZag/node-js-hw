let users = require("../db/users");

class UsersController {

    renderUsers(req, res) {
        let filterUsers = [...users];
        if (req.query.age) {
            filterUsers = filterUsers.filter(user => user.age === req.query.age);
        }
        if (req.query.city) {
            filterUsers = filterUsers.filter(user => user.city === req.query.city);
        }
        res.render('users', {filterUsers});
    }

    getUserById(req, res) {
        const {id} = req.params;
        res.render(`user`, {user: users[parseInt(id) - 1]});
    }

}

module.exports = new UsersController();
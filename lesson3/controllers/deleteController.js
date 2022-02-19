let users = require("../db/users");

class DeleteController {
    deleteUser(req, res) {
        // users.filter(user => user.email !== Object.keys(req.body)[0])
        const index = users.findIndex(user => user.email !== Object.keys(req.body)[0])
        users.splice(index - 1, 1);
        res.redirect('/users');
    }
}

module.exports = new DeleteController();
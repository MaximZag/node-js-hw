const user=require("../db/users")

class UserController{
    renderUser(req,res){
        res.render('user', {user})
    }
}

module.exports=new UserController();
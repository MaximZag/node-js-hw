const {error}=require("../db/users")

class ErrorController{
    renderError(req,res){
        console.log(error)
        res.render('error', {error});
}
}
module.exports=new ErrorController();
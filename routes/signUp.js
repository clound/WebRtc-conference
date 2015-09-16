/**
 * Created by jky on 15-9-16.
 */

module.exports = function ( app ) {
    //app.get('/sign up',function(req,res){
    //    res.render('index');
    //});

    app.post('/sign up', function (req, res) {
        var User = global.dbHelper.getModel('user');
        var userInfo = {
            name : req.body.uname,
            password: req.body.upwd
        }
        User.findOne({name: userInfo.name}, "username, password", function (error, doc) {
            if (error) {
                res.send(500);
                console.log(error);
            } else if (!doc) {
                req.session.error = '用户名可用，正在注册';
                //res.send(404,req.session.error);
                global.async.series({
                    addUser: global.dbHelper.addUser(userInfo),
                    checkUser: User.findOne({name: userInfo.name}, function (error, doc) {
                        if (error) return false;
                        if (!doc) {
                            return false;
                        } else return true;
                    })
                }, function(err, result) {
                    if (err) {
                        return false;
                    }
                    if(result.addUser === true && result.checkUser === true) {
                        req.session.error = '用户注册成功';
                        res.send(200);
                    }
                });
                //global.dbHelper.addUser(userInfo);
            } else {
                    req.session.error = "用户名存在，请换一个";
                    res.send(404,req.session.error);
            }
        });
    });
}
/**
 * Created by lenovo on 15-9-10.
 */
var myApp = angular.module('myApp',[]);
myApp.directive('myDialog', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl:'/template/Login.html',
        link:function(scope,element,attrs){
            scope.Userregister = function() {
                var arr = element.find('.form-group');
                var title = element.find(".modal-title");
                title[0].textContent = "注册";
                if(arr.length !== 5){
                    $(arr[1]).after(function () {
                        return "<div class='form-group'>" +
                            "<label for='inputPassword' class='col-sm-offset-1 col-sm-3 control-label'>确认密码:</label>" +
                            "<div class='col-sm-6'>" +
                            "<input type='password' class='form-control' id='ConfirmPassword' placeholder='ConfirmPassword'>" +
                            "</div>" +
                            "</div>";
                    })
                }
                var username = $('#Username').val().replace(/^\s+|\s+$/g, '');
                var password = $('#Password').val().replace(/^\s+|\s+$/g, '');
                var confirmpwd = $("#ConfirmPassword").val().replace(/^\s+|\s+$/g, '');
            },
            scope.UserLogin = function(){
                var arr = element.find('.form-group');
                var title = element.find('.modal-title');
                if(arr.length !== 4) {
                    title[0].textContent = "登录";
                    $(arr[2]).remove();
                }
                var username = $('#Username').val().replace(/^\s+|\s+$/g, ''),password = $('#Password').val().replace(/^\s+|\s+$/g, '');
                var data = { "uname": username, "upwd":password};
                if(username !== '' && password !== ''){
                    $.ajax({
                        url:'/login',
                        type:'POST',
                        data:data,
                        success:function(data,status){
                            if(status == 'success'){
                                location.href='home';
                            }
                        },
                        error:function(xhr,data,status){
                            //alert(xhr.responseText+data+status)
                            if(data == "error"){
                                location.href='login';

                            }
                        }
                    });

                    //$http({
                    //        url:'/login',
                    //        method:'POST',
                    //        data:data,
                    //    }).success(function(data, status, headers, config) {
                    //        alert(status)
                    //});
                }
            }
        },
        controller: function () {}
    };
});

app.controller('loginCtrl',function ($scope,$rootScope) {
    $scope.login=function () {
        var check = true;
        $rootScope.students.forEach(st => {
            if (st.username == $scope.username) {
                if (st.password == $scope.password) {
                    alert("Đăng nhập thành công");
                    
                }
                $rootScope.studentabc=st;
                window.location.href = "#home";
                check=false;
                return;
            }
        });
        if (check==true) {
            alert("Sai tên đăng nhập hoặc mật khẩu !")
        }
    }
})

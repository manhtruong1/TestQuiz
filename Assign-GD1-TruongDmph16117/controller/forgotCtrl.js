app.controller('forgotCtrl',function ($scope,$rootScope) {
    $scope.forgotPass=function () {
        var check=true;
        $rootScope.students.forEach(st => {
            if (st.email == $scope.email && st.username==$scope.username) {
                alert("Mật khẩu của bạn là: "+st.password)
            }
        });
    }
})

app.controller('dangky',function ($scope,$http,$rootScope) {
    // $scope.students = [];
    $scope.message = "";
    const url = 'https://621331f0f43692c9c6fc67d7.mockapi.io/api_student/student/student_mockapi';
    $scope.onSubitform = function (event) {
        event.preventDefault();
            $http.post(url,$scope.regis)
            .then(function (res) {
                alert("Đăng ký thành công");
            })
            // window.location.href="#login";
        // }
    }

})
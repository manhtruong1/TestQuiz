app.controller('updateAcc',function ($scope,$http,$rootScope) {
    const url = 'https://621331f0f43692c9c6fc67d7.mockapi.io/api_student/student/student_mockapi';
    
    $scope.submitForm=function (event,id) {
        event.preventDefault();
        const updateApi = url + '/' +id;
        $http.put(updateApi,$scope.studentabc)
            .then(function (res) {
                alert("Cập nhật thành công !");
                
                // $rootScope.studentabc.fullname=null;
                // $rootScope.studentabc.email=null;
                // $rootScope.studentabc.birthday=null;
                // $rootScope.studentabc.schoolfee=null;
            })
    }
})
// const app=angular.module("jpa",["ngRoute"])
// app.config(function ($routeProvider,$locationProvider) {
//     $locationProvider.hashPrefix('');
//     $routeProvider.when("/lienhe",{
//         templateUrl:'lienhe.html'
//     })
// })

app.controller('acctrl',function ($scope, $http,$rootScope) {
    const url = 'https://621331f0f43692c9c6fc67d7.mockapi.io/api_student/student/student_mockapi';
    $scope.onSumbit = function (event) {
        event.preventDefault();
        $http.post(url,$scope.regis)
                    .then(function () {
            alert("Thêm thành công")
        })
    }

    $scope.update = function (event,id) {
        event.preventDefault();
        const id = url + '/'+id;
        $http.put(id,$scope.item).then(function () {
            alert("Thêm thành công")
        })
    }

    $scope.delete= function (id,index) {
        const id = url + '/'+id;
        $http.delete(id).then(function () {
            alert("Xóa thành công")
            $scope.students.spilce(index,1);
        })
    }
})



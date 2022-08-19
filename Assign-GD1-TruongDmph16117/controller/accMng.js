app.controller('accMngCtrl',function ($scope,$http,$rootScope) {
    const url = 'https://621331f0f43692c9c6fc67d7.mockapi.io/api_student/student/student_mockapi';
    $scope.onSubmbitInsert = function (event) {
        event.preventDefault();
        $http.post(url,$scope.regis)
        .then(function (res) {
        alert("Thêm thành công !")
        $rootScope.students.push(res.data);
        });
    };
    $scope.onDelete=function (id,index) {
        const deleteId = url + '/' + id;
        $http.delete(deleteId).then(function () {
            alert("Xóa thành công");
            $rootScope.students.splice(index,1);
            $('#modal_delete_'+id).modal('hide')
        })
    }

    $scope.onUpdate = function (event,id) {
        event.preventDefault();
        const updateId = url + '/' + id;
        $http.put(updateId,$scope.item)
        .then(function (res) {
        alert("Cập nhật thành công !")
        
        });
    };

})
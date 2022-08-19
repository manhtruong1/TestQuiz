const app = angular.module("myApp",["ngRoute"]);

//lay du lieu do vao bang
app.run(function ($rootScope,$http) {
    $rootScope.students=[];
    $http.get('https://621331f0f43692c9c6fc67d7.mockapi.io/api_student/student/student_mockapi')
            .then(function (response) {
              $rootScope.students=response.data;
            })
    $rootScope.studentabc=null;
    //dang xuat 
    $rootScope.logout=function () {
      $rootScope.studentabc=null;
      alert("Đăng xuất thành công");
    }
})

app.config(function ($routeProvider,$locationProvider) {
  $locationProvider.hashPrefix('');
    $routeProvider
    .when("/home", { templateUrl: "html/home.html",
                    controller:'subjectCtrl'})
    .when("/contact", { templateUrl: "html/lienhe.html" })
    .when("/forgotpass", { templateUrl: "html/fogot-pasword.html",controller:'forgotCtrl' })
    .when("/gioithieu", { templateUrl: "html/introduce.html" })
    .when("/gopy", { templateUrl: "html/gopy.html" })
    .when("/update", { templateUrl: "html/update-info.html",controller:'updateAcc' })
    .when("/android/:id/:name", { templateUrl: "quiz.html",controller:'quizCtrl' })
    .when("/login", { templateUrl: "html/login.html",controller:'loginCtrl' })
    .when("/accmng", { templateUrl: "html/accmng.html",controller:'accMngCtrl' })
    // .when("/page2", { templateUrl: "html/page2.html" })
    .when("/dangky", { templateUrl: "html/regis.html",controller:'dangky' })
    .otherwise({
      redirectTo: "/home",
    });
});

app.controller('quizCtrl',function ($scope,$http,$routeParams,quizFactory) {
                $http.get('../db/Quizs/'+$routeParams.id+'.js').then(function (res) {
                        quizFactory.questions=res.data;  
                })
})

app.controller('subjectCtrl',function ($scope,$http) {
    $scope.list_subject=[];
    $http.get('../db/Subjects.js').then(function (res) {
        $scope.list_subject = res.data;
    })
    
    $scope.begin = 0;
    $scope.pageCount = Math.ceil($scope.list_subject.length / 8);
    $scope.first = function () {
        $scope.begin = 0;
    }

    $scope.prev = function () {
        if ($scope.begin > 0) {
            $scope.begin -= 8;
        }
    }

    $scope.next = function () {
        if ($scope.begin < ($scope.pageCount - 1) * 8) {
            $scope.begin += 8;
        }
    }

    $scope.last = function () {
        $scope.begin = ($scope.pageCount - 1) * 8;
    }
})

app.directive("quizpoly", function (quizFactory,$routeParams) {
 return {
    link: function (scope, elem, atts) {
      scope.start = function () {
        quizFactory.getQuestions().then(function () {
        scope.subjectname = $routeParams.name
          scope.id = 1;
        scope.quizOver=false; //not done
        scope.inProgress = true;
        scope.getQuestion();
        });
        
      };

      scope.reset = function () {
        scope.inProgress = false;
        scope.score=0;
      };

      scope.getQuestion = function () {
        var quiz = quizFactory.getQuestion(scope.id);
        if (quiz) {
          scope.question = quiz.Text;
          scope.options = quiz.Answers;
          scope.answer = quiz.AnswerId;
          scope.answerMode=true;
        }else{
            scope.quizOver=true;
        }
      };

      scope.checkAnswer = function () {
        //   alert('answer')
        if (!$("input[name=answer]:checked").length) return;
        var ans = $("input[name=answer]:checked").val();
        if (ans == scope.answer) {
          alert("Đúng");
          scope.score++;
          scope.correctAnswer = true
          
        } else {
          alert("Sai");
          scope.correctAnswer = false
          
        }
        scope.answerMode=false;
      };

      scope.nextQues = function () {
          scope.id++;
          scope.getQuestion();
      }
      scope.reset();
    },
   };
});
app.factory("quizFactory", function ($http,$routeParams) {
    // $http.get('/db/Quizs/ADAV.js').then(function (res) {
     
    //     questions=res.data;
    // })
  //trả về câu hỏi, truyền vào id lấy phần tử trong mảng
    return {
    getQuestions:function () {
      return $http.get('../db/Quizs/'+$routeParams.id+'.js').then(function (res) {
        questions=res.data;
    })
    },
    getQuestion: function (id) {
        var randomItem=questions[Math.floor(Math.random()*questions.length)]
        var count = questions.length
        if (count>11) {
            count=11;
        }
        if (id<count) {
            return randomItem;
        }else{
            return false;
        }
        
    },
  };
});






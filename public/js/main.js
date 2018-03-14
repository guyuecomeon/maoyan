import cinemaMathInit from '../modules/cinemaMatch/cinemaMatch.js'
import cinemaInit from '../modules/cinema/cinema.js'
import messageInit from '../modules/message/message.js'
import movieInit from '../modules/movie/movie1.js'
import hotMovieInit from '../modules/hotMovie/hotMovie.js'
import hotShowInit from '../modules/hotShow/hotShow.js'
import reflectInit from '../modules/reflect/reflect.js'
import usersInit from '../modules/users/user vice.js'
init();
function init() {
    getUsersName();
    function getUsersName() {
        $.get('/getUsersName', function (data) {
            if (data) {
                $("#IheaderSpan").html(`${data}`);
            } else {
                location.href = "login.html";
            }
        })
    }
    $('#pBtn').click(function(){
        $.get('/outlogin',function(data){})
        getUsersName();
    })
    $("#nav").delegate('li', 'click', function (e) {
        let name = $(e.target).attr("data-name")
        // console.log('modules/' + name + '/' + name + '.html');
            if ($("#Ishow").tabs("exists", name)) {
                $("#Ishow").tabs("select", name)
            } else {
                $("#Ishow").tabs('add', {
                    title: name,
                    href: 'modules/' + name + '/' + name + '.html',
                    closable: true,
                    onLoad: function () {
                        switch (name) {
                            case 'users': {
                                usersInit();
                            }
                            case 'message': {
                                messageInit();
                            }
                            case 'cinema': {
                                cinemaInit();
                            }
                            case 'cinemaMatch': {
                                cinemaMathInit();
                            }
                            case 'hotMovie': {
                                hotMovieInit();
                            }
                            case 'reflect': {
                                reflectInit();
                            }
                            case 'hotShow': {
                                hotShowInit();
                            }
                            case 'movie':{
                                movieInit();
                            }
                        }
                    }
                });
            }
    });
}
// init();
function init() {
    hot_movie_startNum();
    hot_movie_toolbar();
    hot_movie_event();
    hot_movie_propNum();
    hot_movie_NewEvent();
    searchboxEvent();
    hot_movie_propNum();
}

//工具栏——搜索
function hot_movie_toolbar() {
    $('#hot_movie_searchEven').searchbox({
        searcher: function (value, name) {
        },
        menu: '#hotMovieList',
    });
}
//初始化事件
function hot_movie_event() {
    $("#hot_movie_addEventBtn").on("click", hot_movie_addEvent);
    $("#hot_movie_removeBtn").on("click", hot_movie_removeEvent);
    $("#hotMovieNew").on("click", hot_movie_NewEvent);
    $("#hot_movie_addBtn").on("click", hot_movie_addBtnEvent);
}

//初始化数据
function hot_movie_startNum() {
    $('#hot_movie_tab').datagrid({
        url: '/hotMovie/getStartInfo',
        pagination: true,
        rownumbers: true,
        striped: true,
        pageSize: 15,
        pageList: [15, 20],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'hotShowName', title: '电影名', width: 100 },
            { field: 'hotShowEName', title: '英文名', width: 100 },
            { field: 'hotShowType', title: '类型', width: 100 },
            { field: 'hotShowArea', title: '区域', width: 100 },
            { field: 'hotShowScore', title: '评分', width: 100 },
            { field: 'hotShowActor', title: '演员', width: 100 },
            { field: 'hotShowwant', title: '想看', width: 100 },
            { field: 'hotShowDuration', title: '时长', width: 100 },
            { field: 'hotShowReleaseTime', title: '上映时间', width: 100 },
            { field: 'hotShowReleaseArea', title: '上映区域', width: 100 },
            { field: 'hotShowBoxOffice', title: '票房', width: 100 },
            { field: 'hotShowSynopsis', title: '剧情简介', width: 100 },
            { field: 'hotShowImg', title: '图片', width: 100 },
        ]]
    });
}
//弹窗数据
function hot_movie_propNum() {
    $('#hot_movie_proptab').datagrid({
        url: '/hotMovie/getAllMovie',
        pagination: true,
        rownumbers: true,
        striped: true,
        pageSize: 10,
        pageList: [10, 15],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'hotShowName', title: '电影名', width: 100 },
            { field: 'hotShowEName', title: '英文名', width: 100 },
            { field: 'hotShowType', title: '类型', width: 100 },
            { field: 'hotShowArea', title: '区域', width: 100 },
            { field: 'hotShowScore', title: '评分', width: 100 },
            { field: 'hotShowActor', title: '演员', width: 100 },
            { field: 'hotShowwant', title: '想看', width: 100 },
            { field: 'hotShowDuration', title: '时长', width: 100 },
            { field: 'hotShowReleaseTime', title: '上映时间', width: 100 },
            { field: 'hotShowReleaseArea', title: '上映区域', width: 100 },
            { field: 'hotShowBoxOffice', title: '票房', width: 100 },
            { field: 'hotShowSynopsis', title: '剧情简介', width: 100 },
            { field: 'hotShowImg', title: '图片', width: 100 },
        ]]
    });
};

//开启弹窗
function hot_movie_openProp() {
    $('#hot_movie_propdiv').dialog({
        title: '添加电影',
        width: 1200,
        height: 400,
        closed: false,
    });
}


//关闭弹窗
function hot_movie_closeProp() {
    $('#hot_movie_propdiv').dialog({
        title: '添加电影',
        closed: true,
    });
}

//增加事件函数
function hot_movie_addEvent() {

    //筛选

    //获取表格中当前页的所有数据
    let hot_movie_tabNum = $('#hot_movie_tab').datagrid("getRows");
    //获取弹窗中当前页的所有数据
    let hot_movie_propTabNum = $("#hot_movie_proptab").datagrid("getRows");
    //定义一个空数组来接收弹窗中要删除的数据
    let hot_movie_newAry = [];
    let i, j;
    for (i = 0; i < hot_movie_tabNum.length; i++) {

        for (j = 0; j < hot_movie_propTabNum.length; j++) {
            //如果表格中的数据和弹窗中数据的电影名相同，则删除弹窗中的数据
            if (hot_movie_tabNum[i].hotShowName == hot_movie_propTabNum[j].hotShowName) {
                //把要删除的数据添加在数组里面
                hot_movie_newAry.push(hot_movie_propTabNum[j]._id);

                //删除单条相同数据
                $.post('/hotMovie/delSameInfo', { _id: hot_movie_propTabNum[j]._id }, (data) => {
                    $('#hot_movie_proptab').datagrid('reload');
                })
                //删除多条相同数据
                let ids = hot_movie_newAry;

                $.post('/hotMovie/delSameInfo', { ids }, (data) => {
                    $('#hot_movie_proptab').datagrid('reload');
                })
            }
        }
    }
    hot_movie_openProp();
    //点击取消，弹窗关闭
    $("#hot_movie_cancelBtn").click(function () {
        hot_movie_closeProp();
    })
}

//增加数据的函数
function hot_movie_addBtnEvent() {
    let hotMovieSels = $("#hot_movie_proptab").datagrid("getSelections");
    // console.log(hotMovieSels);
    let hot_Movie_param = {
        submitType: "addMore",
        data: JSON.stringify(hotMovieSels),
    }
    $.post("/hotMovie/hot_movie_addNum", hot_Movie_param, function (data) {
        $('#hot_movie_tab').datagrid('reload');
    });
    hot_movie_delSameAlredy();
    hot_movie_closeProp();
}

//增加数据到表格，然后删除已添加的数据

function hot_movie_delSameAlredy() {
    let hotMovieDelPropEvent = $('#hot_movie_proptab').datagrid("getSelections");
    if ($('#hot_movie_proptab').datagrid("getSelected")) {
        //删除单条数据
        $.post('/hotMovie/delAlreadyInfo', { _id: $('#hot_movie_proptab').datagrid("getSelected")._id, }, (data) => {
            $('#hot_movie_proptab').datagrid('reload');
        })

        //删除多条数据
        let AlreadyTest = function (obj) {
            return obj._id;
        }
        let ids = $("#hot_movie_proptab").datagrid("getSelections").map(AlreadyTest);
        $.post('/hotMovie/delAlreadyInfo', { ids }, function (data) {
            $("#hot_movie_proptab").datagrid('reload');
        })
    }
}

//删除事件函数
function hot_movie_removeEvent() {
    let hotMovieDelEvent = $('#hot_movie_tab').datagrid("getSelections");
    if ($('#hot_movie_tab').datagrid("getSelected")) {
        $.messager.confirm('确认', '您确定删除数据？', function (r) {
            if (r) {

                //删除单条数据
                $.post('/hotMovie/delInfo', { _id: $('#hot_movie_tab').datagrid("getSelected")._id, }, (data) => {
                    $('#hot_movie_tab').datagrid('reload');
                })

                //删除多条数据
                let test = function (obj) {
                    return obj._id;
                }
                let ids = $("#hot_movie_tab").datagrid("getSelections").map(test);
                $.post('/hotMovie/delInfo', { ids }, function (data) {
                    $("#hot_movie_tab").datagrid('reload');
                })
            }
        })
    }

}

function searchboxEvent() {
    $('#hot_movie_searchEven').searchbox({
        searcher: function (value, name) {
            $('#hot_movie_tab').datagrid({
                queryParams: {
                    [name]: value
                }
            })
            $('#hot_movie_tab').datagrid('reload');
        },
    });
}


//刷新功能
function hot_movie_NewEvent() {
    //清空ajax查询
    $('#hot_movie_tab').datagrid({ queryParams: {} })
    $('#hot_movie_tab').datagrid('load')

    //清空文本框  
    $("#hot_movie_searchEven").val('');
    $('#hot_movie_tab').datagrid('load')
}
export default init;




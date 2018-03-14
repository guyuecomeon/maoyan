// init();
function init() {
    hot_show_startNum();
    hot_show_toolbar();
    hot_show_event();
    hot_show_propNum();
    hotShowNewEvent();
    hotShowSearchEvent();
    hot_show_addBtnEvent();
}

//工具栏——搜索
function hot_show_toolbar() {
    $('#hot_show_searchEven').searchbox({
        searcher: function (value, name) {
        },
        menu: '#hotShowList',
    });
}
//初始化事件
function hot_show_event() {
    $("#hot_show_addEventBtn").on("click", hot_show_addEvent);
    $("#hot_show_removeBtn").on("click", hot_show_removeEvent);
    $("#hotShowNew").on("click", hotShowNewEvent);
    $("#hot_show_addBtn").on("click", hot_show_addBtnEvent);
}

//初始化数据
function hot_show_startNum() {
    $('#hot_show_tab').datagrid({
        url: '/hotShow/getStartInfo',
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
function hot_show_propNum() {
    $('#hot_show_proptab').datagrid({
        url: '/hotShow/getAllMovie',
        pagination: true,
        rownumbers: true,
        striped: true,
        method: 'post',
        pageSize: 10,
        pageList: [10, 15],
        // checkbox:true,
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
function hot_show_openProp() {
    $('#hot_show_propdiv').dialog({
        title: '添加电影',
        width: 1200,
        height: 400,
        closed: false,
    });
}


//关闭弹窗
function hot_show_closeProp() {
    $('#hot_show_propdiv').dialog({
        title: '添加电影',
        closed: true,
    });
}

//增加事件函数
function hot_show_addEvent() {

    //筛选

    //获取表格中当前页的所有数据
    let hot_show_tabNum = $('#hot_show_tab').datagrid("getRows");
    //获取弹窗中当前页的所有数据
    let hot_show_propTabNum = $("#hot_show_proptab").datagrid("getRows");
    //定义一个空数组来接收弹窗中要删除的数据
    let hot_show_newAry = [];
    let i, j;
    for (i = 0; i < hot_show_tabNum.length; i++) {

        for (j = 0; j < hot_show_propTabNum.length; j++) {
            //如果表格中的数据和弹窗中数据的电影名相同，则删除弹窗中的数据
            if (hot_show_tabNum[i].hotShowName == hot_show_propTabNum[j].hotShowName) {
                //把要删除的数据添加在数组里面
                hot_show_newAry.push(hot_show_propTabNum[j]._id);

                //删除单条相同数据
                $.post('/hotShow/delSameInfo', { _id: hot_show_propTabNum[j]._id }, (data) => {
                    $('#hot_show_proptab').datagrid('reload');
                })
                //删除多条相同数据
                let ids = hot_show_newAry;

                $.post('/hotShow/delSameInfo', { ids }, (data) => {
                    $('#hot_show_proptab').datagrid('reload');
                })
            }
        }
    }
    hot_show_openProp();
    $("#hot_show_cancelBtn").click(function () {
        hot_show_closeProp();
    })
}


//增加数据的函数
function hot_show_addBtnEvent() {
    let hotShowSels = $("#hot_show_proptab").datagrid("getSelections");
    console.log(hotShowSels)
    let hot_show_param = {
        submitType: "addMore",
        data: JSON.stringify(hotShowSels),
    }
    $.post("/hotShow/hot_show_addNum", hot_show_param, function (data) {
        $('#hot_show_tab').datagrid('reload');
    });
    hot_show_delSameAlredy();
    hot_show_closeProp();
}

//增加数据到表格，然后删除已添加的数据

function hot_show_delSameAlredy() {
    let hotShowDelPropEvent = $('#hot_show_proptab').datagrid("getSelections");
    if ($('#hot_show_proptab').datagrid("getSelected")) {
        //删除单条数据
        $.post('/hotShow/delAlreadyInfo', { _id: $('#hot_show_proptab').datagrid("getSelected")._id, }, (data) => {
            $('#hot_show_proptab').datagrid('reload');
        })

        //删除多条数据
        let AlreadyTest = function (obj) {
            return obj._id;
        }
        let ids = $("#hot_show_proptab").datagrid("getSelections").map(AlreadyTest);
        $.post('/hotShow/delAlreadyInfo', { ids }, function (data) {
            $("#hot_show_proptab").datagrid('reload');
        })
    }
}


//删除事件函数
function hot_show_removeEvent() {
    let hotShowDelEvent = $('#hot_show_tab').datagrid("getSelections");
    if ($('#hot_show_tab').datagrid("getSelected")) {
        $.messager.confirm('确认', '您确定删除数据？', function (r) {
            if (r) {

                //删除单条数据
                $.post('/hotShow/delInfo', { _id: $('#hot_show_tab').datagrid("getSelected")._id, }, (data) => {
                    $('#hot_show_tab').datagrid('reload');
                })

                //删除多条数据
                let test = function (obj) {
                    return obj._id;
                    // console.log(ids);
                }
                let ids = $("#hot_show_tab").datagrid("getSelections").map(test);

                console.log(ids);
                $.post('/hotShow/delInfo', { ids }, function (data) {
                    $("#hot_show_tab").datagrid('reload');
                })
            }
        })
    }
}

//搜索功能
function hotShowSearchEvent() {
    $('#hot_show_searchEven').searchbox({
        searcher: function (value, name) {
            $('#hot_show_tab').datagrid({
                queryParams: {
                    [name]: value
                }
            })
            $('#hot_show_tab').datagrid('reload');
        },
    });
}


//刷新功能
function hotShowNewEvent() {
    //清空ajax查询
    $('#hot_show_tab').datagrid({ queryParams: {} })
    $('#hot_show_tab').datagrid('load')

    //清空文本框
    $('#hotShowNum').val('');
    $('#hotShowType').val('');
    $('#hotShowArea').val('');
}

export default init;


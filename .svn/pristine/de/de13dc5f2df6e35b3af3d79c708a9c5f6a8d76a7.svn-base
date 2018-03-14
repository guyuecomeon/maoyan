
// 初始化函数库
function init() {
    build();
    actives();
    clickEvt();
}
//点击事件函数库
function clickEvt() {
    $('#addMovieBtn').on('click', openAddMovie)
    $('#delMovieBtn').on('click', delMovie)
    $('#refresh').on('click', refreshBtn)
}
// 创建初始化表格
function build() {
    $('#matchTable').datagrid({
        url: '/cinemaMatch/findMovie',
        columns: [[
            { field: '', title: '', checkbox: true },
            { field: 'moviename', title: '电影名称', width: 400 },
            { field: 'movieenglish', title: '英文名', width: 400 },
            { field: 'movietype', title: '电影类型', width: 400 },
        ]],
        // 只显示已经排片的电影
        queryParams:{
            isAdd:'1'
        },
        // 一级表格折叠列表-影城
        view: detailview,
        detailFormatter: function (index, row) {
            return `<div style="padding:2px"><table id="childTable"></table></div>`
        },
        onExpandRow: function (index, row) {
            var childTable = $(this).datagrid('getRowDetail', index).find('table#childTable')
            childTable.datagrid({
                url: '/cinemaMatch/getCinema',
                method: 'post',
                columns: [[
                    { field: '', title: '', checkbox: true },
                    { field: 'yardName', title: '影城名称', width: 400 },
                ]],
                queryParams:{
                    isAdd:"1"
                },
                // 二级表格折叠列表-放映厅
                view: detailview,
                detailFormatter: function (index, row) {
                    return `<div style="padding:2px"><table id="hallTable"></table></div>`
                },
                onExpandRow: function (index, row) {
                    var hallTable = $(this).datagrid('getRowDetail', index).find('table#hallTable')
                    hallTable.datagrid({
                        url: '/cinemaMatch/getHall',
                        method: 'post',
                        columns: [[
                            { field: 'hallName', title: '放映厅名称', width: 140 },
                            { field: 'hallTime', title: '时间', width: 140 },
                            { field: 'hallPrice', title: '票价', width: 140 },
                        ]],
                        queryParams:{
                          isAdd:"1"  
                        },
                        striped: true,
                        width: 'auto',
                        height: 'auto',
                        pagination: true,
                        rownumbers: true,
                        pageSize: 5,
                        pageList: [5, 10, 15],
                    });
                    $('#hallTable').datagrid('fixDetailRowHeight', index)
                    $('#hallTable').datagrid('fixRowHeight', index)
                },
                striped: true,
                width: 'auto',
                height: 'auto',
                pagination: true,
                rownumbers: true,
                pageSize: 5,
                pageList: [5, 10, 15],
                toolbar: [{
                    text: '增加院线',
                    iconCls: 'icon-add',
                    handler: addCinemaBtn
                }, '-', {
                    text: '移除院线',
                    iconCls: 'icon-remove',
                    handler: delCinema
                }, '-', {
                    text: '增加放映厅',
                    iconCls: 'icon-add',
                    handler: addHallBtn
                }, '-', {
                    text: '移除放映厅',
                    iconCls: 'icon-remove',
                    handler: delHallBtn
                }],
            });
            $('#matchTable').datagrid('fixDetailRowHeight', index)
            $('#matchTable').datagrid('fixRowHeight', index);
        },
        striped: true,
        width: 1000,
        height: 500,
        fitColumns: true,
        remoteSort: false,
        nowrap: false,
        fitColumns: true,
        pagination: true,
        rownumbers: true,
        pageSize: 5,
        pageList: [5, 10],
    });
}
// 工具栏
function actives() {
    $('#matchTable').datagrid({
        toolbar: '#tools'
    });
    // 搜索框
    $('#ss').searchbox({
        searcher: function (value, name) {
            switch (name) {
                case 'movieName':
                    $('#matchTable').datagrid({
                        queryParams: {
                            moviename: value
                        }
                    });
                    break;
                case 'movieEname':
                    $('#matchTable').datagrid({
                        queryParams: {
                            movieenglish: value
                        }
                    });
                    break;
            }
        },
        menu: '#mm',
        prompt: '请输入电影名'
    });
    // 搜索框toolbar
}
// 工具栏增加电影按钮
function openAddMovie() {
    $('#addMovie').dialog({
        title: '增加影片',
        width: 400,
        buttons: [{
            text: '保存',
            handler: addSuc
        }, {
            text: '关闭',
            handler: function () {
                $('#addMovie').window('close')
            }
        }]

    });
    addMovieTable();
}
// 增加电影datagrid
function addMovieTable() {
    $('#addMovieTable').datagrid({
        url: '/cinemaMatch/addMovie',
        width: 380,
        height: 300,
        pagination: true,
        rownumbers: true,
        pageSize: 5,
        pageList: [5, 10],
        columns: [[
            { field: '', title: '', checkbox: true },
            { field: 'moviename', title: '电影名称', width: 100 },
            { field: 'movieenglish', title: '英文名', width: 100 },
            { field: 'movietype', title: '电影类型', width: 100 },
        ]],
        queryParams:{
            isAdd:'0'
        }
    })

}
// 刷新按钮
function refreshBtn() {
    $('#matchTable').datagrid({
        queryParams:{}
    })
    $('#ss').searchbox('clear', 'none');    
}
// 增加确认按钮
function addSuc() {
    let param;
    if ($('#addMovieTable').datagrid('getSelections').length != 1) {
        param = $("#addMovieTable").datagrid('getSelections')
        $.post('/cinemaMatch/addMovietoAll', { ids: param }, function (data) {
            console.log(data)
        })
    } else {
        param = $('#addMovieTable').datagrid('getSelected')
        $.post('/cinemaMatch/addMovieto', param, function (data) {
            console.log(data)
        })
    }
    console.log(param)
    $('#addMovie').window('close')

    $('#matchTable').datagrid('reload')
}
// 移除电影
function delMovie() {
    let ids;
    if ($('#matchTable').datagrid('getSelections').length > 1) {
        ids = $("#matchTable").datagrid('getSelections').map((obj) => { return obj._id })
        $.post('/cinemaMatch/delMovie', { ids }, function (data) {
        })
    } else {
        ids = $('#matchTable').datagrid('getSelected')._id;
        $.post('/cinemaMatch/delMovie', { _id: ids }, function (data) {
        })
    }
    $('#matchTable').datagrid('reload');
}
//增加院线dialog
function addCinemaBtn() {
    $('#addCinemaDia').dialog({
        title: '当前没有排此片的影院如下',
        width: 400,
        buttons: [{
            text: '确认添加',
            handler: addCinemaBtnConfirm
        }, {
            text: '取消',
            handler: function () {
                $('#addCinemaDia').window('close')
            }
        }]
    });
    addCinemaData();
}
//增加院线datagrid
function addCinemaData() {
    $('#addCinemaTa').datagrid({
        url: '/cinemaMatch/getCinema',
        width: 380,
        height: 300,
        pagination: true,
        rownumbers: true,
        pageSize: 5,
        pageList: [5, 10],
        columns: [[
            { field: 'yardName', title: '影城名称', width: 380 },
        ]],
        queryParams:{
            isAdd:"0"
        },
    })
}
// 增加影城确认添加按钮
function addCinemaBtnConfirm(){
    let param=$('#addCinemaTa').datagrid('getSelected')
    $.post('/cinemaMatch/addCinema',param,function(data){
        console.log(data)
    })
    $('#childTable').datagrid("reload")
    $('#addCinemaDia').window("close")
}
// 移除院线
function delCinema() {
    let ids;
    if ($('#childTable').datagrid('getSelections').length > 1) {
        ids = $("#childTable").datagrid('getSelections').map((obj) => { return obj._id })
        $.post('/cinemaMatch/delCinema', { ids }, function (data) {
        })
    } else {
        ids = $('#childTable').datagrid('getSelected')._id;
        $.post('/cinemaMatch/delCinema', { _id: ids }, function (data) {
        })
    }
    $('#childTable').datagrid('reload');

}
// 增加放映厅窗口
function addHallBtn() {
    $('#addHallDia').dialog({
        title: '当前影院所有播放影厅',
        width: 400,
        buttons: [{
            text: '确认添加',
            handler: addHallBtnConfirm
        }, {
            text: '取消',
            handler: function () {
                $('#addHallDia').window('close')
            }
        }]
    });
    addHallTa();
}
//增加放映厅datagrid
function addHallTa() {
    $('#addHallTa').datagrid({
        url: '/cinemaMatch/getHall',
        width: 380,
        height: 400,
        pagination: true,
        rownumbers: true,
        pageSize: 5,
        pageList: [5, 10],
        columns: [[
            { field: 'hallName', title: '放映厅名称', width: 140 },
            { field: 'hallTime', title: '时间', width: 140 },
            { field: 'hallPrice', title: '票价', width: 140 },
        ]],
        queryParams:{
            isAdd:"0"
        }
    })
}
//增加放映厅确认按钮
function addHallBtnConfirm(){
    let param=$('#addHallTa').datagrid('getSelected')
    $.post('/cinemaMatch/addHall',param,function(data){
        console.log(data)
    })
    $('#hallTable').datagrid("reload")
    $('#addHallDia').window("close")
}
//移除放映厅确认按钮
function delHallBtn(){
    let param=$('#hallTable').datagrid('getSelected')
    $.post('/cinemaMatch/delHall',param,function(data){
        console.log(data)
    })
    $('#hallTable').datagrid("reload")
}
export default init;
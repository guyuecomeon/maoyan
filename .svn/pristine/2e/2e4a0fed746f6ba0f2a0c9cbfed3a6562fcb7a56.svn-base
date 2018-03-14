// init();
function init() {
    reflect_startNum();
    reflect_toolbar();
    reflect_event();
    reflect_propNum();
    reflect_NewEvent();
    reflectSearchbox();
}

//工具栏——搜索
function reflect_toolbar() {
    $('#reflect_searchEven').searchbox({
        searcher: function (value, name) {
        },
        menu: '#reflectList',
    });
}
//初始化事件
function reflect_event() {
    $("#reflect_addEventBtn").on("click", reflect_addEvent);
    $("#reflect_removeBtn").on("click", reflect_removeEvent);
    $("#reflectNew").on("click", reflect_NewEvent);
    $("#reflect_addBtn").on("click", reflect_addBtnEvent);
}

//初始化数据
function reflect_startNum() {
    $('#reflect_tab').datagrid({
        url: '/reflect/getStartInfo',
        pagination: true,
        rownumbers: true,
        striped: true,
        method: 'post',
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
function reflect_propNum() {
    $('#reflect_proptab').datagrid({
        url: '/reflect/getAllMovie',
        pagination: true,
        rownumbers: true,
        striped: true,
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
function reflect_openProp() {
    $('#reflect_propdiv').dialog({
        title: '添加电影',
        width: 1200,
        height: 400,
        closed: false,
    });
}


//关闭弹窗
function reflect_closeProp() {
    $('#reflect_propdiv').dialog({
        title: '添加电影',
        closed: true,
    });
}

 //筛选
 function reflect_screen() {
    //获取表格中当前页的所有数据
    let reflect_tabNum = $('#reflect_tab').datagrid("getRows");
    // console.log(reflect_tabNum);
    //获取弹窗中当前页的所有数据
    let reflect_propTabNum = $("#reflect_proptab").datagrid("getRows");
    //定义一个空数组来接收弹窗中要删除的数据
    let reflect_newAry = [];
    let i, j;
    for (i = 0; i < reflect_tabNum.length; i++) {

        for (j = 0; j < reflect_propTabNum.length; j++) {
            //如果表格中的数据和弹窗中数据的电影名相同，则删除弹窗中的数据
            if (reflect_tabNum[i].hotShowName == reflect_propTabNum[j].hotShowName) {
                //把要删除的数据添加在数组里面
                reflect_newAry.push(reflect_propTabNum[j]._id);

                //删除单条相同数据
                $.post('/reflect/delSameInfo', { _id: reflect_propTabNum[j]._id }, (data) => {
                    $('#reflect_proptab').datagrid('reload');
                })
                //删除多条相同数据
                let ids = reflect_newAry;

                $.post('/reflect/delSameInfo', { ids }, (data) => {
                    $('#reflect_proptab').datagrid('reload');
                })
            }
        }
    }
}


//增加事件函数
function reflect_addEvent() {
    reflect_screen();
    reflect_openProp();

    $("#reflect_cancelBtn").click(function () {
        reflect_closeProp();
    })
}


//增加数据的函数
function reflect_addBtnEvent() {
    let reflectSels = $("#reflect_proptab").datagrid("getSelections");
    // console.log(hotMovieSels);
    let reflect_param = {
        submitType: "addMore",
        data: JSON.stringify(reflectSels),
    }
    $.post("/reflect/reflect_addNum", reflect_param, function (data) {
        $('#reflect_tab').datagrid('reload');
    });
    reflect_closeProp();
}

//增加数据到表格，然后删除已添加的数据

function reflect_delSameAlredy() {
    let reflectDelPropEvent = $('#reflect_proptab').datagrid("getSelections");
    if ($('#reflect_proptab').datagrid("getSelected")) {
        //删除单条数据
        $.post('/reflect/delAlreadyInfo', { _id: $('#reflect_proptab').datagrid("getSelected")._id, }, (data) => {
            $('#reflect_proptab').datagrid('reload');
        })

        //删除多条数据
        let AlreadyTest = function (obj) {
            return obj._id;
        }
        let ids = $("#reflect_proptab").datagrid("getSelections").map(AlreadyTest);
        $.post('/reflect/delAlreadyInfo', { ids }, function (data) {
            $("#reflect_proptab").datagrid('reload');
        })
    }
}
//删除事件函数
function reflect_removeEvent() {
    let reflectDelEvent = $('#reflect_tab').datagrid("getSelections");
    $.messager.confirm('确认', '您确定删除数据？', function (r) {
        if (r) {

            //删除单条数据
            $.post('/reflect/delInfo', { _id: $('#reflect_tab').datagrid("getSelected")._id, }, (data) => {
                $('#reflect_tab').datagrid('reload');
            })

            //删除多条数据
            let test = function (obj) {
                return obj._id;
                // console.log(ids);
            }
            let ids = $("#reflect_tab").datagrid("getSelections").map(test);

            console.log(ids);
            $.post('/reflect/delInfo', { ids }, function (data) {
                $("#reflect_tab").datagrid('reload');
            })
        }
    })
}

function reflectSearchbox() {
    $('#reflect_searchEven').searchbox({
        searcher: function (value, name) {
            $('#reflect_tab').datagrid({
                queryParams: {
                    [name]: value
                }
            })
            $('#reflect_tab').datagrid('reload');
        },
    });
}


//刷新功能
function reflect_NewEvent() {
    //清空ajax查询
    $('#reflect_tab').datagrid({ queryParams: {} })
    $('#reflect_tab').datagrid('load')

    //清空文本框  
    $("#reflect_searchEven").val('');
    $('#reflect_tab').datagrid('load')
}

export default init;

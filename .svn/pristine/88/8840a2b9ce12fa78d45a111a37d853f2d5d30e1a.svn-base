//先定义一个函数用于把后面数据库要显示的东西都放置在这个空白table里面


function init() {
    var myTable = $('#myTable');
    initDataGrid(); //初始化表格
    initToolBar();  //初始化表格工具栏
    initEvt();
}

//初始化所有事件
function initEvt() {
    //点击增加事件后取消按钮弹出框自动隐藏
    $('#add_board_btn').on('click', addData);
    $('#add_board_cancel').click(function(){
        $('#dd').window("close")
    })
    //点击修改事件后取消按钮弹出框自动隐藏
    $('#edit_board_btn').on('click', addData);

    $('#edit_board_cancel').on('click', () => {
        $('#xiugai').window("close")
    })
    $("#edit_board_btn2").click(edit_board_btn2_data)

    //点击查询事件后取消按钮弹出框自动隐藏
    $('#find_board_btn').on('click', addData);

    $('#find_board_cancel3').on('click', () => {
        $('#chaxun').window("close")
    })

}

//初始化表格
function initDataGrid() {
    $('#myTable').datagrid({
        url: '/user_cc/getUser',
        //（ '/user_cc/getUser'，其中user_cc是需要监听到路由名字必须要和后面的路由一致）
        method: 'get',
        columns: [[
            { field: 'acc', title: '账号', width: 100 },
            { field: 'pwd', title: '密码', width: 100 },
            { field: 'email', title: '邮箱', width: 100 },
            { field: 'phone', title: '手机', width: 100 },
        ]],
        pagination: true,
        rownumbers: true,
        striped: true,
        pageSize: 3,
        pageList: [3, 5,10]
    })
}


//增加几个按钮 用来操作 增，删，改
function initToolBar() {
    $('#myTable').datagrid({
        toolbar: [{
            iconCls: 'icon-add',
            text: '新增用户',
            handler: openAddBoard
        }, '-', {
            iconCls: 'icon-edit',
            text: '修改信息',
            handler: updateData
        }, '-', {
            iconCls: 'icon-remove',
            text: '删除用户',
            handler: removeData
        }, '-', {
            iconCls: 'icon-search',
            text: '查询信息',
            handler: searchData
        }]
    })
}



//增加（只是切换到增加的页面）
function openAddBoard() {
    // $('#add_board').css('display', 'block');
    $('#dd').dialog({
        title: '增加用户',
        width: 260,
        height: 200,
        closed: false,
        cache: false,
        modal: true
    });
}
//发送请求 真正的添加数据
function addData() {
    let param = {
        acc: $('#acc').val(),
        pwd: $('#pwd').val(),
        phone: $('#phone').val(),
        email: $('#email').val()
    }

    $.post('/user_cc/addUser', param, (data) => {
        $('#myTable').datagrid('reload'); //重新刷新当前页面数据
    })
}


//修改
function updateData() {
    if ($('#myTable').datagrid('getSelected')) {
        $('#xiugai').dialog({
            title: '修改用户',
            width: 260,
            height: 200,
            closed: false,
            cache: false,
            modal: true
        });
        let user = $("#myTable").datagrid("getSelected");

        $('#acc2').val(user.acc);
        $('#pwd2').val(user.pwd);
        $('#phone2').val(user.phone);
        $('#email2').val(user.email);
    }


}
//发送请求 真正的修改数据

function edit_board_btn2_data() {
    let id = $('#myTable').datagrid('getSelected')._id;
    let param = {
        _id: id,
        acc: $('#acc2').val(),
        pwd: $('#pwd2').val(),
        phone: $('#phone2').val(),
        email: $('#email2').val()
    }
    $.post('/user_cc/update', param, (data) => {
        myTable.datagrid('reload');
    })
}

//删除
function removeData() {
    if ($('#myTable').datagrid('getSelected')) {
        $.messager.confirm('删除', '您是否想要删除用户数据？', function (r) {
            if (r) {
                //单个删除
                $.post('/user_cc/removeUser', { _id: $('#myTable').datagrid('getSelected')._id }, (data) => {
                    $('#myTable').datagrid('reload');
                })
            }
        });

    }
}


//查询
function searchData() {
    $('#chaxun').dialog({
        url: '/user_cc/getUser',
        title: '查询',
        width: 260,
        height: 200,
        closed: false,
        cache: false,
        modal: true
    });
    $("#find_board_btn3").click(function () {
        $('#myTable').datagrid({
            queryParams: {
                acc: $("#acc3").val(),
                pwd: $("#pwd3").val(),
                phone: $("#phone3").val(),
                email: $("#email3").val()

            }
        })
        $('#myTable').datagrid("load");
        $('#chaxun').dialog({
            closed: true
        });
    })
    $('#myTable').datagrid({ queryParams: {} });
    $('#myTable').datagrid("load");
    $('#chaxuan').dialog({
        closed: true
    });
    let param = {
        acc: $('#acc3').val(),
        pwd: $('#pwd3').val(),
        phone: $('#phone3').val(),
        email: $('#email3').val()
    }
    $.post('/user_cc/searchData', param, (data) => {
        $('#myTable').datagrid('reload');
    })
}
export default init;
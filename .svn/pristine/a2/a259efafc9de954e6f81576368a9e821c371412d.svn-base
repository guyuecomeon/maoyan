
// 初始化事件
invt();
function invt() {
    messageTabData();//初始化表格
    messageToolbarData();//初始化工具栏
    $("#message_btn").on('click', message_upimg);//初始化上传点击事件
    $("#message_pic_write_btn").on('click', message_pic_write);//初始化文图点击事件
    $("#message_newAdd_btn").on('click', message_newAdd_comments);//初始化评论点击事件
    $("#message_pic_write_btn_1").on('click', message_pic_write_1);//初始化修改文图点击事件
    $("#message_newUpdate_btn").on('click', message_newUpdate_comments);//初始化评论点击事件

}

//刷新表格数据
function messageTabData() {
    $('#message_mytab').datagrid({
        url: '/message/movieInfo',
        method: 'post',
        //斑马线
        striped: true,
        //显示一个行号列
        rownumbers: true,
        //显示分页
        pagination: true,
        pageSize: 8,
        pageList: [8, 10, 12],
        columns: [[
            { checkbox: 'true', field: 'checkbox', title: '复选框' },
            { field: 'movie_name', title: '标题', width: 200, align: 'center' },
            { field: 'up_time', title: '发稿时间', width: 200, align: 'center' },
            { field: 'rel_pictrue', title: '配图', width: 400, align: 'center' },
            { field: 'rel_text', title: '文段', width: 200, align: 'center' },
            { field: 'rel_comments', title: '评论', width: 200, align: 'center' }
        ]],

    });
}
//初始化工具栏事件函数
function messageToolbarData() {
    $('#btn_1').on('click', openAddDialog);
    $('#btn_2').on('click', removeData);
    $('#btn_3').on('click', openEditDialog);
    $('#message_ss').searchbox({
        searcher: message_findData,
        menu: '#message_mm'
    });
    $('#btn_4').on('click', refreshData);

}

// -------------------------------------------------------------------------------------
//弹出增加对话框
function openAddDialog() {
    $('#message_add_btn').dialog({
        title: '添加咨询信息',
        width: 400,
        height: 300,
        closed: false,
        cache: false,
        modal: true,
        buttons: [{
            text: '保存',
            handler: addsome
        }, {
            text: '关闭',
            handler: function () {
                $("#message_add_btn").dialog({ closed: true })
            }
        }]
    });
}

//获取图片路径的数据然后发送给后台
function message_upimg() {
    $.ajaxFileUpload({
        url: "/message/upFile",
        fileElementId: "message_up_file",
        dataType: "string",//如果发送回来的为数组对象，则将string改为json。
        success: function (data) {
            // console.log(data);

            $("#message_imgSrc").val(data);
            // console.log($("#message_imgSrc").val())
        }
    });
}

//---------------------------------------------------------------------
//添加咨询数据
function addsome() {
    let param = {
        movie_name: $('#message_movie_name').val(),
        up_time: $('#message_up_time').val(),
        rel_pictrue: $('#message_imgSrc').val(),
        rel_text: $('#message_rel_text').val(),
        rel_comments: $('#message_rel_comments').val()
    }
    // console.log($('#message_imgSrc').val())
    $.post('/message/message_addData', param, function (data) {
        // alert(data)
        console.log(data);
        $("#message_mytab").datagrid('reload');
    })
    $("#message_add_btn").dialog({ closed: true })

}
//增加文图显示
function message_pic_write() {
    $('#border').css("display", "block");
}
//增加评论显示
function message_newAdd_comments() {
    // alert(2);
    $('#box').css("display", "block");
}

// --------------------------------------------------------------------------------
//删除咨讯信息
function removeData() {
    $.messager.confirm('确认', '您确认想要删除该条咨询吗？', function (r) {
        if (r) {
            let param = $("#message_mytab").datagrid('getSelected')._id;
            // console.log(param);
            $.post('/message/message_remove_one', { _id: param }, function () {
                $("#message_mytab").datagrid('reload');
            })
            //批量删除
            let ids = $("#message_mytab").datagrid('getSelections').map((obj) => { return obj._id })
            $.post('/message/message_remove_one', { ids }, function () {
                $("#message_mytab").datagrid('reload');

            })
        }
    });


}

// --------------------------------------------------------------------------------------

//弹出修改对话框
function openEditDialog() {
    $('#message_update_btn').dialog({
        title: '修改咨询信息',
        width: 400,
        height: 300,
        closed: false,
        cache: false,
        modal: true,
        buttons: [{
            text: '确认修改',
            handler: updatesome
        }, {
            text: '关闭',
            handler: function () {
                $("#message_update_btn").dialog({ closed: true })
            }
        }]
    });

    //获取图片路径的数据然后发送给后台
    $("#message_btn_1").on('click', message_upimg_1)
    function message_upimg_1() {
        // alert(2);
        $.ajaxFileUpload({
            url: "/message/upFile",
            fileElementId: "message_up_file_1",
            dataType: "string",//如果发送回来的为数组对象，则将string改为json。
            success: function (data) {
                // console.log(data);

                $("#message_imgSrc_1").val(data);
                // console.log($("#message_imgSrc").val())
            }
        });
    }

    //获取要修改的值到对话框中
    let editshow = $("#message_mytab").datagrid('getSelected');
    // console.log(editshow);
    $('#message_movie_name_1').val(editshow.movie_name);
    $('#message_up_time_1').val(editshow.up_time);
    $('#message_imgSrc_1').val(editshow.rel_pictrue);
    $('#message_rel_text_1').val(editshow.rel_text);
    $('#message_rel_comments_1').val(editshow.rel_comments);


}

//修改文图显示
function message_pic_write_1() {
    $('#border_1').css("display", "block");
}
//修改评论显示
function message_newUpdate_comments() {
    // alert(2);
    $('#box_1').css("display", "block");
}

//修改咨询数据
function updatesome() {
    let param = {
        _id: $("#message_mytab").datagrid('getSelected')._id,
        movie_name: $('#message_movie_name_1').val(),
        up_time: $('#message_up_time_1').val(),
        rel_pictrue: $('#message_imgSrc_1').val(),
        rel_text: $('#message_rel_text_1').val(),

        rel_comments: $('#message_rel_comments_1').val(),

    }

    $.post('/message/message_edit', param, function () {
        $("#message_mytab").datagrid('reload');
    })
    $("#message_update_btn").dialog({ closed: true })


}

//---------------------------------------------------------------------
//搜索功能
function message_findData(value, name) {
    console.log(232323)
    switch (name) {
        case 'all':
            $('#message_mytab').datagrid({
                queryParams: {
                    movie_name: value,
                }
            })
            break;
        case 'time':
            $('#message_mytab').datagrid({
                queryParams: {
                    up_time: value,
                }
            })
            break;
    }
    $("#message_mytab").datagrid('load');


}
//-------------------------------------------------------------------
//刷新功能
function refreshData() {
    $("#_easyui_textbox_input1").val('')
    $("#message_mytab").datagrid({
        queryParams: {}
    })
    $("#message_mytab").datagrid('load');
    switch (name) {
        case 'all':
            $('#message_mytab').datagrid({
                queryParams: {
                    movie_name: ''
                }
            })
            break;
        case 'time':
            $('#message_mytab').datagrid({
                queryParams: {
                    up_time: ''
                }
            })
            break;
    }
}

export default invt;





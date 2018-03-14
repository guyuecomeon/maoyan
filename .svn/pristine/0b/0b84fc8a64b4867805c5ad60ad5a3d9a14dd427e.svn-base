let tables;
function cinema() {
    $('#dg').datagrid({
        url: '/cinema/getCinema',
        striped: true,
        pagination: true,
        pageSize: 15,
        pageList: [15, 15],
        fitColumns: true,
        singleSelect: true,
        toolbar: [{
            iconCls: 'icon-add',
            text: "增加",
            handler: function () {
                $('#addRess').val('')
                $('#addPhone').val('')
                $('#addWebsite').val('')
                $('#addWebsite').val('')
                $('#addmovebox').val('')
                $('#dd').dialog({
                    title: '增加影院厅',
                    width: 600,
                    height: 600,
                    modal: true,
                    shadow: true,
                    buttons: [{
                        text: '保存',
                        handler: newmovebtn
                    }, {
                        text: '关闭',
                        handler: nullss
                    }]
                });
            }
        }, '-', {
            iconCls: 'icon-remove',
            text: "删除",
            handler: function () {
                $.messager.confirm('确认', '您确认想要删除数据吗？', function (r) {
                    if (r) {
                        $.post('/cinema/delmove', { _id: $('#dg').datagrid('getSelected')._id }, function (data) {
                            $('#dg').datagrid('reload');
                        })
                        $.post('/cinema/delSeatMove', seatAry, function (data) {
                            $('#dg').datagrid('reload');
                        })
                    }
                });
            }
        },
        {
            iconCls: 'icon-edit',
            text: "修改",
            handler: change
        }],
        columns: [[
            { field: 'yardName', title: '影院名称', width: 250 },
            { field: 'address', title: '地址', width: 250 },
            { field: 'phone', title: '电话', width: 250 },
            { field: 'website', title: '网址', width: 250 }
        ]],
    });
    //修改院线
    function change() {
        $('#s').dialog({
            title: '修改电影',
            width: 600,
            buttons: [{
                text: '保存',
                handler: changeformbtn
            }, {
                text: '关闭',
                handler: changenull
            }],
            height: 600,
        });
        $('#editYardName').val($('#dg').datagrid('getSelected').yardName)
        $('#editRess').val($('#dg').datagrid('getSelected').address)
        $('#editPhone').val($('#dg').datagrid('getSelected').phone)
        $('#editWebsite').val($('#dg').datagrid('getSelected').website)
        // $.post('/cinema/addSeatMove', function (data) {
        //    console.log(data)
        // });


        
      
    }
    //修改确定按钮
    function changeformbtn() {
        let changeParam = {
            _id: $('#dg').datagrid('getSelected')._id,
            yardName: $('#editYardName').val(),
            address: $('#editRess').val(),
            phone: $('#editPhone').val(),
            website: $('#editWebsite').val(),
        };
        $.post('/cinema/changemove', changeParam, function (data) {
            $('#dg').datagrid('reload');
            $('#s').window('close');
        });
    }
    //修改关闭按钮
    function changenull() {
        $('#s').window('close');
    }

    let seatNum, seatRow, seatList,chooseSeatId=0;
    //设置放映厅大小
    $("#seatSure").click(function () {
        chooseSeatId++;
        let str = $("#chooseSeat").html()+`<table id='chooseSeatId${chooseSeatId}' border=1>`;
        for (let i = 1; i <= 10; i++) {
            str += "<tr>";
            for (let j = 1; j <= 10; j++) {
                str += `<td data-id=tdId${chooseSeatId} data-name=1 style="width:20px;height:20px;cursor: pointer;background-color:#5A676E;">&nbsp;&nbsp</td>`
            }
            str += "</tr>"

        }
        str+='</table>';
        str+=`<p><input style="margin-left:28px" type="text" id="addmovebox${chooseSeatId}" name="addmovebox" value="请输入影厅名"> </p>`;
        $("#chooseSeat").html(str);
        //再次添加座位

    })
    //选座
    $("#chooseSeat").delegate("td", 'click', function (e) {
        $(e.target).attr('data-name',parseInt($(e.target).attr('data-name'))+1)
        let dataName=$(e.target).attr('data-name');
        
        console.log(dataName);
        if(dataName%2==1){
            console.log('asas')
            $(e.target).css('backgroundColor','#5A676E')
        }else{
            $(e.target).css('backgroundColor','')
        }
    })
    //增加按钮
    function newmovebtn() {
        let seatAry = [] ,seatArr=[],moveSeat=0,addMove=0,seatMove={},addSeatMove=[];
        let seatTd=$('#chooseSeat td');
        for(let i=0;i<seatTd.length;i++){
            if($(seatTd[i]).attr('data-name')==1){
                seatArr.push(1);
            }else{
                seatArr.push(0);
            }
            if((i-99)%100==0&&i!=0){
                addMove++;
                seatAry[moveSeat]=seatArr;
                seatMove={
                    yardName:$('#addYardName').val(),
                    hallName:$(`#addmovebox${addMove}`).val(),
                    seatArr
                }
                addSeatMove.push(seatMove);
                moveSeat++;
                seatArr=[];
            }
        }
        //增加影厅
       $.post('/cinema/addSeatMove',{addSeatMove},function (data) {
            })
        // console.log($(seatTd[100]).attr('data-id'));
        
        let prames = {
            yardName: $('#addYardName').val(),
            address: $('#addRess').val(),
            phone: $('#addPhone').val(),
            website: $('#addWebsite').val(),

        }
        $.post('/cinema/addmove', prames, function (data) {
            $('#dg').datagrid('reload');
        })
        $('#dd').window('close');
    }
    //查询
    $('#box2').searchbox({
        searcher: function (value, name) {
            if (name == "search_cinema") {
                $('#dg').datagrid({
                    queryParams: {
                        yardName: value
                    }
                });
                $('#box2').searchbox('clear');
            }
            else {
                $('#dg').datagrid({
                    queryParams: {
                        address: value
                    }
                });
                $('#box2').searchbox('setValue', '');
            }
        },
    });
    //取消按钮关闭增加电影页面
    function nullss() {
        $('#dg').datagrid('load');
        $('#dd').window('close');
    }

    //刷新按钮
    $("#nulls").click(function () {
        $('#dg').datagrid('load', {});
    })

}




export default cinema


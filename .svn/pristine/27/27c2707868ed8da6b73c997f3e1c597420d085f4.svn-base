//页面显示出来;
function movieinit() {
    let dg = $("#movie-dg");
    biaotou();
    function biaotou() {
        dg.datagrid({
            url: "/movie/gettb",
            method: "get",
            columns: [[
                { field: 'moviename', title: '电影名', width: 100 },
                { field: 'movieenglish', title: '英文名', width: 200 },
                { field: 'movietype', title: '类型', width: 100 },
                { field: 'moviescore', title: '分数', width: 100 },
                { field: 'movieactor', title: '演员', width: 300 },
                { field: 'movielook', title: '想看', width: 100 },
                { field: 'moviearea', title: '区域', width: 100 },
                { field: 'movieyear', title: '年代', width: 100 },
                { field: 'movietime', title: '影片时间', width: 100 },
                { field: 'movierelease', title: '上映时间', width: 130 },
                { field: 'moviedetail', title: '简介', width: 300 },
                { field: 'movieticket', title: '票房', width: 100 },
                { field: 'moviepicture', title: '图片', width: 200 },
            ]],
            pagination: true,
            rownumbers: true,
            striped: true,
            pageSize: 11,
            pageList: [11, 15, 17]
        })

    }

    //增加

    // addbtn();
    function movieaddbtn() {
        //显示的弹窗 
        $('#movie-add').dialog({
            title: '增加',
            width: 300,
            height: 250,
            closed: false,
            cache: false,
            modal: true
        });
        $("#movie-movieSubBtn").click(function () {
            $.ajaxFileUpload({
                url: "/movie/upFile",
                fileElementId: "movie-upload",
                dataType: "string",//如果发送回来的为数组对象，则将string改为json。
                success: function (data) {
                    console.log(data);

                    $("#ipt13").val(data);
                    // console.log($("#message_imgSrc").val())
                }
            });
        })
        //增加按钮
        $("#movie-add-suc").click(function () {
            let param = {
                'moviename': $("#ipt1").val(),
                'movieenglish': $("#ipt2").val(),
                'movietype': $("#ipt3").val(),
                'moviescore': $("#ipt4").val(),
                'movieactor': $("#ipt5").val(),
                'movielook': $("#ipt6").val(),
                'moviearea': $("#ipt7").val(),
                'movieyear': $("#ipt8").val(),
                'movietime': $("#ipt9").val(),
                'movierelease': $("#ipt10").val(),
                'moviedetail': $("#ipt11").val(),
                'movieticket': $("#ipt12").val(),
                'moviepicture': $("#ipt13").val(),
            }

            //ajax请求
            $.post("/movie/addbtn", param, function () {
                param="";
                $("#movie-dg").datagrid("reload");
                
                $('#movie-add').dialog({
                    closed: true,
                });

            })
            



        })
        //取消按钮
        $("#movie-add-rep").click(function () {
            $("#movie-dg").datagrid("reload");
            $('#movie-add').dialog({
                closed: true,
            });
        })
    }

    //编辑
    function editbtn() {
        let id = dg.datagrid("getSelected")._id;
        $('#movie-add').dialog({
            title: '修改',
            width: 500,
            height: 350,
            closed: false,
            cache: false,
            modal: true
        });//这是显示出来的弹窗
        let user = dg.datagrid("getSelected");
        $("#ipt1").val(user.moviename);
        $("#ipt2").val(user.movieenglish);
        $("#ipt3").val(user.movietype);
        $("#ipt4").val(user.moviescore);
        $("#ipt5").val(user.movieactor);
        $("#ipt6").val(user.movielook);
        $("#ipt7").val(user.moviearea);
        $("#ipt8").val(user.movieyear);
        $("#ipt9").val(user.movietime);
        $("#ipt10").val(user.movierelease);
        $("#ipt11").val(user.moviedetail);
        $("#ipt12").val(user.movieticket);
        $("#ipt13").val(user.moviepicture);
        $("#add-suc").html("确定修改");
        //修改里面的确定按钮
        $("#movie-add-suc").click(function () {
            let param = {
                _id: id,
                'moviename': $("#ipt1").val(),
                'movieenglish': $("#ipt2").val(),
                'movietype': $("#ipt3").val(),
                'moviescore': $("#ipt4").val(),
                'movieactor': $("#ipt5").val(),
                'movielook': $("#ipt6").val(),
                'moviearea': $("#ipt7").val(),
                'movieyear': $("#ipt8").val(),
                'movietime': $("#ipt9").val(),
                'movierelease': $("#ipt10").val(),
                'moviedetail': $("#ipt11").val(),
                'movieticket': $("#ipt12").val(),
                'moviepicture': $("#ipt13").val(),
            }
            $.post("/movie/removebtn", param, function () {

                $("#movie-dg").datagrid("reload");
                $('#movie-add').dialog({
                    closed: true,
                });
            });

        })
        //修改里面的取消按钮
        $("#movie-add-rep").click(function () {
            $('#movie-add').dialog({
                closed: true,
            });
        })
    }
    //删除
    function removebtn() {
        $.messager.confirm('确认', '您确认想要删除记录吗？', function (r) {
            if (r) {
                $.post("/movie/remove", { _id: dg.datagrid("getSelected")._id }, function (data) {
                    dg.datagrid("reload");
                })
                let ids = dg.datagrid('getSelections').map((obj) => { return obj._id })
                $.post('/movie/remove', { ids }, (data) => {
                    dg.datagrid('reload');
                })
            }
        });
    }
    //查询
    function findbtn() {
        $('#movie-div').dialog({
            url: "/movie/gettb",
            method: "get",
            title: '查询',
            // method: "get",            
            width: 300,
            height: 300,
            closed: false,
            cache: false,
            modal: true
        });
        $('#movie-ss').searchbox({
            searcher: function (value, name) {
                switch (name) {
                    case 'all':
                        $('#movie-dg').datagrid({
                            queryParams: {
                                moviename: value,
                            }
                        })
                        break;
                    case 'sports':
                        $('#movie-dg').datagrid({
                            queryParams: {
                                movietype: value,
                            }
                        })
                        break;
                    case "s1":
                        $("#movie-dg").datagrid({
                            queryParams: {
                                movieenglish: value,
                            }
                        })
                }
            },
            menu: '#movie-mm',
            prompt: '请输入值'
        });
    }


    //刷新
    function seacherbtn() {
        dg.datagrid({
            queryParams: {}
        })
        dg.datagrid('load');
    }
    // function button(){
    dg.datagrid({
        toolbar: [{
            iconCls: "icon-add",
            text: "增加电影",
            handler: movieaddbtn
        }, "-", {
            iconCls: "icon-edit",
            text: "编辑电影",
            handler: editbtn
        }, "-", {
            iconCls: "icon-remove",
            text: "删除",
            handler: removebtn
        }, "-", {
            iconCls: "icon-search",
            text: "查询",
            handler: findbtn
        }, "-", {
            iconCls: "icon-reload",
            text: "刷新",
            handler: seacherbtn
        }

        ]
    })
}
movieinit();
export default movieinit
        // }
        // button();
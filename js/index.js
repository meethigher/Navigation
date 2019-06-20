$(function (){
    $.ajax({
        url:"loading",
        type:"GET",
        async:false,
        success:function (result){
            $(".nt_box").html(result);
        }
    })
});
$(function (){
    let $search=$(".search");
    let $so=$("div.fa");
    let $ul=$(".search ul");
    let $lis=$(".search ul li");
    let $mask=$(".mask");
    let $btn=$(".search>a");
    let $input=$(".search>input");
    let $nt=$(".nt");
    let $btn_rotate=$(".btn");
    let $img=$(".content li img");
    let $content=$(".content");
    let initUrl="https://www.so.com/s?q=";
    let initBg='url("images/360.png")';
    let init={
        url:initUrl,
        bg:initBg,
        num:2500
    };
    let so=localStorage.getItem("so")||JSON.stringify(init);
    let j_so=JSON.parse(so);
    let loadOrNot=function (src){
        let img=new Image();
        img.src=src;
        $btn_rotate.addClass("rotate");
        img.onload=function (){
            $nt.css("backgroundImage", 'url('+src+')');
            $btn_rotate.removeClass("rotate");
        };
    };
    let randomJpg=function (){
        return Math.floor(Math.random()*4051);
    };
    /*0.加载默认搜索引擎和默认背景*/
    $so.data("so",j_so.url);
    $so.css("backgroundImage",j_so.bg);
    let src="https://wallpaper.infinitynewtab.com/wallpaper/"+j_so.num+".jpg";
    loadOrNot(src);
    /*1.点击小转盘刷新背景图片*/
    $btn_rotate.on("click",function (){
        j_so.num=randomJpg();
        let src="https://wallpaper.infinitynewtab.com/wallpaper/"+j_so.num+".jpg";
        loadOrNot(src);
        localStorage.setItem("so",JSON.stringify(j_so));
    });

    /*2.点击搜索引擎图标进行选择*/
    $lis.each(function (i,item){
        let picName=$(item).data("id")+".png";
        $(item).css("backgroundImage",'url("images/'+picName+'")');
    });
    $so.on("click",function (){
        $ul.fadeIn();
        $mask.fadeIn();
    });
    $lis.on("click",function (){
        let picName=$(this).data("id")+".png";
        $so.css("backgroundImage",'url("images/'+picName+'")');
        $so.data("so",$(this).data("so"));
        /*设置默认搜索引擎*/
        j_so.url=$(this).data("so");
        j_so.bg='url("images/'+picName+'")';
        localStorage.setItem("so",JSON.stringify(j_so));
        $ul.hide();
        $mask.hide();
    });
    /*3.点击搜索按钮*/
    $btn.on("click",function (){
        let string=$input.val();
        let url=$so.data("so")+string;
        $(this).attr("href",url);
    });
    $input.on("keydown",function (e){
        if(e.keyCode===13)
        {
            let string=$input.val();
            window.open($so.data("so")+string, "_blank");
        }
    });
    /*4.添加动态效果*/
    $search.addClass("animated").addClass("bounce");
    $search.on("animationend",function (){
       $search.removeClass("animated").removeClass("bounce");
    });
    $content.addClass("animated jello");
    $content.on("animationend",function (){
        $(this).removeClass("animated jello");
    });
    /*5.点击内容框图标修改内容搜索*/
    /*此处内容其实是重复代码*/
    $img.on("click",function (){
        let $this=$($(this).parent("li")[0]);
        let picName=$this.data("id")+".png";
        $so.css("backgroundImage",'url("images/'+picName+'")');
        $so.data("so",$this.data("so"));
        /*设置默认搜索引擎*/
        j_so.url=$this.data("so");
        j_so.bg='url("images/'+picName+'")';
        localStorage.setItem("so",JSON.stringify(j_so));
    });
    /*6.所有图片加载完毕后显示*/
    let i=0;
    $img.each(function (i,item){
        let img=new Image();
        img.src=$(item).attr("src");
        img.onload=function (){
            i++;
            if(i>7){
                $img.css("opacity",1);
            }
        }
    });

});
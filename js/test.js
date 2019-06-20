let $so=$("div.fa");
let initUrl="https://www.so.com/s?q=";
let initBg='url("images/360.png")';
let init={
    url:initUrl,
    bg:initBg
};
console.log(init);
let so=localStorage.getItem("so")||JSON.stringify(init);


let j_so=JSON.parse(so);
/*加载默认搜索引擎*/
$so.data("so",j_so.url);
$so.css("backgroundImage",j_so.bg);
/*设置默认搜索引擎*/
init.url=xxx;
init.bg=xxx;
localStorage.setItem("so",JSON.stringify(init));
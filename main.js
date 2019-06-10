var Btn=document.getElementById('btn');
var Btn2=document.getElementById('btn2');
var Box=document.getElementById('box');
var fBox=document.getElementById('fBox');
var aBox=document.getElementById('aBox');
var aImg=document.getElementById('aImg');
var cBtn=document.getElementById('close');
var score=document.getElementById('score');
var sj=document.getElementById('sj');
var zls;
var syls;
var block;
var gdsz=[];
var onoff=true;
syEvent()
function syEvent()//所有事件函数
{
    Btn.onclick=function()//点击开始按钮
    {
        if(onoff)
        {
            Box.style.display='block';
            fBox.style.display='block';
            init();

            onoff=false;
        }
    }
    Btn2.onclick=function()//点击重新开始按钮
    {
        Box.innerHTML='';
        onoff=true;
        if(onoff)
        {
            Box.style.display='block';
            fBox.style.display='block';
            init();
            onoff=false;
        }
    }
    Box.oncontextmenu=function(){//取消在div上的鼠标默认事件
        return false;
    }
    Box.onmousedown=function(e)//判断点击的是鼠标的那个键
    {
        var event=e.target;
        if(e.which==1)//是左键
        {
            leftClick(event);
        }
        else if(e.which==3)//是右键
        {
            rightClick(event);
        }
    }
    cBtn.onclick=function()//失败后的小叉的点击事件
    {
        aBox.style.display='none';
        fBox.style.display='none';
        Box.style.display='none';
        Box.innerHTML='';
        onoff=true;
    }
}

function init()//插入一百个小格，并随机抽取10个小格添加雷
{
    zls=10;//总雷数
    syls=10;//剩余雷数
    score.innerHTML=syls;
    for(var i=0;i<10;i++)//插入100个小格
    {
        for(var j=0;j<10;j++)
        {
            var con =document.createElement('div');//创建100个div节点
            con.classList.add('block');//给div添加类‘block’
            con.setAttribute('id',i+'-'+j);//给div添加id
            Box.appendChild(con);//将节点插入到Box中
            gdsz.push({mine:0});//每次生成小格子往数组里面传, 传一个参数mine 初始值0
        }
    }
    block=document.getElementsByClassName('block');
    while(zls)//随机生成雷，共循环十次
    {
        var mineIndex=Math.floor(Math.random()*100);
        if(gdsz[mineIndex].mine===0)//避免重复
        {
            gdsz[mineIndex].mine=1;
            block[mineIndex].classList.add('islei');
            zls--;
        }
    }
}
function leftClick(dom)//点击左键的函数
{
    var islei=document.getElementsByClassName('islei');
    if(dom &&dom.classList.contains('islei'))//判断是不是点到雷，若点到雷则显示失败的图片
    {
        for(var i=0;i<islei.length;i++)
        {
            islei[i].classList.add('show')
        }
        setTimeout(function(){
            aBox.style.display='block'
             aImg.style. background='url("img/defeated.png")';
             aImg.style.backgroundSize='100% 100%' ;
        },800);
    }
    else //反之
    {
        if(dom.classList.contains('flag'))//当插上小旗的不是雷时，则再点击鼠标左键则返回false
        {
            return false;
        }
        var n =0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX=posArr&&+posArr[0];
        var posY=posArr&&+posArr[1];
        dom && dom.classList.add('num');
        for(var i=posX-1;i<=posX+1;i++)//循环找到小格周围的雷数
        {
            for(var j=posY-1;j<=posY+1;j++)
            {
               var aroundBox= document.getElementById(i+'-'+j);//找到每个小格
               if(aroundBox&&aroundBox.classList.contains('islei'))
               {
                   n++;
               }
            }
        }
        dom.innerHTML=n;//将n的值给dom
        if(n==0)//当周围的雷数为零时
        {
            for(var i=posX-1;i<=posX+1;i++)
            {
                for(var j=posY-1;j<=posY+1;j++)
                {
                    var nearBox=document.getElementById(i+'-'+j);
                    if(nearBox&&nearBox.length  !=0)//暂时不明白
                    {
                        if(!nearBox.classList.contains('check'))//当小格没有样式‘check’时
                        {
                            nearBox.classList.add('check');//给小格添加样式‘check’
                            leftClick(nearBox);//再调用此函数
                        }
                    }
                }
            }
        }
    }
}
function rightClick(dom)
{
    if(dom.classList.contains('num'))
    {
        return ;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('islei')&&!dom.classList.contains('flag'))
    {
        syls++;
    }
    if(dom.classList.contains('islei')&&dom.classList.contains('flag'))
    {
        syls--;
    }
    score.innerHTML=syls;
    if(syls==0)
    {
        Box.onclick=function(){return false;};
        if(dom.classList.contains('islei'))
        {
            setTimeout(function()
            {
                aBox.style.display='block';
                aImg.style.background='url("img/victory.jpg")';
                aImg.style.backgroundSize='100% 100%';
            },1000);
            
        }
        
        
    }

}

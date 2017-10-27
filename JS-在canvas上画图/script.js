function change(){
  document.getElementById("image").src=canvas.toDataURL("image/jpg");
  //window.open("demo.htm", "height=100px, width=400px");
  //alert(document.getElementById("image"));
  }
//下拉画笔宽度
window.onload=function(){
    var huabi=document.getElementById("sel");
    huabi.onchange=function(){
    linw=huabi.value;
    };
    //linw=huabi;
    var canvas=document.getElementById('canvas');
    if(!canvas){
      console.log("Failed to retrieve the <canvas> element ");
      return;
    }

    var ctx=canvas.getContext('2d');
    //画一个黑色矩形
    ctx.fillStyle="#002200";
    ctx.fillRect(0,0,600,400);
    //按下标记
    var onoff=false;
    var oldx=-10;
    var oldy=-10;
    //设置颜色默认为白色
    var linecolor="white";
    //宽度默认为4
    var linw=4;
    //鼠标移动事件，事件绑定
    canvas.addEventListener("mousemove",draw,true);
    canvas.addEventListener("mousedown",down,false);
    canvas.addEventListener("mouseup",up,false);

    function down(event){
      onoff=true;
      oldx=event.pageX-10;
      oldy=event.pageY-10;
      }

    function up(){
      onoff=false;
      }

    function draw(event){
      if(onoff==true)
        {
        var newx=event.pageX-10;
        var newy=event.pageY-10;
        ctx.beginPath();
        ctx.moveTo(oldx,oldy);
        ctx.lineTo(newx,newy);
        ctx.strokeStyle=linecolor;
        ctx.lineWidth=linw;
        ctx.lineCap="round";
        ctx.stroke();
        
        oldx=newx;
        oldy=newy;
        }
      }
};


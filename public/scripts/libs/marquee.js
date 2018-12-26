var Marqueefn = (function() {

  function Marqueefn(opt) {
     this.init(opt)
  }
  Marqueefn.prototype = {
    init(opt) {
     this.render(opt)
    },
    render(opt) {

           //tanmu函数,参数说明.content:弹幕内容;fontcolor:弹幕颜色;speed:运动速度，单位为px/s（每秒运动多少像素）;startTime:开始的时间，单位为毫秒;
           function tanmu(content, fontColor, speed, startTime) {
            function add(content, speed) {
                var html = "";
                html += "<marquee   scrolldelay='1000' direction='right' scrollamount='" + speed + "' style='color:" + fontColor + ";z-index:999'>" + content + "</marquee>";
                $(opt.el).append(html);
            }

            setTimeout(add(content, speed), startTime);
            //调用弹幕函数
        }
        tanmu("我来了1,我来了1,我来了1,我来了1,我来了1,","#f00",90,0);
        tanmu("我来了2,我来了2,我来了2,我来了2,我来了2,","#0f0",100,1000);
        tanmu("我来了3,我来了3,我来了3,我来了3,我来了3,","#00f",150,2000);
        tanmu("我来了4,我来了4,我来了4,我来了4,我来了4,","#930",130,2500);
    }

  }
  return Marqueefn

})()

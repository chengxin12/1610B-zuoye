//touchstart touchmove touchend
var el1 = '.item1';

$(el1).on('swipe',function (e) {

    if(e.direction=='left'){
        $(this).addClass('show');
    }
    if(e.direction =='right'){
        $(this).removeClass('show');
    }
});

$('.delete').on('click',function () {
    $(this).parent().remove()
});

var startX,startY,moveX,moveY,swipeX,swipeY;
$(el1).on('touchstart',function (e) {

    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;

});
$(el1).on('touchmove',function (e) {

    moveX = e.touches[0].pageX;
    moveY = e.touches[0].pageY;

});
var direction;
$(el1).on('touchend',function (e) {

    if(moveX==0 && moveY==0)return;

    swipeX = moveX - startX;
    swipeY = moveY - startY;

    if(Math.abs(swipeX/swipeY)>1){
        //横向
        direction = swipeX>0? 'right':'left';
        $(this).trigger($.Event('swipe',{direction:direction}));

        // return;
    }
    if(Math.abs(swipeX/swipeY)<1){
        //竖向
        direction = swipeY>0? 'down':'up';
        $(el1).trigger($.Event('swipe',{direction:direction}));
    }

    //   if(Math.abs(swipeX/swipeY) < 1) {
    //       direction = swipey > 0? 'down': 'up'
    //   }



    moveX = 0;
    moveY = 0;
})
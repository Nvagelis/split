    var $view = $('.pagination');
    var $prev = $('.prev');
    var $next = $('.next');
    var counter = 1;
    var lastAnimation = 0;
    var time = 600;
    
    
    function movenext($el, y1, y2){
        var obj = {
                view: y1
            };
        $(obj).animate({  view: y2 }, {
        step: function(now) {
            $el.css('transform','translate(0, ' + now + '%)');  
        },
        duration: time
        },'linear');
    }

    function movepagination(pos){
        $view.animate({  view: (100*pos) }, {
        step: function(now) {
            $(this).css('transform','translate(0, -' + now + '%)');  
        },
        duration: time
        },'linear');
    }
    
    function movedown(){
        var currentSlide = $('.active');
        var nextSlide = currentSlide.next();
        
        var currentSlideUp = currentSlide.find('.text');
        var currentSlideDown = currentSlide.find('.img');
        
        var nextSlideUp = nextSlide.find('.img');
        var nextSlideDown = nextSlide.find('.text');
        
        if( nextSlide.length !== 0 ) {
    
        counter++;
        movepagination(counter-1);
        if( counter % 2 === 0 ) {
            movenext(currentSlideUp, 0, -100);
            movenext(currentSlideDown, 0, 100);

            movenext(nextSlideUp, 100, 0);
            movenext(nextSlideDown, -100, 0);
        } else {
            movenext(currentSlideUp, 0, 100);
            movenext(currentSlideDown, 0, -100);

            movenext(nextSlideUp, -100, 0);
            movenext(nextSlideDown, 100, 0);
        }

        $(currentSlide).removeClass('active');
        $(nextSlide).addClass('active');
        
        if(counter === 5){
            $next.addClass('hide');
        } else if($prev.hasClass('hide')){
            $prev.removeClass('hide');
        }
      }
    }
    function moveup(){
        var currentSlide = $('.active');
        var prevSlide = currentSlide.prev();

        var currentSlideUp = currentSlide.find('.img');
        var currentSlideDown = currentSlide.find('.text');

        var prevSlideUp = prevSlide.find('.text');
        var prevSlideDown = prevSlide.find('.img');

        if( prevSlide.length !== 0 ) {

        counter--;
        movepagination(counter-1);
        if( counter % 2 === 0 ) {
            movenext(currentSlideUp, 0, -100);
            movenext(currentSlideDown, 0, 100);

            movenext(prevSlideUp, 100, 0);
            movenext(prevSlideDown, -100, 0);
        } else {
            movenext(currentSlideUp, 0, 100);
            movenext(currentSlideDown, 0, -100);

            movenext(prevSlideUp, -100, 0);
            movenext(prevSlideDown, 100, 0);
        }
        
        $(currentSlide).removeClass('active');
        $(prevSlide).addClass('active');
        if(counter === 1){
            $prev.addClass('hide');
        } else if($next.hasClass('hide')){
            $next.removeClass('hide');
        }

      }
    }
    
    $next.on('click', function(e) {
        e.preventDefault();
        var timeNow = new Date().getTime();
        if(timeNow - lastAnimation < time){return;}
        movedown(); 
        lastAnimation = timeNow;
    });
    $('.prev').on('click', function(e) {
        e.preventDefault();
        var timeNow = new Date().getTime();
        if(timeNow - lastAnimation < time){return;}
        moveup(); 
        lastAnimation = timeNow;
    });
    
    
    function scroll(event, k){
       
        var timeNow = new Date().getTime();
        if(timeNow - lastAnimation < time) {
            event.preventDefault();
            return;
        }
        if(k < 0){
                movedown();
        }else{
                moveup();
        }
        lastAnimation = timeNow;
    }
    
    $("html, body").bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e) {
    e.preventDefault();
    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        scroll(e, delta);
    });
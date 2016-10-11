    var $image = $('.img');
    
    $image.each(function (){
        var item = $(this);
        var img = item.find('img').attr('src');

        if(typeof img !== 'undefined'){
            item.css({'background-image': 'url( '+ img +' )'});
            item.find('img').hide();
        }
    });



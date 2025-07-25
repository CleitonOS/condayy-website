$(document).ready( () => {     
    $(document).scroll( function() {
      var scroll = $(document).scrollTop();
      if(scroll >= 1150)  $(".arrow-link").fadeIn();
      if(scroll < 1149 ) $(".arrow-link").fadeOut();
    });       
});  
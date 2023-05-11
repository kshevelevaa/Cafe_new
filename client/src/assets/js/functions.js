// swiper
import Swiper from "swiper";
import $ from "jquery"
  var swiper = new Swiper('.special-dishes .swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 30,
        nextButton: '.button-next',
        prevButton: '.button-prev',
        speed :800,
        breakpoints:{
          990: {
            slidesPerView: 2,
          },
          768:{
            slidesPerView: 1,
          },
        }
    });

    var swiper = new Swiper('.customer-review .swiper-container', {
           pagination: '.swiper-pagination',
           direction: 'vertical',
           slidesPerView: 1,
           paginationClickable: true,
           spaceBetween: 0,
           mousewheelControl: true,
           loop: true,
           height:180,
           autoHeight: true,
           speed :700,
           breakpoints:{
            990: {
                height:200,
            },
            640: {
                height:230,
            },
            480: {
                height:280,
            },
            360: {
                height:390,
            }
          }
       });

    var swiper = new Swiper('.special-event .swiper-container', {
           pagination: '.swiper-pagination',
           direction: 'vertical',
           slidesPerView: 1,
           paginationClickable: true,
           spaceBetween: 0,
           mousewheelControl: true,
           loop: true,
           height:350, 
           autoHeight: true,
           speed :900,
       });

//menu in top
$(window).scroll(function() { 
    $(".main-nav").removeClass("menu-fixed");
    var scroll = $(window).scrollTop();
    if (scroll > 220) {
        $(".main-nav").addClass("menu-fixed");
    }
});

//scroll to top
 $(window).scroll(function() {
    if ($(this).scrollTop() > 900) {
     $('.scroll-top').fadeIn(1000);
       } else {
        $('.scroll-top').fadeOut(1000);
      }
    }); 

  $('.scroll-top').click(function(){
    $("html,body").animate({ scrollTop: 0 }, 2000);
    return false;
  });

//search bar
$('.search-area i').click(function(){
  $(".search-area").toggleClass("search-form-open");
})

$('.search-box .search-btn').click(function(){
  $(".search-box").toggleClass("search-form-open");
})

//bgvideo
$('#bg-video').vide({
     'mp4': 'assets/videos/v1',
     'webm': 'assets/videos/v2',
 });


 // countdown
 // $(document).ready(function() {
 //    $('.countdown1').syotimer({
 //      year: 2018,
 //      month: 8,
 //      day: 19,
 //      hour: 10,
 //      minute: 0
 //    });
 //
 //    $('.countdown2').syotimer({
 //      year: 2019,
 //      month: 4,
 //      day: 1,
 //      hour: 9,
 //      minute: 30
 //    });
 //
 //    $('.countdown3').syotimer({
 //      year: 2017,
 //      month: 12,
 //      day: 12,
 //      hour: 12,
 //      minute: 30
 //    });
 //
 //    $('.countdown4').syotimer({
 //      year: 2017,
 //      month: 11,
 //      day: 9,
 //      hour: 8,
 //      minute: 40
 //    });
 //  });
// Map

  // $("#map").gMap({
  //    scrollwheel: false,
  //    latitude: -25.363,
  //    longitude: 131.044,
  //    markers: [{
  //           latitude: -25.363,
  //           longitude: 131.044,
  //       },
  //       {
  //           address: "Guayaquil, Ecuador",
  //           html: "My Hometown",
  //           icon: {
  //               image: "assets/images/marker-hover.png",
  //               iconsize: [26, 46],
  //               iconanchor: [12,46]
  //           }
  //       }
  //   ],
  //   icon: {
  //   image: "assets/images/marker-hover.png",
  //     iconsize: [26, 46],
  //     iconanchor: [12, 46]
  //   },
  //   zoom: 3
  // });
  
  









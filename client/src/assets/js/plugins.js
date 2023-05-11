import $ from "jquery"
 // $(window).load(function() {
 //
 //    //preloder
 //    $("#preloder").delay(2000).fadeOut(500);
 //        $("#preloder-center").click(function() {
 //          $("#preloder").fadeOut(500);
 //        });
 //  });

// init Isotope food menu
var $grid = $('.grid').isotope({
  itemSelector: '.element-item',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(.1)',
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)',
  },
  stagger: 80,
  transitionDuration: '0.8s',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    symbol: '.symbol',
    number: '.number parseInt',
    category: '[data-category]',
    weight: function( itemElem ) {
      var weight = $( itemElem ).find('.weight').text();
      return parseFloat( weight.replace( /[\(\)]/g, '') );
    }
  }
});

$('.dropdown a.dropdown-toggle').on("click", function(e){
  $(this).next('ul').toggle();
  e.stopPropagation();
  e.preventDefault();
});


// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};

// bind filter button click
$('#filters').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });

});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

  //  food gallery isotope
  var $grid2 = $('.grid2').isotope({
  itemSelector: '.gallery-item',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(.4)rotate(60deg)',
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)rotate(0deg)',
  },
  stagger: 80,
  transitionDuration: '0.8s',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    symbol: '.symbol',
    number: '.number parseInt',
    category: '[data-category]',
    weight: function( itemElem ) {
      var weight = $( itemElem ).find('.weight').text();
      return parseFloat( weight.replace( /[\(\)]/g, '') );
    }
  }
});

// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};

// bind filter button click
$('#filters2').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid2.isotope({ filter: filterValue });

});

// change is-checked class on buttons
$('.button-group2').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

  //  masonary isotope
  var $grid3 = $('.grid3').isotope({
  itemSelector: '.masonary-item',
  hiddenStyle: {
    opacity: 0,
    transform: 'skew(20deg)',
  },
  visibleStyle: {
    opacity: 1,
    transform: 'skew(0deg)',
  },
  stagger: 80,
  transitionDuration: '0.8s',
  percentPosition: true,
  masonry: {
    columnWidth: ".grid-sizer",
  },
  getSortData: {
    name: '.name',
    symbol: '.symbol',
    number: '.number parseInt',
    category: '[data-category]',
    weight: function( itemElem ) {
      var weight = $( itemElem ).find('.weight').text();
      return parseFloat( weight.replace( /[\(\)]/g, '') );
    }
  }
});

// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};

// bind filter button click
$('#filters3').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid3.isotope({ filter: filterValue });

});

// change is-checked class on buttons
$('.button-group3').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});
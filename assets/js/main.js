/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

	// Timeline JS
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame)
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
	// END Timeline JS


	// Initialize Chocolat JS - Lightbox
  $('.chocolat-parent').Chocolat({
		imageSize: 'default',
		enableZoom: false,
		fullScreen: false
	});

	/* Initialize Lazyload
	$(".chocolat-image img").lazyload();
	*/

	/* Initialize page loader
	 function loaderSpinner() {
    $(window).load(function() {
	      var loader = $('.loader');
				var wHeight = $(window).height();
				var wWidth = $(window).width();
				var i = 0;

				loader.css({
				    top: wHeight / 2 - 2.5,
				    left: wWidth / 2 - 200
				 })

				  do{
				    loader.animate({
				      width: i
				    },10)
				    i+=3;
				  } while(i <= 400)
				  if(i === 402){
				    loader.animate({
				      left: 0,
				      width: '100%'
				    })
				    loader.animate({
				      top: '0',
				      height: '100vh'
				    })
				  }


				      setTimeout(function(){
				        $('#page-wrapper').fadeIn("slow");
				        (loader).fadeOut("fast");

								$('.loader-container').fadeOut("fast", function() {
									$(this).remove();
								});
				      },3500);
				    });

				}

				loaderSpinner();
		*/
})(jQuery);

// Initialize Google maps
function initMap() {

	var myLatlng = {lat: 47.5421286, lng: -121.8366726};

  var map = new google.maps.Map(document.getElementById("googleMap"), {
    center: myLatlng,
    zoom: 10,
    mapTypeId:google.maps.MapTypeId.ROADMAP
	});

  var marker = new google.maps.Marker({
    map: map,
    position: myLatlng,
  	animation:google.maps.Animation.BOUNCE
  });

	var infowindow = new google.maps.InfoWindow({
  	content:"<div class='map-text'><strong>Salish Lodge Dining Room</strong><br />6501 Railroad Ave<br />Snoqualmie, WA 98065<br /><a href='https://www.google.com/maps?ll=47.542129,-121.836673&z=16&t=m&hl=en-US&gl=US&mapclient=apiv3&cid=8529745677440333048'>View on Google Maps</a></div>"
  });

	google.maps.event.addListener(marker,'click',function() {
		infowindow.open(map, marker);
	});

	marker.setMap(map);
	infowindow.open(map,marker);
	map.setOptions({scrollwheel: false});

}

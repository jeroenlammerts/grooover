$(document).ready(function(){

	$('.search_filter select').change(function(){
		$('#search_filter').submit();
	});

	$('.add_to_favourite').click(function(e){
		e.preventDefault();

		var link = $(this);

		var pattern_id = $(this).attr('id').replace('pattern_favourite_', '');

		$.ajax({
			url: '/add_to_favourite',
			type: 'POST',
			data: { pattern_id: pattern_id },
			success: function(data){
				if(data == 'active'){
					link.addClass('active');
				} else {
					link.removeClass('active');
				}
				if(link.hasClass('favourites_page')){
					window.location.reload();
				}
			}
		});

	});

	$('.faq a').click(function(e){
		e.preventDefault();
		$(this).next('p').slideToggle();
	});

});

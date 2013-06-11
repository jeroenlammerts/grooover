$(document).ready(function(){

	$('.search_filter select').change(function(){
		$('#search_filter').submit();
	});

	$('.add_to_favourite').click(function(e){
		e.preventDefault();

		var pattern_id = $(this).parent().parent().parent().attr('id').replace('pattern_', '');

		$.ajax({
			url: 'add_to_favourite',
			type: 'POST',
			data: { pattern_id: pattern_id },
			success: function(data){
				console.log(data);
			}
		});

	});

});

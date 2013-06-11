		@if(count($patterns->results))
		<table class="table table-hover table-striped">
			<thead>
				<tr>
					<th>Name</th>
					<th>Time</th>
					<th>Type</th>
					<th>Genre</th>
					<th>Score</th>
					<th>Video</th>
				</tr>
			</thead>
			<tbody>
				@foreach($patterns->results as $pattern)
				<tr id="pattern_{{ $pattern->id }}"@if($pattern->affiliate) class="affiliate"@endif>
					<td><a href="{{ $pattern->link }}"@if($pattern->affiliate) target="_blank"@endif>{{ $pattern->title }}</a></td>
					<td><a href="{{ $pattern->link }}"@if($pattern->affiliate) target="_blank"@endif>{{ $pattern->time }}</a></td>
					<td><a href="{{ $pattern->link }}"@if($pattern->affiliate) target="_blank"@endif>{{ $pattern->type }}</a></td>
					<td><a href="{{ $pattern->link }}"@if($pattern->affiliate) target="_blank"@endif>{{ $pattern->genre }}</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
					</td>
					<td>@if(trim($pattern->youtube) != '')<i class="icon-facetime-video"></i>@endif</td>
					<td>
						@if(!$pattern->affiliate)
						<div class="btn-group">
							<a href="#" class="btn add_to_favourite" title="Add to my favourites"><i class="icon-star"></i></a>
							<a href="#" class="btn thumb_up"><i class="icon-thumbs-up"></i></a>
							<a href="#" class="btn thumb_down"><i class="icon-thumbs-down"></i></a>
						</div>
						@endif
					</td>
				</tr>	
				@endforeach							
			</tbody>
		</table>
		<div class="pagination">
			{{ $patterns->links() }}
		</div>
		@else
		No patterns found
		@endif
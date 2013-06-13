		@if(count($patterns->results))
		<table class="table table-hover table-striped">
			<thead>
				<tr>
					<th>Name</th>
					@if(!isset($page) || isset($page) && $page != 'home')
						<th>Time</th>
					@endif
					<th>Type</th>
					<th>Genre</th>
					<th class="rating">Rating</th>
					<th>Video</th>
					@if(!isset($page) || isset($page) && $page != 'home')
						<th>&nbsp;</th>
					@endif
				</tr>
			</thead>
			<tbody>
				@foreach($patterns->results as $pattern)
				<tr@if($pattern->affiliate) class="affiliate"@endif>
					<td><a href="{{ $pattern->link }}"@if($pattern->affiliate) target="_blank"@endif>{{ $pattern->title }}</a></td>
					@if(!isset($page) || isset($page) && $page != 'home')
						<td><a href="{{ $pattern->link }}"@if($pattern->affiliate) target="_blank"@endif>{{ $pattern->time }}</a></td>
					@endif
					<td><a href="{{ $pattern->link }}"@if($pattern->affiliate) target="_blank"@endif>{{ $pattern->type }}</a></td>
					<td><a href="{{ $pattern->link }}"@if($pattern->affiliate) target="_blank"@endif>{{ $pattern->genre }}</a></td>
					<td>
						@for ($i = 1; $i <= 5; $i++)
							<i class="icon-star@if($pattern->score < $i)-empty@endif"></i>
						@endfor
					</td>
					<td>@if(trim($pattern->youtube) != '')<i class="icon-facetime-video"></i>@endif</td>
					@if(!isset($page) || isset($page) && $page != 'home')	
						<td>
							@if(Auth::check())
							<div class="btn-group">
								<a href="#" id="pattern_favourite_{{ $pattern->id }}" class="btn add_to_favourite 
								@if($pattern->favourite) 
									active 
								@endif
								@if(isset($page) && $page == 'favourites') 
									favourites_page 
								@endif
								" title="Add to my favourites"><i class="icon-star"></i></a>
							</div>
							@endif
						</td>
					@endif
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
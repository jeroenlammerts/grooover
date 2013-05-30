		<table class="table table-hover table-striped">
			<thead>
				<tr>
					<th>Name</th>
					<th>Time</th>
					<th>Type</th>
					<th>Genre</th>
					<th>Score</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				@foreach($patterns->results as $pattern)
				<tr>
					<td><a href="{{ URL::to_route('pattern_detail', array($pattern->id)) }}">{{ $pattern->artist }} - {{ $pattern->song }}</a></td>
					<td><a href="{{ URL::to_route('pattern_detail', array($pattern->id)) }}">{{ $pattern->time }}</a></td>
					<td><a href="{{ URL::to_route('pattern_detail', array($pattern->id)) }}">{{ $pattern->type }}</a></td>
					<td><a href="{{ URL::to_route('pattern_detail', array($pattern->id)) }}">{{ $pattern->genre }}</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
					</td>
					<td><i class="icon-facetime-video"></i></td>
				</tr>	
				@endforeach							
			</tbody>
		</table>
		<div class="pagination">
			{{ $patterns->links() }}
		</div>
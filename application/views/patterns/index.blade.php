@layout('master')
@section('content')

<div class="row">
	<div class="span12">
		<h2>Patterns</h2>
	</div>
</div>				
<div class="row">
	<div class="span10">
		<div class="well">
			<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label" for="type">Type</label>
					<div class="controls">
						<select class="input-medium" name="type" id="type">
							<option value="">- All types -</option>
							@foreach($pattern_types as $type)
							<option value="{{ $type->id }}">{{ $type->name }}</option>
							@endforeach
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="genre">Genre</label>
					<div class="controls">
						<select class="input-medium" name="genre" id="genre">
							<option value="">- All genres -</option>
							@foreach($genres as $genre)
							<option value="{{ $genre->id }}">{{ $genre->name }}</option>
							@endforeach
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="artist">Artist</label>
					<div class="controls">
						<select class="input-medium" name="artist" id="artist">
							<option value="">- All artists -</option>
							@foreach($artists as $artist)
							<option value="{{ $artist->id }}">{{ $artist->name }}</option>
							@endforeach
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="song">Song</label>
					<div class="controls">
						<select class="input-medium" name="song" id="song">
							<option value="">- All songs -</option>
							@foreach($songs as $song)
							<option value="{{ $song->id }}">{{ $song->name }}</option>
							@endforeach
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="keyword">Keyword</label>
					<div class="controls">
						<input class="input-medium" type="text" name="keyword" id="keyword" />
					</div>
				</div>
				<div class="control-group">
					<div class="controls">
						<button type="submit" class="btn">Search</button>
					</div>
				</div>
			</form>	
		</div>
	
		@include('patterns.table')
		
	</div>
	<div class="span2">
		<img src="img/ad1.jpg" alt=""/>
		<img src="img/ad2.jpg" alt=""/>
		<img src="img/ad4.jpg" alt=""/>
	</div>
</div>

@endsection
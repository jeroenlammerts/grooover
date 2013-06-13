@layout('master')
@section('content')

<div class="row">
	<div class="span12">
		<h2>Patterns</h2>
		<p>Here you can search for patterns in Grooover</p>
	</div>
</div>				
<div class="row">
	<div class="span10">
		<div class="row">
			<div class="span10">
				<legend>Search filter</legend>
			</div>
		</div>
		{{ Form::open('patterns', 'GET', array('id' => 'search_filter', 'class' => 'form-inline search_filter')) }}
			<div class="row">
				<div class="span10">
					<label class="control-label" for="type">Type</label>
					<select class="input-medium" name="type" id="type">
						<option value="">- All types -</option>
						@foreach($pattern_types as $type)
						<option value="{{ $type->id }}"@if(isset($input['type']) && $input['type'] == $type->id) selected="selected"@endif>{{ $type->name }}</option>
						@endforeach
					</select>

					<label class="control-label" for="genre">Genre</label>
					<select class="input-medium" name="genre" id="genre">
						<option value="">- All genres -</option>
						@foreach($genres as $genre)
						<option value="{{ $genre->id }}"@if(isset($input['genre']) && $input['genre'] == $genre->id) selected="selected"@endif>{{ $genre->name }}</option>
						@endforeach
					</select>

					<label class="control-label" for="keyword">Keyword</label>
					<input class="input-medium" type="text" name="keyword" id="keyword" value="@if(isset($input['keyword']) && $input['keyword'] != ''){{ $input['keyword'] }}@endif" />

					<button type="submit" class="btn">Search</button>

				</div>
			</div>		
		{{ Form::close() }}
		<div class="row">
			<div class="span10">
				@include('patterns.table')
			</div>
		</div>		
	</div>
	<div class="span2">
		<img src="/img/ad1.jpg" alt=""/>
		<img src="/img/ad2.jpg" alt=""/>
		<img src="/img/ad4.jpg" alt=""/>
	</div>
</div>

@endsection
<?php

class Patterns_Controller extends Base_Controller
{
	public $restful = true;

	public function get_index()
	{
		
		$input = Input::all();

		$patterns = DB::table('patterns')
						//->left_join('songs', 'songs.id', '=', 'patterns.song_id')
						//->left_join('artists', 'songs.artist_id', '=', 'artists.id')
						->left_join('genres', 'genres.id', '=', 'patterns.genre_id')
						->left_join('pattern_types', 'pattern_types.id', '=', 'patterns.pattern_type_id')
						//->select(array('patterns.id', 'songs.name as song', 'artists.name as artist', 'genres.name as genre', 'time', 'pattern_types.name as type'))
						->select(array('patterns.id', 'patterns.title', 'genres.name as genre', 'time', 'pattern_types.name as type', 'patterns.youtube as youtube', 'patterns.affiliate', 'patterns.affiliate_link'));
						//->order_by('artists.name', 'asc')
						//->order_by('songs.name', 'asc')
						

		if(isset($input['type']) && $input['type'] != ''){
			$patterns = $patterns->where('patterns.pattern_type_id', '=', $input['type']);
		}
		if(isset($input['genre']) && $input['genre'] != ''){
			$patterns = $patterns->where('patterns.genre_id', '=', $input['genre']);
		}
		if(isset($input['keyword']) && $input['keyword'] != ''){
			$patterns = $patterns->where('patterns.title', 'LIKE', '%'.$input['keyword'].'%');
		}

		$patterns = $patterns->order_by('patterns.title', 'asc')->paginate(10);


		$pagination = $patterns->appends(
	        array(
	            'type'   	=> Input::get('type'),
	            'genre' 	=> Input::get('genre'),
	            'keyword'   => Input::get('keyword')
	        )
	    )->links();

		foreach($patterns->results as $pattern){
			if($pattern->affiliate){
				$pattern->link = $pattern->affiliate_link;
			} else {
				$pattern->link = URL::to_route('pattern_detail', array($pattern->id));
			}

		}

		$pattern_types = DB::table('pattern_types')->order_by('name', 'asc')->get();
		$genres = DB::table('genres')->order_by('name', 'asc')->get();
		$artists = DB::table('artists')->order_by('name', 'asc')->get();
		$songs = DB::table('songs')->order_by('name', 'asc')->get();

		$title = "Patterns";
		return View::make('patterns.index')
			->with('title', $title)
			->with('patterns', $patterns)
			->with('pattern_types', $pattern_types)
			->with('genres', $genres)
			->with('artists', $artists)
			->with('songs', $songs)
			->with('input', $input);
	}

	public function get_my_patterns()
	{

		$patterns = DB::table('patterns')
						//->left_join('songs', 'songs.id', '=', 'patterns.song_id')
						//->left_join('artists', 'songs.artist_id', '=', 'artists.id')
						->left_join('genres', 'genres.id', '=', 'patterns.genre_id')
						->left_join('pattern_types', 'pattern_types.id', '=', 'patterns.pattern_type_id')
						//->select(array('patterns.id', 'songs.name as song', 'artists.name as artist', 'genres.name as genre', 'time', 'pattern_types.name as type'))
						->select(array('patterns.id', 'patterns.title', 'genres.name as genre', 'time', 'pattern_types.name as type', 'patterns.youtube as youtube', 'patterns.affiliate', 'patterns.affiliate_link'))
						->where('patterns.user_id', '=', Auth::user()->id)
						->order_by('patterns.title', 'asc')
						//->order_by('songs.name', 'asc')
						->paginate(10);

		foreach($patterns->results as $pattern){
			if($pattern->affiliate){
				$pattern->link = $pattern->affiliate_link;
			} else {
				$pattern->link = URL::to_route('pattern_detail', array($pattern->id));
			}

		}						

		$title = "My patterns";
		return View::make('user.patterns')
			->with('title', $title)
			->with('patterns', $patterns);
	}

	public function get_editor($pattern_id = 0)
	{

		if($pattern_id){
			$pattern = Pattern::find($pattern_id);
		} else {
			$pattern = new Pattern;
			$pattern->data = '{
				"kitIndex":0,
				"effectIndex":0,
				"tempo":120,
				"swingFactor":0,
				"effectMix":1,
				"rhythms": [
					[],[]
				],
				"isKitLoaded":true,
				"isEffectLoaded":true
			}';
		}
		
		$pattern_types = DB::table('pattern_types')->order_by('name', 'asc')->get();
		$genres = DB::table('genres')->order_by('name', 'asc')->get();
		//$artists = DB::table('artists')->order_by('name', 'asc')->get();
		//$songs = DB::table('songs')->order_by('name', 'asc')->get();		

		$title = "Editor";
		return View::make('editor.index')
			->with('title', $title)
			->with('pattern_id', $pattern_id)
			->with('pattern', $pattern)
			->with('pattern_types', $pattern_types)
			->with('genres', $genres);
			//->with('artists', $artists)
			//->with('songs', $songs);
	}

	public function post_pattern()
	{
		$input = Input::all();
		//print_r($input);

		if($input['pattern_id'] > 0){
			$pattern = Pattern::find($input['pattern_id']);
		} else {
			$pattern = new Pattern;
			$pattern->user_id = Auth::user()->id;
		}

		$pattern->pattern_type_id = $input['type'];
		$pattern->data = $input['data'];
		//$pattern->song_id = $input['song'];
		$pattern->genre_id = $input['genre'];
		$pattern->time = $input['time'];
		$pattern->youtube = $input['youtube'];
		$pattern->public = $input['public'];
		$pattern->title = $input['title'];
		$pattern->save();

		return Redirect::to_route('my_patterns');

	}

	public function get_pattern($pattern_id)
	{
		$title = "Pattern detail";
		return View::make('patterns.detail')
			->with('title', $title)
			->with('pattern_id', $pattern_id);
	}

	public function post_add_to_favourite()
	{
		$input = Input::all();
		if(isset($input['pattern_id'])){

			$favourite = new Favourite;
			$favourite->user_id = Auth::user()->id;
			$favourite->pattern_id = $input['pattern_id'];
			$favourite->save();

		}

	}

}
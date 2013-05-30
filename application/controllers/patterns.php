<?php

class Patterns_Controller extends Base_Controller
{
	public $restful = true;

	public function get_index()
	{
		
		$patterns = DB::table('patterns')
						->left_join('songs', 'songs.id', '=', 'patterns.song_id')
						->left_join('artists', 'songs.artist_id', '=', 'artists.id')
						->left_join('genres', 'genres.id', '=', 'patterns.genre_id')
						->left_join('pattern_types', 'pattern_types.id', '=', 'patterns.pattern_type_id')
						->select(array('patterns.id', 'songs.name as song', 'artists.name as artist', 'genres.name as genre', 'time', 'pattern_types.name as type'))
						->order_by('artists.name', 'asc')
						->order_by('songs.name', 'asc')
						->paginate(10);

		/*$patterns = Pattern::with('song')->order_by('id', 'asc')->paginate(5);
		$patterns = Paginator::make($patterns, count($patterns), 5);*/

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
			->with('songs', $songs);
	}

	public function get_my_patterns()
	{

		$patterns = DB::table('patterns')
						->left_join('songs', 'songs.id', '=', 'patterns.song_id')
						->left_join('artists', 'songs.artist_id', '=', 'artists.id')
						->left_join('genres', 'genres.id', '=', 'patterns.genre_id')
						->left_join('pattern_types', 'pattern_types.id', '=', 'patterns.pattern_type_id')
						->select(array('patterns.id', 'songs.name as song', 'artists.name as artist', 'genres.name as genre', 'time', 'pattern_types.name as type'))
						->where('patterns.user_id', '=', Auth::user()->id)
						->order_by('artists.name', 'asc')
						->order_by('songs.name', 'asc')
						->paginate(10);

		$title = "My patterns";
		return View::make('user.patterns')
			->with('title', $title)
			->with('patterns', $patterns);
	}

	public function get_editor($pattern_id = 0)
	{
		$data = '';
		if($pattern_id){
			$pattern = Pattern::find($pattern_id);
			$data = $pattern->data;
		}	
		

		$title = "Editor";
		return View::make('editor.index')
			->with('title', $title)
			->with('pattern_id', $pattern_id)
			->with('data', $data);
	}

	public function get_json()
	{
		
		$array = array(
			'measures' => array(
				array(
					'time' => 4,
					'counts' => array(
						array(
							'time' => 4,
							'instrument' => 0,
							'notes' => array('x', '', 'x', '')
						)
					)
				)
			),
			'instruments' => array(
				array(
					'name' => 'Hihat'
				)
			),
			'bpm' => 120
			
		);

		return Response::json($array);
	}

	public function post_pattern()
	{
		$input = Input::all();

		print_r($input);

		if($input['pattern_id'] > 0){
			$pattern = Pattern::find($input['pattern_id']);
			$pattern->data = $input['data'];
			$pattern->save();
		} else {
			$pattern = new Pattern;
			$pattern->data = $input['data'];
			$pattern->user_id = Auth::user()->id;
			$pattern->save();
		}

		return Redirect::to_route('my_patterns');

	}

	public function get_pattern($pattern_id)
	{
		$title = "Pattern detail";
		return View::make('patterns.detail')
			->with('title', $title)
			->with('pattern_id', $pattern_id);
	}

}
<?php

class Patterns_Controller extends Base_Controller
{
	public $restful = true;

	public function get_index()
	{
		
		$patterns = DB::table('patterns')
						->join('songs', 'songs.id', '=', 'patterns.song_id')
						->join('artists', 'songs.artist_id', '=', 'artists.id')
						->join('genres', 'genres.id', '=', 'patterns.genre_id')
						->join('pattern_types', 'pattern_types.id', '=', 'patterns.pattern_type_id')
						->select(array('songs.name as song', 'artists.name as artist', 'genres.name as genre', 'time', 'pattern_types.name as type'))
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

	public function get_editor()
	{
		
		// test patterns
		//$user = new Pattern;
		//$user->save();

		$title = "Editor";
		return View::make('editor.index')
			->with('title', $title);
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

}
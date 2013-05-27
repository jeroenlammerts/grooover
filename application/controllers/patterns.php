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
						->select(array('songs.name as song', 'artists.name as artist', 'genres.name as genre'))
						->order_by('artists.name', 'asc')
						->order_by('songs.name', 'asc')
						->paginate(5);



		//$patterns = Pattern::with('song')->order_by('id', 'asc')->paginate(5);
		//$patterns = Paginator::make($patterns, count($patterns), 5);

		//rint_r($patterns);
		//die();

		$title = "Patterns";
		return View::make('patterns.index')
			->with('title', $title)
			->with('patterns', $patterns);
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

}
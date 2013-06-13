<?php

class Home_Controller extends Base_Controller 
{

	public $restful = true;
	
	public function get_index()
	{
		
		$patterns = DB::table('patterns')
						->left_join('genres', 'genres.id', '=', 'patterns.genre_id')
						->left_join('pattern_types', 'pattern_types.id', '=', 'patterns.pattern_type_id')
						->select(array('patterns.id', 'patterns.title', 'genres.name as genre', 'time', 'pattern_types.name as type', 'patterns.youtube as youtube', 'patterns.affiliate', 'patterns.affiliate_link'))
						->where('patterns.affiliate', '=', 0)
						->order_by('patterns.created_at', 'DESC')
						->take(10)
						->paginate();	

		foreach($patterns->results as $pattern){
			
			$pattern->link = URL::to_route('pattern_detail', array($pattern->id));

			$pattern_obj = Pattern::find($pattern->id);
			$pattern->score = $pattern_obj->get_score();
			$pattern->favourite = $pattern_obj->has_auth_user_favourite();

		}

		$recent_patterns = $patterns;

		$fav_array = array();
		$favourites = DB::table('favourites')
							->select(array(DB::raw('COUNT(*) AS num_fav'), 'pattern_id'))
							->group_by('pattern_id')
							->order_by('num_fav', 'desc')
							->take(10)
							->get();
		foreach($favourites as $favourite){
			$fav_array[] = $favourite->pattern_id;
		}

		$patterns = DB::table('patterns')
						->left_join('genres', 'genres.id', '=', 'patterns.genre_id')
						->left_join('pattern_types', 'pattern_types.id', '=', 'patterns.pattern_type_id')
						->select(array('patterns.id', 'patterns.title', 'genres.name as genre', 'time', 'pattern_types.name as type', 'patterns.youtube as youtube', 'patterns.affiliate', 'patterns.affiliate_link'))
						->where('patterns.affiliate', '=', 0)
						->where_in('patterns.id', $fav_array)
						->order_by('patterns.created_at', 'DESC')
						->take(10)
						->paginate();	

		foreach($patterns->results as $pattern){
			
			$pattern->link = URL::to_route('pattern_detail', array($pattern->id));

			$pattern_obj = Pattern::find($pattern->id);
			$pattern->score = $pattern_obj->get_score();
			$pattern->favourite = $pattern_obj->has_auth_user_favourite();

		}

		$popular_patterns = $patterns;

		$title = "Home";
		return View::make('home.index')
			->with('title', $title)
			->with('recent_patterns', $recent_patterns)
			->with('popular_patterns', $popular_patterns)
			->with('page', 'home');
	}

	public function get_about()
	{
		$title = "About";
		return View::make('about.index')
			->with('title', $title);
	}

	public function get_help()
	{
		$title = "Help";
		return View::make('help.index')
			->with('title', $title);
	}
}
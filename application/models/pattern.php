<?php

class Pattern extends Eloquent 
{

	public static $table = 'patterns';

	public function get_score(){
		if($this->affiliate){
			return 5;
		} else {
			// must done a better calculation
			$favourites = DB::table('favourites')->where('pattern_id', '=', $this->id);
			return min(5, count($favourites));
		}
	}

	public function has_auth_user_favourite(){

		$favourite = false;
		if(Auth::check()){
			$link = $user = DB::table('favourites')
								->where('user_id', '=', Auth::user()->id)
								->where('pattern_id', '=', $this->id)
								->get();

			if(count($link)){
				$favourite = true;
			} 
		}

		return $favourite;

	}

	/*public function user()
	{
		return $this->has_one('User', 'id');
	}	

	public function song()
	{
		return $this->has_one('Song', 'id');
	}	

	public function genre()
	{
		return $this->has_one('Genre', 'id');
	}*/
}
<?php

class User extends Eloquent 
{

	public static $table = 'users';

	public function full_name()
	{
		return $this->first_name . ' ' . $this->last_name;
	}

	public function patterns(){
		return $this->has_many('Pattern');
	}

}
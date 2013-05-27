<?php

class User extends Eloquent 
{

	public function full_name()
	{
		return $this->first_name . ' ' . $this->last_name;
	}

}
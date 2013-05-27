<?php

class Genre extends Eloquent 
{
	public function patterns(){
		return $this->has_many('Pattern');
	}
}
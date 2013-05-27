<?php

class Patterns_Controller extends Base_Controller
{
	public $restful = true;

	public function get_index()
	{
		$title = "Patterns";
		return View::make('patterns.index')
			->with('title', $title);
	}

	public function get_editor()
	{
		
		// test patterns


		$title = "Editor";
		return View::make('editor.index')
			->with('title', $title);
	}

}
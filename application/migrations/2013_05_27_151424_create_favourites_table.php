<?php

class Create_Favourites_Table {

	public function up()
    {
		Schema::create('favourites', function($table) {
			$table->increments('id');
			$table->integer('user_id');
			$table->integer('pattern_id');
		});

    }    

	public function down()
    {
		Schema::drop('favourites');
    }


}
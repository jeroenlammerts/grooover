<?php

class Create_Songs_Table {

	public function up()
    {
		Schema::create('songs', function($table) {
			$table->increments('id');
			$table->integer('artist_id');
			$table->string('name');
			$table->date('date');
		});

    }    

	public function down()
    {
		Schema::drop('songs');
    }

}
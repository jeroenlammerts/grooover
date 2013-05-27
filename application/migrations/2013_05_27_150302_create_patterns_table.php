<?php

class Create_Patterns_Table {

	public function up()
    {
		Schema::create('patterns', function($table) {
			$table->increments('id');
			$table->integer('pattern_type_id');
			$table->integer('user_id');
			$table->integer('song_id');
			$table->integer('genre_id');
			$table->timestamp('time');
			$table->string('youtube');
			$table->text('data');
			$table->timestamps();
		});

    }    

	public function down()
    {
		Schema::drop('patterns');
    }

}
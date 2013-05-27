<?php

class Create_Rating_Table {

	public function up()
    {
		Schema::create('ratings', function($table) {
			$table->increments('id');
			$table->integer('user_id');
			$table->integer('pattern_id');
		});

    }    

	public function down()
    {
		Schema::drop('ratings');
    }


}
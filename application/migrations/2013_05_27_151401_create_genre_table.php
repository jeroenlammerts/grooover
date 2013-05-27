<?php

class Create_Genre_Table {

	public function up()
    {
		Schema::create('genres', function($table) {
			$table->increments('id');
			$table->string('name');
		});

    }    

	public function down()
    {
		Schema::drop('genres');
    }


}
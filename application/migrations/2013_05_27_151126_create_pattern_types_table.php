<?php

class Create_Pattern_Types_Table {

	public function up()
    {
		Schema::create('pattern_types', function($table) {
			$table->increments('id');
			$table->string('name');
		});

    }    

	public function down()
    {
		Schema::drop('pattern_types');
    }

}
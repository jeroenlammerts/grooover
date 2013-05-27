<?php

class Create_Artists_Table {

	public function up()
    {
		Schema::create('artists', function($table) {
			$table->increments('id');
			$table->string('name');
		});

    }    

	public function down()
    {
		Schema::drop('artists');
    }

}
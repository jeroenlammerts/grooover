<?php

class Create_Users_Table {    

	public function up()
    {
		Schema::create('users', function($table) {
			$table->increments('id');
			$table->string('first_name');
			$table->string('last_name');
			$table->string('email');
			$table->string('password');
			$table->boolean('activated');
			$table->boolean('premium');
			$table->timestamps();
		});

    }    

	public function down()
    {
		Schema::drop('users');
    }

}
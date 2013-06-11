<?php

class Add_Youtube_Info_To_Patterns {

	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('patterns', function($table){
			$table->string('title');
			$table->text('description');
		});
	}

	/**
	 * Revert the changes to the database.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('patterns', function($table){
			$table->drop_column('title');
			$table->drop_column('description');
		});
	}

}
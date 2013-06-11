<?php

class Update_Patterns_Table {

	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('patterns', function($table){
			$table->boolean('public');
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
			$table->drop_column('public');		
		});
	}

}
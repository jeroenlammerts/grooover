<?php

class Patterns_Affiliate {

	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('patterns', function($table){
			$table->boolean('affiliate');
			$table->string('affiliate_link');
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
			$table->drop_column('affiliate');
			$table->drop_column('affiliate_link');
		});
	}

}
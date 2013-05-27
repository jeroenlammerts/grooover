<?php

class Seed_Genres_Table {

    public function up()
    {
            DB::table('genres')->insert(
                    array(
                            array('name' => 'Pop'),
                            array('name' => 'Rock'),
                            array('name' => 'Metal'),                                
                    ));
    }

    public function down()
    {
            DB::table('genres')->delete();
    }

}
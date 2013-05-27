<?php

class Seed_Songs_Table {

    public function up()
    {
            DB::table('songs')->insert(
                    array(
                            array('artist_id' => '1', 'name' => 'Gold On The Ceiling'),                                
                            array('artist_id' => '1', 'name' => 'Lonely Boy'),                                
                            array('artist_id' => '2', 'name' => 'All My Life'),                                
                            array('artist_id' => '2', 'name' => 'Learn To Fly'),                                
                            array('artist_id' => '3', 'name' => 'Hold The Line'),                                
                            array('artist_id' => '3', 'name' => 'Rosanna'),                                
                    ));
    }

    public function down()
    {
            DB::table('songs')->delete();
    }

}
<?php

class Seed_Patterns_Table {

    public function up()
    {
            DB::table('patterns')->insert(
                    array(
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                            array('pattern_type_id' => '1', 'user_id' => '1', 'song_id' => '1', 'genre_id' => '1'),                                                           
                    ));
    }

    public function down()
    {
            DB::table('patterns')->delete();
    }

}
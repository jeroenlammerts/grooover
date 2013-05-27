<?php

class Seed_Pattern_Types_Table {

    public function up()
    {
            DB::table('pattern_types')->insert(
                    array(
                            array('name' => 'Groove'),
                            array('name' => 'Fill'),
                            array('name' => 'Break'),                                
                    ));
    }

    public function down()
    {
            DB::table('pattern_types')->delete();
    }

}
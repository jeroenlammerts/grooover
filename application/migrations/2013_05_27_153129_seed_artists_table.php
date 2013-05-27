<?php

class Seed_Artists_Table {

    public function up()
    {
            DB::table('artists')->insert(
                    array(
                            array('name' => 'Black Keys'),
                            array('name' => 'Foo Fighters'),
                            array('name' => 'Toto'),                                
                    ));
    }

    public function down()
    {
            DB::table('artists')->delete();
    }

}
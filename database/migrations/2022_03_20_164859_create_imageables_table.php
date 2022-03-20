<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImageablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imageables', function (Blueprint $table) {
            $table->foreignId('image_id')->constrained();
            $table->morphs('imageable');
            $table->unique(['image_id', 'imageable_id', 'imageable_type']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('imageables', function (Blueprint $table) {
            $table->dropForeign(['image_id']);
            // $table->dropForeign(['imageable_id']);
        });
        Schema::dropIfExists('imageables');
    }
}

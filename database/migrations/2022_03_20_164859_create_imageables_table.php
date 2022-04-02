<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImageablesTable extends Migration
{
    /**
     * Run the migrations.
     * See https://laravel.com/docs/8.x/eloquent-relationships#one-to-one-polymorphic-relations for more.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imageables', function (Blueprint $table) {
            $table->id('id');
            $table->string('url');
            $table->string('name');
            $table->morphs('imageable');
            $table->unique(['id', 'imageable_id', 'imageable_type']);
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
        Schema::dropIfExists('imageables');
    }
}

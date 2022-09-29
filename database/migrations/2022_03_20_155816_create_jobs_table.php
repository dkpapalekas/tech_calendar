<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('address_id')->constrained();
            $table->foreignId('appliance_id')->constrained();
            $table->string('client_status');
            $table->datetime('date')->nullable();
            $table->float('agreed_price', 6, 2);
            $table->boolean('is_completed');
            $table->integer('duration')->nullable();
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
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropForeign(['address_id']);
            $table->dropForeign(['appliance_id']);
        });
        Schema::dropIfExists('jobs');
    }
}

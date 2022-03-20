<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobLinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained();
            $table->foreignId('material_id')->constrained();
            $table->float('quantity', 6, 2);
            $table->float('price', 6, 2);
            $table->string('status');
            $table->text('remarks');
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
        Schema::table('job_lines', function (Blueprint $table) {
            $table->dropForeign(['job_id']);
            $table->dropForeign(['material_id']);
        });
        Schema::dropIfExists('job_lines');
    }
}

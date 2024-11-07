<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nfc_links', function (Blueprint $table) {
            $table->id();
            $table->string("url_code", 30);
            $table->foreignId('user_id')->nullable();
            $table->foreignId('link_id')->nullable();
            $table->foreignId('link_group_id')->nullable();
            $table->string("batch_id", 20)->nullable();
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
        Schema::dropIfExists('nfc_links');
    }
};

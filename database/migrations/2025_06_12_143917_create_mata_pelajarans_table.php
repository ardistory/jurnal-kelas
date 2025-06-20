<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mata_pelajarans', function (Blueprint $table) {
            $table->unsignedBigInteger('mapel_id')->autoIncrement()->primary();
            $table->string('kode_mapel')->unique();
            $table->string('nama_mapel');
            $table->text('deskripsi')->nullable(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mata_pelajarans', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::dropIfExists('mata_pelajarans');
    }
};

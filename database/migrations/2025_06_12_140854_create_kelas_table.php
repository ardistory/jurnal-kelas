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
        Schema::create('kelas', function (Blueprint $table) {
            $table->unsignedBigInteger('kelas_id')->autoIncrement()->primary();
            $table->string('nama_kelas');
            $table->string('jurusan')->nullable(true);
            $table->unsignedBigInteger('tahun_ajaran_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('tahun_ajaran_id')->references('tahun_ajaran_id')->on('tahun_ajarans');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kelas', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::dropIfExists('kelas');
    }
};

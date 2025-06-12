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
        Schema::create('wali_kelas', function (Blueprint $table) {
            $table->unsignedBigInteger('wali_kelas_id')->autoIncrement()->primary();
            $table->unsignedBigInteger('guru_id')->unique();
            $table->unsignedBigInteger('kelas_id')->unique();
            $table->unsignedBigInteger('tahun_ajaran_id')->unique();
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable(true);

            $table->foreign('guru_id')->references('guru_id')->on('gurus');
            $table->foreign('kelas_id')->references('kelas_id')->on('kelas');
            $table->foreign('tahun_ajaran_id')->references('tahun_ajaran_id')->on('tahun_ajarans');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wali_kelas');
    }
};

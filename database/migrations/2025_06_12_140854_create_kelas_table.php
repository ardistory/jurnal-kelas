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
            $table->timestamp('deleted_at')->nullable(true);

            $table->foreign('tahun_ajaran_id')->references('tahun_ajaran_id')->on('tahun_ajarans');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelas');
    }
};

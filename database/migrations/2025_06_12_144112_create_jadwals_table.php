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
        Schema::create('jadwals', function (Blueprint $table) {
            $table->unsignedBigInteger('jadwal_id')->autoIncrement()->primary();
            $table->unsignedBigInteger('kelas_id');
            $table->unsignedBigInteger('mapel_id');
            $table->unsignedBigInteger('guru_id');
            $table->enum('hari', ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'])->nullable(true);
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwals');
    }
};

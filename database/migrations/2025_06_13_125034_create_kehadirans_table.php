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
        Schema::create('kehadirans', function (Blueprint $table) {
            $table->unsignedBigInteger('kehadiran_id')->autoIncrement()->primary();
            $table->unsignedBigInteger('jadwal_id');
            $table->unsignedBigInteger('siswa_id');
            $table->date('tanggal_kehadiran');
            $table->enum('status_kehadiran', ['Hadir', 'Izin', 'Sakit', 'Alpa']);
            $table->text('catatan_guru')->nullable(true);
            $table->unsignedBigInteger('diinput_oleh_guru_id')->nullable(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('jadwal_id')->references('jadwal_id')->on('jadwals');
            $table->foreign('siswa_id')->references('siswa_id')->on('siswas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kehadirans', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::dropIfExists('kehadirans');
    }
};

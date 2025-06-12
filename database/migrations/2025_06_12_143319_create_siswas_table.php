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
        Schema::create('siswas', function (Blueprint $table) {
            $table->unsignedBigInteger('siswa_id')->autoIncrement()->primary();
            $table->string('NIS')->unique();
            $table->string('NISN')->unique()->nullable(true);
            $table->string('nama_lengkap');
            $table->string('tempat_lahir')->nullable(true);
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['laki-laki', 'perempuan']);
            $table->text('alamat')->nullable(true);
            $table->string('nomor_telepon_siswa')->nullable(true);
            $table->string('nama_wali_murid')->nullable(true);
            $table->string('nomor_telepon_wali_murid')->nullable(true);
            $table->unsignedBigInteger('kelas_id');
            $table->enum('status_siswa', ['Aktif', 'Lulus', 'Pindah', 'Keluar'])->default('Aktif');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswas');
    }
};

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
        Schema::create('kurikulums', function (Blueprint $table) {
            $table->unsignedBigInteger('kurikulum_id')->autoIncrement()->primary();
            $table->unsignedBigInteger('user_id')->unique();
            $table->string('NIP_NIDN')->unique();
            $table->string('nama_lengkap');
            $table->text('alamat')->nullable(true);
            $table->string('nomor_telepon')->nullable(true);
            $table->date('tanggal_lahir')->nullable(true);
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable(true);

            $table->foreign('user_id')->references('user_id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kurikulums');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TahunAjaran extends Model
{
    protected $table = 'tahun_ajarans';
    protected $primaryKey = 'tahun_ajaran_id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function kelas(): HasMany
    {
        return $this->hasMany(Kelas::class, 'tahun_ajaran_id', 'tahun_ajaran_id');
    }

    public function jadwal(): HasMany
    {
        return $this->hasMany(Jadwal::class, 'tahun_ajaran_id', 'tahun_ajaran_id');
    }

    public function waliKelas(): HasMany
    {
        return $this->hasMany(WaliKelas::class, 'tahun_ajaran_id', 'tahun_ajaran_id');
    }
}

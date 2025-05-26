<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    protected $table = 'roles';
    protected $primaryKey = 'level';
    protected $keyType = 'int';
    public $incrementing = false;
    public $timestamps = false;
    protected $guarded = [];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'role_level', 'level');
    }
}

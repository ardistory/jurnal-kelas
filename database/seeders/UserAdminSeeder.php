<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->create([
            'name' => 'Developer',
            'email' => 'dev@localhost',
            'password' => Hash::make('dev123'),
            'role_level' => 1,
            'is_user_verified' => true,
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'level' => 1,
                'name' => 'Developer',
            ],
            [
                'level' => 2,
                'name' => 'Admin',
            ],
            [
                'level' => 3,
                'name' => 'Staff',
            ],
            [
                'level' => 4,
                'name' => 'Member',
            ],
        ];

        foreach ($roles as $role) {
            Role::query()->create($role);
        }
    }
}

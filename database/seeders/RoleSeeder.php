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
                'name' => 'Developer',
            ],
            [
                'name' => 'Admin',
            ],
            [
                'name' => 'Staff',
            ],
            [
                'name' => 'Member',
            ],
        ];

        foreach ($roles as $key => $role) {
            Role::query()->create([
                'level' => $key + 1,
                'name' => $role['name'],
            ]);
        }
    }
}

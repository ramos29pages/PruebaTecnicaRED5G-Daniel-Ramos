<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'dni' => '12345678',
            'name' => 'Admin User',
            'username' => 'admin',
            'password' => Hash::make('admin'),
            'is_admin' => true,
        ]);
    }
}

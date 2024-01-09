<?php

use App\Http\Controllers\ConfirmController;
use App\Http\Controllers\PendingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/payments-status', [PendingController::class, 'index'] );
Route::post('/payments-pending', [PendingController::class, 'store'] );
Route::post('/payments-confirm', [ConfirmController::class, 'store'] );

Route::get('/users', [UserController::class, 'index'] );
Route::get('/users/{id}', [UserController::class, 'show'] );
Route::post('/users', [UserController::class,'store'] );
Route::post('/login', [UserController::class,'login'] );
<?php

use App\Http\Controllers\JobsCategoryController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [UserController::class, "createUser"]);
Route::post('/login', [UserController::class, "checkLogin"]);
Route::post('/profile/edit_data', [UserController::class, "editProfileData"]);
Route::post('/profile/edit_password', [UserController::class, "editProfilePassword"]);

Route::post('/job/create', [JobsController::class, "store"]);
Route::post('/job/filter', [JobsController::class, "filter"]);
Route::get('/job/{id}', [JobsController::class, "getJob"]);
Route::post('/job/{id}/cv', [JobsController::class, "applyCV"]);


Route::get('/get_user', [UserController::class, "getUser"]);
Route::get('/get_categories', [JobsCategoryController::class, "getCategories"]);
Route::get('/jobs/get', [JobsController::class, "getJobs"]);


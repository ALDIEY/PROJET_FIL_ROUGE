<?php

use App\Http\Controllers\AnneeController;
use Illuminate\Http\Request;
use App\Http\Resources\UserRessource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\CourController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\SemestreController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use App\Models\User;

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

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {

  Route::get('user', function (Request $request) {
    return new UserRessource($request->user());
  });

  Route::get('users', [UserController::class, 'allUsers']);

  Route::post('logout', function (Request $request) {
    $request->user()->token()->revoke();
    return response()->json(['message' => 'Logged out'], 200);
  });
});
Route::post('users',[UserController::class,'store']);

Route::post('/annees',[AnneeController::class,'creeAnnes']);
Route::get('/annees',[AnneeController::class,'index']);
Route::get('/sessions/{date}', [SessionController::class,'getSessionsByDate']);


// {
//   "password":"cheikhaldiey",
//   "login":"aldiey"
  
//   }


Route::post('/classes', [ClasseController::class, 'store']);
Route::get('/classes', [ClasseController::class, 'index']);
Route::get('/planifier',[ClasseController::class,'getClassesPlanifiees']);
Route::get('/nonplanifier',[ClasseController::class,'getClassesNonPlanifiees']);
Route::post('/classeplanifier ', [ClasseController::class, 'planifierClasses']);
Route::get('/filiere',[ClasseController::class,'getFiliere']);


Route::post('/professeurs', [ProfesseurController::class, 'store']);
Route::get('/professeurs', [ProfesseurController::class, 'index']);

Route::post('/salles', [SalleController::class, 'store']);
Route::get('/salles', [SalleController::class, 'index']);

Route::post('/semestres', [SemestreController::class, 'store']);
Route::get('/semestres', [SemestreController::class, 'index']);


Route::post('/cours', [CourController::class, 'store']);
Route::get('/cours',[CourController::class, 'index']);
Route::get('/encours',[CourController::class,'getCoursEnCours']);
Route::get('/terminer',[CourController::class,'getCoursTermines']);


Route::post('/sessions', [SessionController::class, 'store']);


Route::get('/modules',[ModuleController::class,'index']);

Route::get('cours/classe',[CourController::class,'getCourclasse']);


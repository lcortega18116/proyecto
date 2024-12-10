<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryVisualController;
use App\Http\Controllers\ShoeVisualController;
use Inertia\Inertia;

Route ::get('/', [ShoeVisualController::class, 'index2']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::resource('Categories', CategoryVisualController::class);
Route::resource('Shoes', ShoeVisualController::class);
Route::delete('/categories/{category}', [CategoryVisualController::class, 'destroy'])->name('Categories.destroy');
Route::get('/categories/{category}', [CategoryVisualController::class, 'edit'])->name('Categories.edit');

Route::put('/categories/{category}', [CategoryVisualController::class, 'update'])->name('Categories.update');
    
Route::delete ('/shoes/{shoe}', [ShoeVisualController::class, 'destroy']) ->name('Shoes.destroy');
Route::get('/shoes/{shoe}', [ShoeVisualController::class, 'edit'])->name('Shoes.edit');

Route::post('/shoes/{shoe}', [ShoeVisualController::class, 'update'])->name('Shoes.update');

//slug
Route::get('/shoes/{slug}', [ShoeVisualController::class, 'show'])->name('shoes.show');
Route::get('/categories/{slug}', [CategoryVisualController::class, 'show'])->name('categories.show');


require __DIR__.'/auth.php';

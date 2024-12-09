<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\StoreCategoryMail;

class CategoryVisualController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Categories/index',[
            'categories' => Category::all(),
        ]);
    }
    public function index2()
    {
        return Categories::all();
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $category = Category::create($request->all());
            Mail::to($request->user())->send(new StoreCategoryMail($category));
            // Optional: Add a flash message for successful creation
            return to_route('Categories.index')->with('success', 'Category created successfully.');
        } catch (\Exception $e) {
            // Handle potential errors during creation
            return to_route('Categories.index')->with('error', 'Unable to create the category.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Categories/edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $category->update($request->all());

            // Optional: Add a flash message for successful update
            return to_route('Categories.index')->with('success', 'Category updated successfully.');
        } catch (\Exception $e) {
            // Handle potential errors during update
            return to_route('Categories.index')->with('error', 'Unable to update the category.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            $category->delete();

            // Optional: Add a flash message for successful deletion
            return to_route('Categories.index')->with('success', 'Category deleted successfully.');
        } catch (\Exception $e) {
            // Handle potential errors during deletion
            return to_route('Categories.index')->with('error', 'Unable to delete the category.');
        }
    }
}

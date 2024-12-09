<?php

namespace App\Http\Controllers;

use App\Models\Shoe;
use Illuminate\Support\Facades\Mail;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Mail\StoreShoeMail;
use Illuminate\Support\Str;

class ShoeVisualController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Shoes/index', [
            'shoes' => Shoe::with('category')->get(),
            'categories' => Category::all()
        ]);
    }

    public function index2()
    {
        return Inertia::render('Welcome', [
            'shoes' => Shoe::with('category')->get(),
            'categories' => Category::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Shoes/create', [
            'categories' => Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     Mail::to($request->user())->send(new StoreShoeMail($shoe));
    // }

    /**
     * Display the specified resource.
     */
    public function store(Request $request)
    {
        try {
            // Validate the incoming request data
            $shoe = $request->request->all();

            // Handle image upload

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $shoe['image'] = '/images/' . $imageName;
            }
    

            // Generate slug
            $shoe['slug'] = Str::slug($shoe['name']);

            // Create the shoe
            $shoe = Shoe::create($shoe);

            // Send email notification
            Mail::to($request->user())->send(new StoreShoeMail($shoe));

            // Redirect with success message
            return to_route('Shoes.index')->with('success', 'Shoe created successfully.');

        } catch (\Exception $e) {
            // Log the error for internal tracking
            Log::error('Shoe creation failed: ' . $e->getMessage());

            // Redirect with error message
            return to_route('Shoes.index')->with('error', 'Unable to create the shoe.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shoe $shoe)
    {
        return Inertia::render('Shoes/edit', [
            'shoe' => $shoe,
            'categories' => Category::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shoe $shoe)
    {
        try {
            // Validate the incoming request data
            $shoeData = $request->request->all();
            
            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($shoe->image && file_exists(public_path(ltrim($shoe->image, '/')))) {
                    unlink(public_path(ltrim($shoe->image, '/')));
                }
                
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $shoeData['image'] = '/images/' . $imageName;
            } else {
                // Keep the existing image if no new image is uploaded
                unset($shoeData['image']);
            }

            // Generate slug (optional, only if name changes)
            if (isset($shoeData['name']) && $shoeData['name'] !== $shoe->name) {
                $shoeData['slug'] = Str::slug($shoeData['name']);
            }

            // Update the shoe
            $shoe->update($shoeData);

            // Redirect with success message
            return to_route('Shoes.index')->with('success', 'Shoe updated successfully.');
        } catch (\Exception $e) {
            // Log the error for internal tracking
            Log::error('Shoe update failed: ' . $e->getMessage());

            // Redirect with error message
            return to_route('Shoes.index')->with('error', 'Unable to update the shoe.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shoe $shoe)
    {
        try {
            $shoe->delete();

            // Optional: Add a flash message for successful deletion
            return to_route('Shoes.index')->with('success', 'Shoe deleted successfully.');
        } catch (\Exception $e) {
            // Handle potential errors during deletion
            return to_route('Shoes.index')->with('error', 'Unable to delete the Shoe.');
        }
    }
}

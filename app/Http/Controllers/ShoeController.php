<?php

namespace App\Http\Controllers;

use App\Models\Shoe;
use App\Http\Requests\StoreShoeRequest;
use App\Http\Requests\UpdateShoeRequest;

class ShoeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
        $shoe = Shoe::with('category:id,name')->get();
        $newshoe = $shoe->map(function($shoe){
            return [
                'id' => $shoe->id,
                'name' => $shoe->name,
                'description' => $shoe->description,
                'price' => $shoe->price,
                'stock' => $shoe->stock,
                'slug' => $shoe->slug,
                'image' => $shoe->image,
                'category' => $shoe->category->name
            ];
        });
        return $newshoe;

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShoeRequest $request)
    {
        //
        $shoe = new Shoe();
        $shoe->name = $request->name;
        $shoe->description = $request->description;
        $shoe->price = $request->price;
        $shoe->stock = $request->stock;
        $shoe->slug = $request->name;
        $shoe->image = $request->image;
        $shoe->category_id = $request->category_id;
        $shoe->save();
        return $shoe;
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Shoe $shoe)
    {
        return $shoe->load('category');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShoeRequest $request, Shoe $shoe)
    {
        //
        $shoe->update($request->all());
        return $shoe;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shoe $shoe)
    {
        //
        $shoe->delete();
    }
}

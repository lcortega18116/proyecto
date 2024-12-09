<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shoe extends Model
{
    /** @use HasFactory<\Database\Factories\ShoeFactory> */
    use HasFactory;
    protected $fillable = ['name','slug', 'description', 'price', 'stock', 'image','category_id'];
    
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}

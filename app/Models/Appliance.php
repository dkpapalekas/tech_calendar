<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appliance extends Model
{
    use HasFactory;

    protected $table = 'appliances';
    protected $fillable = [
        'name',
        'brand',
        'model',
        'year',
        'remarks',
    ];

    public function jobs()
    {
        //will match customer with company_id
        return $this->hasMany(Job::class);
    }
}

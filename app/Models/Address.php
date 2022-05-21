<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $table = 'addresses';
    protected $fillable = [
        'customer_id',
        'name',
        'number',
        'city',
        'floor',
        'remarks'
    ];

    public function customer()
    {
        //will match address with customer_id
        return $this->belongsTo(Customer::class);
    }

    //and has many Jobs
}

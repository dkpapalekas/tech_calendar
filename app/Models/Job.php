<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $table = 'jobs';
    protected $fillable = [
        'address_id',
        'appliance_id',
        'client_status',
        'date',
        'agreed_price',
        'is_completed',
    ];

    public function address()
    {
        //will match address with customer_id
        return $this->belongsTo(Address::class);
    }

    //TODO belongs to appliance

    //TODO has many job_lines!
}

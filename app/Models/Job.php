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
        //will match customer with company_id
        return $this->belongsTo(Address::class);
    }

    public function appliance()
    {
        //will match customer with company_id
        return $this->belongsTo(Appliance::class);
    }

    public function job_lines()
    {
        //will match customer with company_id
        return $this->hasMany(Job_Line::class);
    }
}

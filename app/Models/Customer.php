<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customers';
    protected $fillable = [
        'company_id',
        'name',
        'surname',
        'telephone',
        'remarks'
    ];

    public function company()
    {
        //will match customer with company_id
        return $this->belongsTo(Company::class);
    }
}

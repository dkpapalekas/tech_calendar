<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table = 'companies';
    protected $fillable = [
        'name',
        'address',
        'city',
        'profession',
        'vat',
        'irs'
    ];

    public function customers()
    {
        //will match customer with company_id
        return $this->hasMany(Customer::class);
    }
}

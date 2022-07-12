<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

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

    public function scopeWithAddresses($q)
    {
        if (property_exists($q, 'withAddresses')) return $q;
        $q->withAddresses = true;
        $q->join('addresses', 'addresses.id', 'jobs.address_id');
        return $q;
    }

    public function scopeWithCustomers($q)
    {
        if (property_exists($q, 'withCustomers')) return $q;
        $q->withCustomers = true;
        $q->withAddresses()
            ->join('customers', 'customers.id', 'addresses.customer_id');
        return $q;
    }

    public function scopeWithAppliances($q)
    {
        if (property_exists($q, 'withAppliances')) return $q;
        $q->withAppliances = true;
        $q->withAddresses()
            ->join('appliances', 'appliances.id', 'jobs.appliance_id');
        return $q;
    }

    public static function indexTableData(): LengthAwarePaginator {
        return Job::select(
            'jobs.*',
            'addresses.id as address_id',
            'addresses.name as address_name',
            'addresses.number as address_number',
            'addresses.city as address_city',
            'addresses.floor as address_floor',
            'customers.name as customer_name',
            'customers.surname as customer_surname',
            'customers.id as custommer_id',
            'appliances.name as appliance_name',
        )
            ->withAddresses()
            ->withCustomers()
            ->withAppliances()
            ->paginate(1000);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job_Line extends Model
{
    use HasFactory;

    protected $table = 'job_lines';
    protected $fillable = [
        'job_id',
        'material_id',
        'quantity',
        'price',
        'status',
        'remarks',
    ];

    public function job()
    {
        //will match job_line with job_id
        return $this->belongsTo(Job::class);
    }

    public function material()
    {
        //will match job_line with material_id
        return $this->belongsTo(Material::class);
    }
}

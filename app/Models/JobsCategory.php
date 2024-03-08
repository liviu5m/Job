<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobsCategory extends Model
{

    protected $table = "jobs_categories";
    protected $guarded = [];

    use HasFactory;
}

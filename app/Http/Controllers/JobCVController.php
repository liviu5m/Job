<?php

namespace App\Http\Controllers;

use App\Models\JobCV;
use Illuminate\Http\Request;

class JobCVController extends Controller
{
    public function store($url, $id) {
        JobCV::create([
            "cv_url" => $url,
            "job_id" => $id,
        ]);
    }
}

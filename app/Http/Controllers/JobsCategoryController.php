<?php

namespace App\Http\Controllers;

use App\Models\JobsCategory;
use Illuminate\Http\Request;

class JobsCategoryController extends Controller
{
    public function getCategories() {
        return response()->json(["categories" => JobsCategory::all()]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Jobs;
use App\Models\JobsCategory;
use Error;
use Illuminate\Http\Request;

class JobsController extends Controller
{

    public function store(Request $request) {
        try {
            $request->validate([
                "title" => ["string", "required"],
                "description" => ["string", "required", "min:10"],
                "city" => ["string", "required"],
                "category" => ["string", "required", "min:1"]
            ]);
            $job = new Jobs();

            $job->title = $request->title;
            $job->description = $request->description;
            $job->city = $request->city;
            $job->category_id = intval($request->category);
            $job->user_id = intval($request->category);
            // return response()->json($job);

            $job->save();

            return response()->json("Job create sucessfull.");
        }catch(Error $e) {
            return response()->json($e->getMessage());
        }
    }

    public function getJobs(Request $request) {

        $jobs = Jobs::query();
        if($request->query("title")) {
            $jobs->where('title', 'like', "%".$request->query('title')."%");
        }

        if($request->query("description")) {
            $jobs->where('description', 'like', "%".$request->query('description')."%");
        }

        if($request->query("category")) {
            $jobs->where('category_id', $request->query("category"));
        }

        $jobs = $jobs->paginate(8);

        foreach($jobs as $job) {
            $job->category = JobsCategory::where("id", $job->category_id)->first()->name;
        }

        return response()->json(["jobs" => $jobs, "title" => $request->query("title")]);
    }

    public function getJob($id) {
        $job = Jobs::where("id", $id)->first();
        $job->category = JobsCategory::where("id", $job->category_id)->first()->name;
        return response()->json($job);
    }

    public function applyCV(Request $request) {
        $JobCVController = new JobCVController();

        $request->validate([
            'file' => 'required|file|max:10240',
        ]);

        if ($request->file('file')->isValid()) {
            $path = $request->file('file')->store('uploads');
            $JobCVController->store($path, $request->jobId);

            return response()->json(['message' => 'File uploaded successfully', 'path' => $path]);
        }

        return response()->json($request);


        // $file = $request->file("file");
        // $filePath = $file->storeAs("/cv", time().$file->name);

    }

    

}

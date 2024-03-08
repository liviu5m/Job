<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function createUser(Request $request) {
        try {
            $data = $request->validate([
                'username' => ['required', 'string', 'max:255'],
                'first_name' => ['required', 'string', 'max:255'],
                'last_name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
                'password' => ['required', 'confirmed', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/'],
                'phone' => ['required', 'string', 'max:20'],
                'address' => ['required', 'string', 'max:100'],
            ]);


            $user = User::create([
                'username' => $data['username'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'phone' => $data['phone'],
                'address' => $data['address'],
            ]);

            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating user', 'error' => $e->getMessage()], 500);
        }

    }

    public function checkLogin(Request $request) {

        $user = User::where("username", $request->username)->first();

        if($user && Hash::check($request->password, $user->password)) return response()->json(['message' => 'Logged in', 'user' => $user], 200);
        else return response()->json(['message' => 'Failed'], 500);
    }

    public function editProfileData(Request $request) {
        try {
            $user = User::where("id", $request->id)->first();

            if($user->email == $request->email) {
                $data = $request->validate([
                    'username' => ['required', 'string', 'max:255'],
                    'first_name' => ['required', 'string', 'max:255'],
                    'last_name' => ['required', 'string', 'max:255'],
                    'phone' => ['required', 'string', 'max:20'],
                    'address' => ['required', 'string', 'max:100'],
                ]);
                $data['email'] = $user->email;
            }else {
                $data = $request->validate([
                    'username' => ['required', 'string', 'max:255'],
                    'first_name' => ['required', 'string', 'max:255'],
                    'last_name' => ['required', 'string', 'max:255'],
                    'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
                    'phone' => ['required', 'string', 'max:20'],
                    'address' => ['required', 'string', 'max:100'],
                ]);
            }


            $user->username = $data['username'];
            $user->first_name = $data['first_name'];
            $user->last_name = $data['last_name'];
            $user->email = $data['email'];
            $user->phone = $data['phone'];
            $user->address = $data['address'];

            $user->save();

            return response()->json(['message' => 'User updated successfully', 'user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating user', 'error' => $e->getMessage()]);
        }
    }

    public function editProfilePassword(Request $request) {
        try {

            $user = User::where("id", $request->id)->first();


            $request->validate([
                'current_password' => ['required'],
                'password' => ['required', 'confirmed', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/'],
            ]);

            if(!Hash::check($request->current_password, $user->password)) return response()->json(['message' => 'Error updating user']);

            $user->password = Hash::make($request->password);
            $user->save();
            return response()->json(['message' => 'User password updated successfully', 'user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating password', 'error' => $e->getMessage()]);
        }

    }

    public function getUser(Request $request) {
        $user = User::find($request->query("id"))->first();

        return response()->json(["user" => $user]);
    }
}

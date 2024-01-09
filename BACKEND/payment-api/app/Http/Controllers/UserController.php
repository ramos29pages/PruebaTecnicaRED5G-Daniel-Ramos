<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

/**
 * Display the specified resource.
 *
 * @param  int  $id
 * @return \Illuminate\Http\Response
 */
class UserController extends Controller
{

    public function store(Request $request)
    {
        $user = new User;

        $request->validate([
            'dni' => 'required',
            'name' => 'required',
            'username' => 'required',
            'password' => 'required',
        ]);

        $user->dni = $request->dni;
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = $request->password;
        if ($request->email) {
            $user->email = $request->email;
        }

        $user->save();
        return response()->json($user, 201);
    }

    public function index()
    {
        $user = User::all();
        return response()->json($user, 200);
    }

    public function show($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json($user, 200);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        // Intenta autenticar al usuario
        if (Auth::attempt($credentials)) {
            // Si la autenticación fue exitosa, verifica si el usuario es un administrador
            $user = Auth::user();
            if ($user->is_admin) {
                // El usuario es un administrador, por lo que el inicio de sesión es exitoso
                return response()->json(['message' => 'Login successful'], 200);
            } else {
                // El usuario no es un administrador, por lo que el inicio de sesión falla
                Auth::logout();
                return response()->json(['message' => 'Only admins can log in'], 403);
            }
        } else {
            // La autenticación falló
            return response()->json(['message' => 'Invalid username or password'], 401);
        }
    }

}

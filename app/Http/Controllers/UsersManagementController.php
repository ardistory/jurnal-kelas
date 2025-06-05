<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usersAll = User::query()->with('roles')->get();
        $usersPaginate = User::with('roles')->paginate(5);
        $roles = Role::all();

        return Inertia::render('UsersManagement', [
            'usersPaginate' => $usersPaginate,
            'roles' => $roles,
            'usersAll' => $usersAll,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'newName' => 'required|string',
            'newRoleLevelValue' => 'required|integer',
        ]);

        User::query()->where('id', '=', $request['id'])->update([
            'name' => $request['newName'],
            'role_level' => $request['newRoleLevelValue'],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }
}

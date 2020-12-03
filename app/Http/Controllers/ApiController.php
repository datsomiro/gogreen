<?php

namespace App\Http\Controllers;

use App\Models\Trash;
use App\Models\User;
use Illuminate\Http\Request;
use ImageHandler;

class ApiController extends Controller
{
    public function trashsApi($id)
    {
        $user_id = $id;
        $trashes = Trash::where('user_id', $user_id)->get();

        return [
            'trashes' => $trashes,
        ];
    }

    public function trash($id, Request $request)
    {

        $this->validate($request, [
            'location' => 'string | max: 100',
            'type' => 'string | max: 100',
        ]);

        $name = $request->input('location');
        $breed = $request->input('type');
        $image = $request->file('trashImage');

        $img = ImageHandler::make($image->getRealPath());
        $img->orientate();
        $exif = $img->exif();
        $img->resize(1000, 1000, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $img->save();

        // save picture to the disk
        $path = $image->store('public/users-images');

        $allowed_extensions = ['jpg', 'png', 'jpeg', 'bmp', 'JPG','JPEG'];

        if ($request->hasFile('trashImage')) {

            $original_extension = $image->getClientOriginalExtension();

            if (in_array($original_extension, $allowed_extensions) === false) {
                return response('Invalid file type.', 400)
                    ->header('Content-Type', 'application/json');
            }
        }

        $file_name = substr($path, 20, strlen($path) - 20);
        $trash = new Trash;
        $trash->user_id = $id;
        $trash->name = $location;
        $trash->breed = $type;
        $trash->image = $file_name;
        $trash->save();
        $trash_id = $trash->id;

        return response(compact('location', 'type', 'file_name', 'trash_id'), 200)
            ->header('Content-Type', 'application/json');

    }

    public function profilePicture($id, Request $request)
    {
        $image = $request->file('userImage');

        $img = ImageHandler::make($image->getRealPath());
        $img->orientate();
        $img->resize(1000, 1000, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $img->save();

        $path = $image->store('public/users-images');

        $allowed_extensions = ['jpg', 'png', 'jpeg', 'bmp'];

        if ($request->hasFile('trashImage')) {

            $original_extension = $image->getClientOriginalExtension();

            if (in_array($original_extension, $allowed_extensions) === false) {
                return response('Invalid file type.', 400)
                    ->header('Content-Type', 'application/json');
            }
        }
        $file_name = substr($path, 20, strlen($path) - 20);

        $user = User::where('id', $id)->first();
        $user->photo = $file_name;
        $user->save();

        return response(compact('file_name'), 200)
            ->header('Content-Type', 'application/json');

    }
}


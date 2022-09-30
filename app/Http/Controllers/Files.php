<?php

namespace App\Http\Controllers;
use Storage;
use Symfony\Component\Finder\Exception\DirectoryNotFoundException;
use Illuminate\Http\Request;

class Files extends Controller {
   public function index() {
      try {
         return Storage::disk('local')->files('public/pics');
      } catch (DirectoryNotFoundException $e) {
         return [];
      }
   }

   public function create(Request $request) {
      $request->validate([
         'file' => 'required'
      ]);
      $file = $request->file('file');
      Storage::disk('local')->put(
         'public/pics/' . $file->getClientOriginalName(),
         $file->get(),
      );
      return $file->getClientOriginalName();
   }

   // static function decent_filename() {
   //    return time() . '.jpg';
   // }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['name', 'description', 'price', 'user_id'];

    public function user() {
        return $this->belongsTo('App\User');
    }
}

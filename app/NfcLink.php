<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NfcLink extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "user_id",
        "link_group_id",
        "url_code",
        "batch_id"
    ];

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Common\Search\Searchable;

class Contact extends Model
{
    use HasFactory, Searchable;

    const MODEL_TYPE = 'contacts';

    protected $fillable = [
        "id",
        "user_id",
        "name",
        "email",
        "phone",
        "message"
    ];


    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'message' => $this->message,
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'message' => $this->message,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }


    public static function filterableFields(): array
    {
        return [
            'id',
            'name',
            'email',
            'phone',
            'message',
            'created_at',
            'updated_at',
        ];
    }

    public static function getModelTypeAttribute(): string
    {
        return static::MODEL_TYPE;
    }

}

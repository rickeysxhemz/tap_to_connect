<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ContactExport implements FromCollection, WithMapping, WithHeadings
{

    protected  $contacts;

    public function __construct($contacts){

        $this->contacts = $contacts;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->contacts;
    }


    publiC function headings():array
    {
        return [
            "Name",
            "Email",
            "Phone",
            "Note",
            "Created At"
        ];
    }

    public function map($contact): array
    {
        return [
            $contact->name,
            $contact->email,
            $contact->phone,
            $contact->message,
            $contact->created_at->format("d-M-Y"),
        ];
    }

}

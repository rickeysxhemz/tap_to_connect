<x-mail::message>
Dear {{$biolink->name}},

You received the following contact details:

Name: {{request('name')}}<br/>
E-mail: {{request('email')}}<br/>
Phone Number: {{request('phone')}}<br/>
Note: {{request('message')}}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

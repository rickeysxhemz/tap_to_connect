<?php

namespace Common\NfcLink;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NfcLinkResource extends JsonResource
{
    /**
     * @var NfcLink
     */
    public $resource;

    /**
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'url_code' => $this->url_code,
            'forward_to' => $this->url_code,
            'forward_id' => $this->url_code,
            'name' => $this->url_code,
            'link' => $this->url_code,
            'copy_url' => $this->url_code,
            'username' => $this->url_code,
        ];
    }
}



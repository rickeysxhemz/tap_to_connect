<?php

namespace Common\Auth\Jobs;

use Common\Csv\BaseCsvExportJob;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use App\NfcLink;
use App\Biolink;
use App\Link;
use App\User;

class ExportNfcCsv extends BaseCsvExportJob
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var int
     */
    protected $requesterId;

    public function __construct(int $requesterId)
    {
        $this->requesterId = $requesterId;
    }

    public function cacheName(): string
    {
        return 'nfclinks';
    }

    protected function generateLines()
    {
        $selectCols = [
            'id',
            'url_code',
            'created_at',
        ];

        NfcLink::select($selectCols)->chunkById(100, function (Collection $chunk) {
            $chunk->each(function (NfcLink $nfclink) {
                $data = [];

                $data['id'] = $nfclink->id;
                $data['code'] = $nfclink->url_code;
                $data['card_url'] = url("/")."/business-card/".$nfclink->url_code;
                $data['created_at'] = $nfclink->created_at->format("m-d-Y");

                $this->writeLineToCsv($data);
            });
        });
    }
}

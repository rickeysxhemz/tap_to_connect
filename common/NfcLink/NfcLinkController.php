<?php

namespace Common\NfcLink;

// use App\NfcLink as AppNfcLink;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use DB;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Str;
use App\Biolink;
use App\Link;
use App\User;

class NfcLinkController extends BaseController
{
    public function __construct(protected Request $request)
    {

    }

    public function index()
    {
        // $this->authorize('index', NfcLink::class);

        $builder = $this->getModel()->newQuery();

        // don't show "label" tags in bedrive
        $authUser = \Auth::user();
        if(!$authUser->hasPermission('nfclinks.update')){
          $builder->where("user_id", $authUser->id);
        }

        if(request('query')){
            $q = request('query');
            $builder->where('url_code', "like", "%$q%");
        }

        $dataSource = new Datasource($builder, $this->request->all());

        $pagination = $dataSource->paginate()->toArray();

        $pagination['data'] = array_map(function ($nfclink) {

          if(isset($nfclink['link_group_id'])){
            $digital_profile = Biolink::where("id", $nfclink['link_group_id'])->first();
            $nfclink['forward_to'] = "digital_profile";
            $nfclink['forward_id'] = $digital_profile?->id;
            $nfclink['name'] = $digital_profile?->name;
            $nfclink['link'] = $digital_profile ? url('/')."/".$digital_profile?->hash : "";
          }else if(isset($nfclink['link_id'])){
            $link = Link::where("id", $nfclink['link_id'])->first();
            $nfclink['forward_to'] = "link";
            $nfclink['forward_id'] = $link?->id;
            $nfclink['name'] = $link?->name;
            $nfclink['link'] = $link?->long_url;
          }

          $nfclink['copy_url'] = url("/")."/business-card/".$nfclink['url_code'];

          $nfcUser = User::where('id', $nfclink['user_id'])->first();
          $nfclink['username'] = $nfcUser?->name ?: $nfcUser?->email;

          return $nfclink;
        }, $pagination['data']);

        return $this->success(['pagination' => $pagination]);
    }

    public function store()
    {
        // $this->authorize('store', NfcLink::class);

        $this->validate($this->request, [
            'quantity' => 'required|numeric|min:1',
        ]);


        // $authUser = Auth::user();
        $number_of_links = $this->request->get("quantity");

        $batch_id = Str::random(5);

        $csvData = [];
        for($i = 0; $i < $number_of_links; $i++){

            $url_code = Str::random(4)."-".Str::random(4)."-".Str::random(4)."-".Str::random(4);
            $url_code = strtoupper($url_code);

            $nfclink = new NfcLink();
            $nfclink->url_code = $url_code;
            $nfclink->batch_id = $batch_id;
            $nfclink->save();

            array_push($csvData, [
                $nfclink->id,
                $url_code,
                url("/")."/business-card/".$url_code,
                $nfclink->created_at->format("m-d-Y")
            ]);
        }

        // Start the output buffer.
        ob_start();

        // Set PHP headers for CSV output.
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=nfc_export.csv');

        // Create the headers.
        $header_args = array( 'ID', 'Code', 'Card URL', "Created at" );

        // Prepare the content to write it to CSV file.
        // $data = array(
        //     array('1', 'Test 1', 'test1@test.com'),
        //     array('2', 'Test 2', 'test2@test.com'),
        //     array('3', 'Test 3', 'test3@test.com'),
        // );

        // Clean up output buffer before writing anything to CSV file.
        ob_end_clean();

        // Create a file pointer with PHP.
        // $output = fopen( 'php://output', 'w' );
        $output = fopen( 'nfc.csv', 'w' );

        // Write headers to CSV file.
        fputcsv( $output, $header_args );

        // Loop through the prepared data to output it to CSV file.
        foreach( $csvData as $data_item ){
            fputcsv( $output, $data_item );
        }

        // Close the file pointer with PHP with the updated output.
        fclose( $output );
        // exit();
        // exit;
        // $nfclink = $this->getModel()->create([
        //     'name' => $this->request->get('name'),
        //     'display_name' => $this->request->get('display_name'),
        //     'type' => $this->request->get('type'),
        // ]);

        return $this->success(['nfclink' => $nfclink]);
    }

    public function update(int $nfclinkId)
    {
        $this->authorize('update', NfcLink::class);

        $this->validate($this->request, [
            'name' => "string|min:2|unique:nfclinks,name,$nfclinkId",
            'display_name' => 'string|min:2',
            'type' => 'string|min:2',
        ]);

        $nfclink = $this->getModel()->findOrFail($nfclinkId);

        $nfclink->fill($this->request->all())->save();

        return $this->success(['nfclink' => $nfclink]);
    }

    public function destroy(string $ids)
    {
        $nfclinkIds = explode(',', $ids);
        // $this->authorize('destroy', [NfcLink::class, $nfclinkIds]);

        $this->getModel()
            ->whereIn('id', $nfclinkIds)
            ->delete();
        // DB::table('taggables')
        //     ->whereIn('tag_id', $nfclinkIds)
        //     ->delete();

        return $this->success();
    }

    protected function getModel(): NfcLink
    {
        return app(NfcLink::class);
        // return app(class_exists(AppNfcLink::class) ? AppNfcLink::class : NfcLink::class);
    }
}

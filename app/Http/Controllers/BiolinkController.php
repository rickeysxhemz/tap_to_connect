<?php

namespace App\Http\Controllers;

use App\Actions\Biolink\AddInitialContentToBiolink;
use App\Biolink;
use App\BiolinkAppearance;
use App\Http\Requests\CrupdateLinkGroupRequest;
use App\LinkGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JeroenDesloovere\VCard\VCard;
use App\BiolinkWidget;
use Illuminate\Support\Facades\Response;
use App\Mail\ConnectMail;
use App\Contact;
use App\Http\Resources\ContactResource;
use Common\Database\Datasource\Datasource;
use Excel;
use App\Exports\ContactExport;
use App\User;

class BiolinkController extends LinkGroupController
{
    public function __construct(Biolink $model, Request $request)
    {
        parent::__construct($model, $request);
    }

    public function store(CrupdateLinkGroupRequest $request)
    {
        $response = parent::store($request);
        $biolink = $response->getOriginalContent()['biolink'];

        app(AddInitialContentToBiolink::class)->execute($biolink['id'], Auth::user());

        return $response;
    }

    public function show(LinkGroup $biolink)
    {
        $this->authorize('show', $biolink);

        if ($this->request->get('loadContent')) {
          /** @var Biolink $biolink */
          $biolink->loadContent();
        }

        return $this->success(['biolink' => $biolink]);
    }

    public function downloadVcf($id){

      $bio_widget = BiolinkWidget::find($id);

      $config = (object) $bio_widget->config;

      $prefix = property_exists($config, "prefix") ? $config->prefix : "";
      $first_name = property_exists($config, "first_name") ? $config->first_name : "";
      $middle_name = property_exists($config, "middle_name") ? $config->middle_name : "";
      $last_name = property_exists($config, "last_name") ? $config->last_name : "";
      $suffix = property_exists($config, "suffix") ? $config->suffix : "";
      $nickname = property_exists($config, "nickname") ? $config->nickname : "";
      $organization = property_exists($config, "organization") ? $config->organization : "";
      $title = property_exists($config, "title") ? $config->title : "";
      $role = property_exists($config, "role") ? $config->role : "";
      $work_url = property_exists($config, "work_url") ? $config->work_url : "";
      $email = property_exists($config, "email") ? $config->email : "";
      $work_email = property_exists($config, "work_email") ? $config->work_email : "";
      $home_phone = property_exists($config, "home_phone") ? $config->home_phone : "";
      $work_phone = property_exists($config, "work_phone") ? $config->work_phone : "";
      $cell_phone = property_exists($config, "cell_phone") ? $config->cell_phone : "";
      $home_fax = property_exists($config, "home_fax") ? $config->home_fax : "";
      $work_fax = property_exists($config, "work_fax") ? $config->work_fax : "";
      $home_address_label = property_exists($config, "home_address_label") ? $config->home_address_label : "Home Address";
      $home_address_street = property_exists($config, "home_address_street") ? $config->home_address_street : "";
      $home_address_city = property_exists($config, "home_address_city") ? $config->home_address_city : "";
      $home_address_state_or_province = property_exists($config, "home_address_state_or_province") ? $config->home_address_state_or_province : "";
      $home_address_postal_code = property_exists($config, "home_address_postal_code") ? $config->home_address_postal_code : "";
      $home_address_country = property_exists($config, "home_address_country") ? $config->home_address_country : "";
      $work_address_label = property_exists($config, "work_address_label") ? $config->work_address_label : "Work Address";
      $work_address_street = property_exists($config, "work_address_street") ? $config->work_address_street : "";
      $work_address_city = property_exists($config, "work_address_city") ? $config->work_address_city : "";
      $work_address_state_or_province = property_exists($config, "work_address_state_or_province") ? $config->work_address_state_or_province : "";
      $work_address_postal_code = property_exists($config, "work_address_postal_code") ? $config->work_address_postal_code : "";
      $work_address_country = property_exists($config, "work_address_country") ? $config->work_address_country : "";
      $birth_day = property_exists($config, "birth_day") ? $config->birth_day : "";
      $birth_month = property_exists($config, "birth_month") ? $config->birth_month : "";
      $birth_year = property_exists($config, "birth_year") ? $config->birth_year : "";
      $anniversary_day = property_exists($config, "anniversary_day") ? $config->anniversary_day : "";
      $anniversary_month = property_exists($config, "anniversary_month") ? $config->anniversary_month : "";
      $anniversary_year = property_exists($config, "anniversary_year") ? $config->anniversary_year : "";
      $personal_url = property_exists($config, "personal_url") ? $config->personal_url : "";
      $gender = property_exists($config, "gender") ? $config->gender : "";
      $photo = property_exists($config, "photo") ? $config->photo : "";
      $logo = property_exists($config, "logo") ? $config->logo : "";
      $linkedin = property_exists($config, "linkedin") ? $config->linkedin : "";
      $twitter = property_exists($config, "twitter") ? $config->twitter : "";
      $facebook = property_exists($config, "facebook") ? $config->facebook : "";
      $instagram = property_exists($config, "instagram") ? $config->instagram : "";
      $youtube = property_exists($config, "youtube") ? $config->youtube : "";
      $note = property_exists($config, "note") ? $config->note : "";
      $uid = property_exists($config, "uid") ? $config->uid : "";
      $button_text = property_exists($config, "button_text") ? $config->button_text : "";

      $vcard = new VCard();
      $additional = $middle_name;
      $vcard->addName($last_name, $first_name, $additional, $prefix, $suffix);

      // add work data
      $vcard->addCompany($organization);
      $vcard->addJobtitle($title);
      $vcard->addRole($role);
      $vcard->addEmail($email, "type=Email");
      $vcard->addEmail($work_email, 'type=Work Email');
      $vcard->addPhoneNumber($home_phone, 'type=Mobile,VOICE');
      $vcard->addPhoneNumber($work_phone, 'type=Work Phone');
      $vcard->addPhoneNumber($cell_phone, 'type=Mobile Phone');


      // $vcard->addLabel($home_address_label);
      $vcard->addAddress(null, null, $home_address_street, $home_address_city, null, $home_address_postal_code, $home_address_country, "type=$home_address_label");

      // $vcard->addLabel($work_address_label);
      $vcard->addAddress(null, null, $work_address_street, $work_address_city, null, $work_address_postal_code, $work_address_country, "type=$work_address_label");

      $vcard->addURL($personal_url, "type=Personal URL");
      $vcard->addURL($work_url, "type=Work URL");

      $vcard->addURL($linkedin, 'TYPE=' . "Linkedin");
      $vcard->addURL($twitter, 'TYPE=' . "Twitter");
      $vcard->addURL($facebook, 'TYPE=' . "Facebook");
      $vcard->addURL($instagram, 'TYPE=' . "Instagram");
      $vcard->addURL($youtube, 'TYPE=' . "Youtube");

      $vcard->addBirthday("$birth_year-$birth_month-$birth_day");


      if($photo){
        $photo = public_path($photo);
        if(file_exists($photo)){
          $vcard->addPhoto($photo);
        }
      }

      // $logo = public_path($logo);
      // $vcard->addPhoto($logo);

    //   return $vcard->download();

    return Response::make(
        $vcard->getOutput(),
        200,
        $vcard->getHeaders(true)
    );

  }


  public function copyBiolink(Request $request){

    $request->validate([
      "id" => ["required"]
    ]);

    \DB::beginTransaction();
    try{
      $biolink = Biolink::find($request->id);

      // return response()->json($links,422);

      if($biolink){

        // copy biolink widget
        $newbiolink = $biolink->replicate();
        $newbiolink->name = "Copy of ".$biolink->name;
        $newbiolink->hash = $biolink->hash.rand(0,9);
        $newbiolink->clicks_count = 0;
        $newbiolink->save();

        // copy biolink appearance
        $bio_appearances = BiolinkAppearance::where("biolink_id", $biolink->id)->get();
        foreach ($bio_appearances as $bio_appearance) {
          $newbio_apperance = $bio_appearance->replicate();
          $newbio_apperance->biolink_id = $newbiolink->id;
          $newbio_apperance->save();
        }


        // copy biolink widgett
        $bio_widgets = BiolinkWidget::where("biolink_id", $biolink->id)->get();
        foreach ($bio_widgets as $bio_widget) {
          $newbio_widget = $bio_widget->replicate();
          $newbio_widget->biolink_id = $newbiolink->id;
          $newbio_widget->save();
        }

        $links = $biolink->links;
        foreach ($links as $link) {
          $newlink = $link->replicate();
          $newlink->hash = $link->hash.rand(0,9);
          $newlink->save();

          $pivot_link = \DB::table("link_group_link")->where("link_group_id", $biolink->id)->where("link_id", $link->id)->first();
          \DB::table('link_group_link')->insert([
              'link_group_id' => $newbiolink->id,
              'link_id' => $newlink->id,
              'position' => $pivot_link->position,
              'animation' => $pivot_link->animation,
              'leap_until' => $pivot_link->leap_until,
          ]);

        }


        \DB::commit();
        return response()->json([
          "success" => true,
          "message" => "Biolink Copied Successfully."
        ], 200);

      }

      \DB::rollback();
      return response()->json([
        "success" => false,
        "message" => "Failed to copy"
      ], 500);
    }catch(\Exception $e){
      \DB::rollback();
      throw $e;
    }

  }

  public function sendConnectMail(Request $request){

    $request->validate([
      "name" => ['required'],
      "email" => ['required', "email"],
      "phone" => ['required'],
      "message" => ['required'],
    ]);

    $biolink_id = $request->biolink_id;
    $biolink = Biolink::findOrFail($biolink_id);
    $bio_widget = $biolink->widgets()->where('type', 'connect')->firstOrFail();

    $config = (object) $bio_widget->config;
    $reciever_email = property_exists($config, "email") ? $config->email : "";

    if(!$reciever_email){
      return response()->json([
        "errors" => [
          "message" => ["No Receiver Email Found"]
        ]
      ], 500);
    }

    $name = $request->name;
    $email = $request->email;
    $phone = $request->phone;
    $message = $request->message;

    try{
      \Mail::to($reciever_email)->send(new ConnectMail($biolink));

      $user = User::findOrFail($biolink->user_id);
      
      Contact::create([
        "user_id" => $user->id,
        "name" => $name,
        "email" => $email,
        "phone" => $phone,
        "message" => $message,
      ]);

      return response()->json([
        "success" => true,
        "message" => "Mail Sent successfully"
      ], 200);

    }catch(\Exception $e){
      throw $e;
    }

  }


  public function getContacts(Request $request){


    $authUser = \Auth::user();

    $builder = app(Contact::class)->newQuery()->where('user_id', $authUser->id);

    // don't show "label" tags in bedrive

    if(request('query')){
        $q = request('query');
        $builder->where('name', "like", "%$q%")
          ->orWhere("email", "like", "%$q%")
          ->orWhere("phone", "like", "%$q%")
          ->orWhere("message", "like", "%$q%");
    }

    $dataSource = new Datasource($builder, $this->request->all());

    $pagination = $dataSource->paginate()->toArray();

    $pagination['data'] = array_map(function ($contact) {
      return $contact;
    }, $pagination['data']);

    return $this->success(['pagination' => $pagination]);

  }

  public function downloadContacts(Request $request){

    $authUser = \Auth::user();

    $builder = Contact::where('user_id', $authUser->id);

    // don't show "label" tags in bedrive

    if(request('query')){
        $q = request('query');
        $builder->where('name', "like", "%$q%")
          ->orWhere("email", "like", "%$q%")
          ->orWhere("phone", "like", "%$q%")
          ->orWhere("message", "like", "%$q%");
    }

    $contacts = $builder->get();

    return Excel::download(new ContactExport($contacts), 'contacts.xlsx'); 

  }

}

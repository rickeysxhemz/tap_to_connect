<?php

namespace App\Http\Controllers;

use App\Biolink;
use App\NfcLink;
use Common\Core\BaseController;
use App\Http\Resources\DigitalProfileResource;
use App\Http\Resources\DigitalLinkResource;
use App\Link;
use App\Imports\NfcImport;
use Excel;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;
use Common\Workspaces\Workspace;
use App\Actions\Link\CrupdateLink;

use Illuminate\Http\Request;

class NfcBusinessLinkController extends BaseController
{

    public function __construct(protected Filesystem $fs, protected Link $link)
    {
      $this->middleware(['auth'])->except(["checkLink"]);
    }

    public function checkLink($url_code){

      $nfclink = NfcLink::where("url_code", $url_code)->first();

      if(!$nfclink->user_id){
        return response()->json([
          "status" => true,
          "link" => ""
        ]);
      }else{

        $redirect_to = "";

        if($nfclink->user_id && $nfclink->link_group_id){

          $digital_profile = Biolink::where("id", $nfclink->link_group_id)->first();
          $redirect_to= $digital_profile ? url('/')."/".$digital_profile->hash : "";

        }else if($nfclink->user_id && $nfclink->link_id){

          $link = Link::where("id", $nfclink->link_id)->first();
          $redirect_to = $link?->long_url;

        }

        return response()->json([
          "status" => false,
          "link" => $redirect_to
        ]);
      }

    }

    public function registerNfc(Request $request, $url_code){

      $nfclink = NfcLink::where("url_code", $url_code)->first();

      $authUser = \Auth::user();

      $nfclink->user_id = $authUser->id;

      if($nfclink->save()){
        return true;
      }else{
        return false;
      }

    }

    public function digitalProfiles(){

      $authUser = \Auth::user();

      if(!$authUser->hasPermission('tags.update')){
        $profiles = Biolink::where("user_id", $authUser->id)->get();
      }else{
        $profiles = Biolink::all();
      }

      // return response()->json($profiles);
      return DigitalProfileResource::collection($profiles);

    }

    public function digitalLinks(){

      $authUser = \Auth::user();
      if(!$authUser->hasPermission('tags.update')){
        $links = Link::where("user_id", $authUser->id)->get();
      }else{
        $links = Link::all();
      }

      // return response()->json($profiles);
      return DigitalLinkResource::collection($links);

    }

    public function updateNfcLinks(Request $request, $id){

      $authUser = \Auth::user();
      $nfclink = NfcLink::find($id);
      // if($nfclink->link_group_id || $nfclink->user_id != $authUser->id){
      //   return false;
      // }
      // $nfclink->user_id = $authUser->id;

      $url_code = $request->url_code;
      $forward_to = $request->forward_to;

      if($forward_to == "link"){
        $nfclink->link_group_id = null;
        $nfclink->link_id = $request->forward_id;
      }else{
        $nfclink->link_id = null;
        $nfclink->link_group_id = $request->forward_id;
      }

      if($nfclink->save()){
        return true;
      }else{
        return false;
      }


    }


    public function resetNfc(Request $request)
    {

      $id = $request->id;

      $nfclink = NfcLink::find($id);

      $nfclink->link_group_id = null;
      $nfclink->link_id = null;
      $nfclink->user_id = null;

      if($nfclink->save()){
        return true;
      }else{
        return false;
      }

    }

    public function importCsv(Request $request){

     \DB::beginTransaction();
     try{

      $authUser = \Auth::user();
      $batch_id = Str::random(5);
      $file = $request->file("csv");

      // $image_name = time().'.'.$file->getClientOriginalExtension();
      // $request->file->move(public_path('uploads'), $image_name);

      $data = Excel::toArray(new NfcImport, $file);

      foreach ($data[0] as $i => $row) {
        if($i < 3) continue;

        $bio_profile_name = $row[0];
        $bio_profile_description = $row[1];
        $content_link_1_label = $row[2];
        $content_link_1_url = $row[3];
        $content_link_2_label = $row[4];
        $content_link_2_url = $row[5];
        $content_link_3_label = $row[6];
        $content_link_3_url = $row[7];
        $content_link_4_label = $row[8];
        $content_link_4_url = $row[9];
        $widget_text_title = $row[10];
        $widget_text_description = $row[11];
        $email = $row[12];
        $facebook_url = $row[13];
        $twitter_url = $row[14];
        $instagram_url = $row[15];
        $tiktok_url = $row[16];
        $youtube_url = $row[17];
        $soundcloud_url = $row[18];
        $bandcamp_url = $row[19];
        $linkedin_url = $row[20];
        $whatsapp = $row[21];
        $telegram_url = $row[22];
        $twitch_url = $row[23];
        $patreon_url = $row[24];
        $pinterest_url = $row[25];
        $spotify_url = $row[26];
        $amazon_url = $row[27];
        $snapchat_url = $row[28];
        $apple_music_url = $row[29];
        $youtube_video = $row[30];
        $soundcloud_audio = $row[31];
        $vimeo_video = $row[32];
        $spotify_embed = $row[33];
        $twitch_embed = $row[34];
        $tiktok_embed = $row[35];
        $background_flat_color = $row[36];
        $background_gradient_color = $row[37];
        $background_gradient_color_2 = $row[38];
        $background_gradient_direction = $row[39];
        $text_color = $row[40];
        $button_color = $row[41];
        $button_text_color = $row[42];
        $fill = $row[43];
        $outline = $row[44];
        $shadow = $row[45];
        $fontname = $row[46];
        $link = $row[47];
        $workspace = $row[48];
        $user_account_email = $row[49];
        $nfc_code = $row[50];

        $userAccount = \App\User::where("email", $user_account_email)->first();

        if(!$nfc_code){
          if($link){
            // only link
            $newlink = $this->createLink($row, $userAccount);

          }else{
            // only biolink
            // $linkgroup = \App\LinkGroup::where("name", "")->first();
            $linkgroup = $this->createLinkGroup($row, $userAccount);
          }
        }else{

          $only_nfc = true;
          for($i=0;$i<=47;$i++){
            $str = trim($row[$i]);
            if($str) $only_nfc = false;
          }

          if($only_nfc == true){
            $url_code = Str::random(4)."-".Str::random(4)."-".Str::random(4)."-".Str::random(4);
            $url_code = strtoupper($url_code);

            $nfc_card = new NfcLink();
            $nfc_card->url_code = $url_code;
            $nfc_card->batch_id = $batch_id;
            $nfc_card->save();
          }else{

            $nfc_card = \App\NfcLink::where("url_code", $nfc_code)->first();

            $link = trim($link);
            if($link){ // nfc card connected to a link
              $newlink = $this->createLink($row, $userAccount);
              $nfc_card->link_id = $newlink->id;
            }else{ // nfc card not connected to link or biolink
              $linkgroup = $this->createLinkGroup($row, $userAccount);
              $nfc_card->link_group_id = $linkgroup->id;
            }

            // nfc card connected to digital profile
            $nfc_card->user_id = $userAccount->id;
            $nfc_card->save();

          }

        }

      }

      \DB::commit();
      return response()->json([
        "success" => true
      ]);

     }catch(\Exception $err){
      \DB::rollback();
      throw $err;
     }

    }

    public function getWorkspace($wsp){

      $workspace = Workspace::where("name", $wsp)->first();
      // if(!$workspace){
      //   $workspace = new Workspace();
      //   $workspace->owner_id = $authUser->id;
      //   $workspace->name = $wsp;
      //   $workspace->save();
      // }
      return $workspace;
    }

    public function createLink($row, $userAccount){

      $link = $row[47];
      $workspace = $row[48];

      $authUser = \Auth::user();
      $workspace = $this->getWorkspace($workspace);

      $data = [
        "hash" => Str::random(5),
        "active" => true,
        "type" => "direct",
        "geo_rules" => [],
        "device_rules" => [],
        "platform_rules" => [],
        "groups" => [],
        "utm" => null,
        "utm_custom" => [],
        "domain_id" => 0,
        // "name" => "fefew",
        "long_url" => $link,
        "exp_clicks_rule" => [],
        "pixels" => [],
      ];

      $link = app(CrupdateLink::class)->execute(
          $this->link->newInstance(),
          $data,
      );
      $link->user_id = $userAccount->id;
      $link->save();
      return $link;
    }

    public function createBiolinkLink($biolink, $link_name, $long_url, $userAccount){

      $payload = [
        "hash" => Str::random(5),
        "active" => true,
        "type" => "direct",
        "geo_rules" => [],
        "device_rules" => [],
        "platform_rules" => [],
        "groups" => [
          0 => $biolink->id
        ],
        // "position" => 0,
        "utm" => null,
        "utm_custom" => [],
        "domain_id" => 0,
        "name" => $link_name,
        "long_url" => $long_url,
        "exp_clicks_rule" => [],
        "pixels" => [],
      ];

      $payload['groups'] = [
          $payload['groups'][0] => ['position' => request('position', 0)],
      ];

      $link = (new CrupdateLink(fetchMetadata: false))->execute(
          Link::newModelInstance(),
          $payload,
      );

      // $biolink->adjustPositions(
      //     direction: 'increment',
      //     anchor: request('position', null),
      //     linkToSkip: $link->id,
      // );
      $link->user_id = $userAccount->id;
      $link->save();

      return $link;
    }

    public function createLinkGroup($row, $userAccount)
    {

      $bio_profile_name = trim($row[0]);
      $bio_profile_description = trim($row[1]);
      $content_link_1_label = trim($row[2]);
      $content_link_1_url = trim($row[3]);
      $content_link_2_label = trim($row[4]);
      $content_link_2_url = trim($row[5]);
      $content_link_3_label = trim($row[6]);
      $content_link_3_url = trim($row[7]);
      $content_link_4_label = trim($row[8]);
      $content_link_4_url = trim($row[9]);
      $widget_text_title = trim($row[10]);
      $widget_text_description = trim($row[11]);
      $email = trim($row[12]);
      $facebook_url = trim($row[13]);
      $twitter_url = trim($row[14]);
      $instagram_url = trim($row[15]);
      $tiktok_url = trim($row[16]);
      $youtube_url = trim($row[17]);
      $soundcloud_url = trim($row[18]);
      $bandcamp_url = trim($row[19]);
      $linkedin_url = trim($row[20]);
      $whatsapp = trim($row[21]);
      $telegram_url = trim($row[22]);
      $twitch_url = trim($row[23]);
      $patreon_url = trim($row[24]);
      $pinterest_url = trim($row[25]);
      $spotify_url = trim($row[26]);
      $amazon_url = trim($row[27]);
      $snapchat_url = trim($row[28]);
      $apple_music_url = trim($row[29]);
      $youtube_video = trim($row[30]);
      $soundcloud_audio = trim($row[31]);
      $vimeo_video = trim($row[32]);
      $spotify_embed = trim($row[33]);
      $twitch_embed = trim($row[34]);
      $tiktok_embed = trim($row[35]);
      $background_flat_color = trim($row[36]);
      $background_gradient_color = trim($row[37]);
      $background_gradient_color_2 = trim($row[38]);
      $background_gradient_direction = trim($row[39]);
      $text_color = trim($row[40]);
      $button_color = trim($row[41]);
      $button_text_color = trim($row[42]);
      $fill = trim($row[43]);
      $outline = trim($row[44]);
      $shadow = trim($row[45]);
      $fontname = trim($row[46]);
      $link = trim($row[47]);
      $workspace = trim($row[48]);
      $user_account_email = trim($row[49]);
      $nfc_code = trim($row[50]);

      $authUser = \Auth::user();
      $workspace = $this->getWorkspace($workspace);

      $userAccount = \App\User::where("email", $user_account_email)->first();

      // Biolink / Digital Profile base info
      $biolink = new \App\Biolink();
      $biolink->user_id = $userAccount->id;
      $biolink->active = 1;
      $biolink->name = $bio_profile_name ?? "Unknown";
      $biolink->description = $bio_profile_description;
      $biolink->type = 'biolink';
      $biolink->hash = Str::random(6);
      $biolink->workspace_id = $workspace->id ?? "";
      $biolink->save();

      // Biolink links
      if($content_link_1_label && $content_link_1_url)$this->createBiolinkLink($biolink, $content_link_1_label, $content_link_1_url, $userAccount);
      if($content_link_2_label && $content_link_2_url)$this->createBiolinkLink($biolink, $content_link_2_label, $content_link_2_url, $userAccount);
      if($content_link_3_label && $content_link_3_url)$this->createBiolinkLink($biolink, $content_link_3_label, $content_link_3_url, $userAccount);
      if($content_link_4_label && $content_link_4_url)$this->createBiolinkLink($biolink, $content_link_4_label, $content_link_4_url, $userAccount);

      // Biolink Widgets

      // text widget
      if($widget_text_title){
        $text_payload = [
          "type" => "text",
          "config" => [
            "title" => $widget_text_title,
            "description" => $widget_text_description,
          ]
        ];
        $text_widget = $biolink->widgets()->create($text_payload);
      }

      // social widget
      $social_widget_payload = [
        "type" => "socials",
        "position" => 5,
        "config" => [
          "mail" => $email,
          "facebook" => $facebook_url,
          "twitter" => $twitter_url,
          "instagram" => $instagram_url,
          "tiktok" => $tiktok_url,
          "youtube" => $youtube_url,
          "soundcloud" => $soundcloud_url,
          "bandcamp" => $bandcamp_url,
          "linkedin" => $linkedin_url,
          "whatsapp" => $whatsapp,
          "telegram" => $telegram_url,
          "twitch" => $twitch_url,
          "patreon" => $patreon_url,
          "pinterest" => $pinterest_url,
          "spotify" => $spotify_url,
          "amazon" => $amazon_url,
          "snapchat" => $snapchat_url,
          "apple" => $apple_music_url,
        ]
      ];
      $social_widget = $biolink->widgets()->create($social_widget_payload);

      // youtube widget
      if($youtube_video){
        $youtube_payload = [
          "type" => "youtube",
          "config" => [
            "url" => $youtube_video,
          ]
        ];
        $youtube_widget = $biolink->widgets()->create($youtube_payload);
      }

      // soundcloud widget
      if($soundcloud_audio){
        $soundcloud_payload = [
          "type" => "soundcloud",
          "config" => [
            "url" => $soundcloud_audio,
            // "embedUrl" => ""
          ]
        ];
        $soundcloud_widget = $biolink->widgets()->create($soundcloud_payload);
      }

      // Vimeo Widget
      if($vimeo_video){
        $vimeo_payload = [
          "type" => "video",
          "config" => [
            "url" => $vimeo_video,
          ]
        ];
        $vimeo_widget = $biolink->widgets()->create($vimeo_payload);
      }

      // Spotify Widget
      if($spotify_embed){
        $spotify_payload = [
          "type" => "video",
          "config" => [
            "url" => $spotify_embed,
          ]
        ];
        $spotify_widget = $biolink->widgets()->create($spotify_payload);
      }

      // Twitch Widget
      if($twitch_embed){
        $twitch_payload = [
          "type" => "video",
          "config" => [
            "url" => $twitch_embed,
          ]
        ];
        $twitch_widget = $biolink->widgets()->create($twitch_payload);
      }

      // Tiktok Widget
      if($tiktok_embed){
        $tiktok_payload = [
          "type" => "video",
          "config" => [
            "url" => $tiktok_embed,
          ]
        ];
        $tiktok_widget = $biolink->widgets()->create($tiktok_payload);
      }

      // Biolink Appearance
      $config = [];

      // Background Configs
      
      if($background_flat_color){
        $config["bgConfig"]["label"] = [
          "message" => "Custom color"
        ];
        $config["bgConfig"]["type"] = "color";
        $config["bgConfig"]["id"] = "c-custom";
        $config["bgConfig"]["backgroundColor"] = $background_flat_color;
      }else if($background_gradient_color && $background_gradient_color_2 && $background_gradient_direction){
        $config["bgConfig"]["label"] = [
          "message" => "Custom color"
        ];
        $config["bgConfig"]["type"] = "gradient";
        $config["bgConfig"]["id"] = "g-custom";

        if($background_gradient_direction == "not applicable") $background_gradient_direction = "up";
        $directions = [
          "up" => "0deg",
          "down" => "180deg",
          "right" => "90deg",
          "right-below" => "135deg",
          "left-below" => "225deg",
          "right-up" => "45deg",
          "left-up" => "325deg",
        ];
        $direction = $directions[$background_gradient_direction];
        
        $config["bgConfig"]["backgroundImage"] = "linear-gradient($direction, $background_gradient_color, $background_gradient_color_2)";
      }

      if($text_color){
        $config["bgConfig"]["color"] = $text_color;
      }


      // Button Configs
      if($button_color){
        $config["btnConfig"]["color"] = $button_color;
      }

      if($button_text_color){
        $config["btnConfig"]["textColor"] = $button_text_color;
      }

      $fill = strtolower($fill);
      $outline = strtolower($outline);
      
      if($fill == "square"){
        $config["btnConfig"]["variant"] = "flat";
        $config["btnConfig"]["radius"] = "rounded-none";
      }else if($fill == "rounded"){
        $config["btnConfig"]["variant"] = "flat";
        $config["btnConfig"]["radius"] = "rounded";
      }else if($fill == "pill"){
        $config["btnConfig"]["variant"] = "flat";
        $config["btnConfig"]["radius"] = "rounded-full";
      }

      if($outline == "square"){
        $config["btnConfig"]["variant"] = "outline";
        $config["btnConfig"]["radius"] = "rounded-none";
      }else if($outline == "rounded"){
        $config["btnConfig"]["variant"] = "outline";
        $config["btnConfig"]["radius"] = "rounded";
      }else if($outline == "pill"){
        $config["btnConfig"]["variant"] = "outline";
        $config["btnConfig"]["radius"] = "rounded-full";
      }


      $shadow = strtolower($shadow);
      if($shadow == "big shadow"){
        $config["btnConfig"]["shadow"] = "rgb(0 0 0 / 75%) 0.3rem 0.4rem 0px";
      }else if($shadow == "small shadow"){
        $config["btnConfig"]["shadow"] = "rgb(0 0 0 / 20%) 0.2rem 0.2rem 0.4rem 0px";
      }

      $font = $this->getFont($fontname);
      if($font){
        $config["fontConfig"] = $font;
      }

      if($config){

        if ($biolink->appearance && empty($config)) {
            $biolink->appearance->delete();
        } else {
            if ($biolink->appearance) {
                $biolink->appearance->update(['config' => $config]);
            } else {
                $appearance = $biolink
                    ->appearance()
                    ->create(['config' => $config]);
                $biolink->setRelation('appearance', $appearance);
            }
        }

        $biolink->touch();

      }

      return $biolink;
    }

    public function getFont($name){

      if(strtolower($name) == "arial"){
        return [
          "label" => [
            "message" => "System",
          ],
          "family" => "Arial, Helvetica Neue, Helvetica, sans-serif",
          "category" => "serif"
        ];
      }

      $googleFonts = json_decode(
          $this->fs->get(
              base_path("common/resources/lists/google-fonts.json"),
          ),
          true,
      );

      foreach ($googleFonts as $font) {
        if( $font['family'] == $name){
          return [
              "label" => [
                "message" => "System",
              ],
              'family' => $font['family'],
              'category' => $font['category'],
              'google' => true,
          ];
        }
      }
    }

    // public function googleFonts(): array
    // {
    //     $googleFonts = json_decode(
    //         $this->fs->get(
    //             base_path("common/resources/lists/google-fonts.json"),
    //         ),
    //         true,
    //     );

    //     return array_map(function ($font) {
    //         return [
    //             'family' => $font['family'],
    //             'category' => $font['category'],
    //             'google' => true,
    //         ];
    //     }, $googleFonts);
    // }

}

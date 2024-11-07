<?php

namespace Common\NfcLink;

use Carbon\Carbon;
use Common\Files\FileEntry;
use Common\Search\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use App\User;
use App\Link;
use App\LinkGroup;

class NfcLink extends Model
{
    use Searchable;

    const MODEL_TYPE = 'nfc_links';
    const DEFAULT_TYPE = 'default';

    protected $hidden = ['pivot'];
    protected $guarded = ['id'];
    protected $casts = ['id' => 'integer'];
    protected $appends = ['model_type'];

    public function files(): MorphToMany
    {
        return $this->morphedByMany(FileEntry::class, 'taggable');
    }

    public function attachEntries(array $ids, int $userId = null)
    {
        if ($userId) {
            $ids = collect($ids)->mapWithKeys(function ($id) use ($userId) {
                return [$id => ['user_id' => $userId]];
            });
        }

        $this->files()->syncWithoutDetaching($ids);
    }

    public function detachEntries(array $ids, int $userId = null)
    {
        $query = $this->files();

        if ($userId) {
            $query->wherePivot('user_id', $userId);
        }

        $query->detach($ids);
    }

    public function insertOrRetrieve(
        Collection|array $nfclinks,
        ?string $type = 'custom',
        ?int $userId = null,
    ): Collection {

        if (!$nfclinks instanceof Collection) {
            $nfclinks = collect($nfclinks);
        }

        $nfclinks = $nfclinks->filter()->map(function ($nfclink) use ($userId) {
            if (is_string($nfclink)) {
                return [
                    'name' => $nfclink,
                    'display_name' => $nfclink,
                ];
            } else {
                return [
                    'name' => $nfclink['name'],
                    'display_name' => Arr::get(
                        $nfclink,
                        'display_name',
                        $nfclink['name'],
                    ),
                ];
            }
        });

        $nfclinks->transform(function (array $nfclink) {
            $nfclink['name'] = slugify($nfclink['name']);
            return $nfclink;
        });

        $existing = $this->getByNames($tags->pluck('name'), $type, $userId);

        $new = $tags->filter(function ($tag) use ($existing) {
            return !$existing->first(function ($existingTag) use ($tag) {
                return slugify($existingTag['name']) === slugify($tag['name']);
            });
        });

        if ($new->isNotEmpty()) {
            $new->transform(function ($tag) use ($type, $userId) {
                $tag['created_at'] = Carbon::now();
                $tag['updated_at'] = Carbon::now();
                if ($type) {
                    $tag['type'] = $type;
                }
                if ($userId) {
                    $tag['user_id'] = $userId;
                }
                return $tag;
            });
            $this->insert($new->toArray());
            return $this->getByNames($tags->pluck('name'), $type, $userId);
        } else {
            return $existing;
        }
    }

    // public function getByNames(
    //     Collection $names,
    //     string $type = null,
    //     int $userId = null,
    // ): Collection {
    //     $query = $this->whereIn('url_code', $names);
    //     if ($type) {
    //         $query->where('type', $type);
    //     }
    //     if ($userId) {
    //         $query->where('user_id', $userId);
    //     }
        
    //     return $query->get();
    // }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'url_code' => $this->url_code,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'url_code' => $this->url_code,
            // 'username' => $this->user?->name,
            // 'link' => $this->link?->name,
            // 'linkgroup' => $this->linkgroup?->name,
            // 'user_id' => $this->user_id,
            // 'link_id' => $this->link_id,
            // 'link_group_id' => $this->link_group_id,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }

    // protected function makeAllSearchableUsing($query)
    // {
    //     return $query->with(['user', 'link', 'linkgroup']);
    // }

    public static function filterableFields(): array
    {
        return [
            'id',
            'url_code',
            // 'user_id',
            // 'link_id',
            // 'link_group_id',
            'created_at',
            'updated_at',
        ];
    }

    public static function getModelTypeAttribute(): string
    {
        return static::MODEL_TYPE;
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function link(){
        return $this->belongsTo(Link::class, 'link_id');
    }

    public function linkgroup(){
        return $this->belongsTo(LinkGroup::class, 'link_group_id');
    }
}

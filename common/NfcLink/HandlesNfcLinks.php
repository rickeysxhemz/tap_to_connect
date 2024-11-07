<?php namespace Common\Tags;

use Common\NfcLink\NfcLink;

trait HandlesNfcLinks
{
    /**
     * @param string $tag
     * @param array $ids
     */
    public function addTag($tag, $ids)
    {
        $tag = Tag::where('name', $tag)->first();

        $tag->files()->attach($ids);
    }

    /**
     * @param string $tag
     * @param array $ids
     */
    public function removeTag($tag, $ids)
    {
        $tag = Tag::where('name', $tag)->first();

        $tag->files()->detach($ids);
    }
}

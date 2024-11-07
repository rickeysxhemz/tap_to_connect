<?php

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/




// INSERT INTO `permissions` (`id`, `name`, `display_name`, `description`, `group`, `restrictions`, `created_at`, `updated_at`, `type`, `advanced`) VALUES (NULL, 'nfclinks.view', 'View NFC Cards', 'Allow viewing ALL Cards, regardless of who is the owner.', 'nfclinks', NULL, '2023-08-07 18:54:29', '2023-08-07 18:54:29', 'sitewide', '1'), (NULL, 'nfclinks.create', 'Create NFC Cards', 'Allow creating new nfc cards, regardless of who is the owner.', 'nfclinks', NULL, '2023-08-07 18:54:29', '2023-08-07 18:54:29', 'sitewide', '1'), (NULL, 'nfclinks.update', 'Update NFC Cards', 'Allow updating ALL cards, regardless of who is the owner.', 'nfclinks', NULL, '2023-08-07 18:54:29', '2023-08-07 18:54:29', 'sitewide', '1'), (NULL, 'nfclinks.delete', 'Delete NFC Cards', 'Allow deleting ALL nfc cards, regardless of who is the owner.', 'nfclinks', NULL, '2023-08-07 18:54:29', '2023-08-07 18:54:29', 'sitewide', '1');
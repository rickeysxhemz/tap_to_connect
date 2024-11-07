import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DataTablePage } from '../../datatable/page/data-table-page';
import { IconButton } from '../../ui/buttons/icon-button';
import { EditIcon } from '../../icons/material/Edit';
import { FormattedDate } from '../../i18n/formatted-date';
import { ColumnConfig } from '../../datatable/column-config';
import { Trans } from '../../i18n/trans';
import { DeleteSelectedItemsAction } from '../../datatable/page/delete-selected-items-action';
import { DataTableEmptyStateMessage } from '../../datatable/page/data-table-emty-state-message';
import { NfcLink } from '../../nfclink/nfclink';
import { SiteConfigContext } from '../../core/settings/site-config-context';
import { NfcLinkIndexPageFilters } from './index-filters';
import softwareEngineerSvg from './software-engineer.svg';
import { DialogTrigger } from '../../ui/overlays/dialog/dialog-trigger';
import { CreateNfcLink } from './create';
import { UpdateNfcLinkDialog } from './update';
import { DataTableAddItemButton } from '../../datatable/data-table-add-item-button';
import { Link } from 'react-router-dom';
import { ShareLinkButton } from '@app/dashboard/links/sharing/share-link-button';
import { CopyLinkIcon } from '@app/dashboard/links/sharing/copy-link-icon';
import useClipboard from 'react-use-clipboard';
import { toast } from '@common/ui/toast/toast';
import { message } from '@common/i18n/message';
import { useSettings } from '@common/core/settings/use-settings';
import { CloseIcon } from '@common/icons/material/Close';
import { SectionHelper } from '@common/ui/section-helper';
import { DataTableExportCsvButton } from '@common/datatable/csv-export/data-table-export-csv-button';
import ResetNfcCard from './reset-nfc-card';
import axios from 'axios';
import { NfcUploadDialog } from './nfc-upload-dialog';
import { FileUploadIcon } from '@common/icons/material/FileUpload';


const columnConfig: ColumnConfig<NfcLink>[] = [
  {
    key: 'url_code',
    allowsSorting: true,
    visibleInMode: 'all',
    width: 'flex-3  min-w-200',
    header: () => <Trans message="NFC Business Card ID" />,
    body: nfclink => nfclink.url_code,
  },
  {
    key: 'link_group_id',
    width: 'flex-2 min-w-140',
    allowsSorting: true,
    header: () => <Trans message="Connected Digital Profile/Link" />,
    body: nfclink => {
      return (
        <a className='text-primary hover:underline hover:text-primary-dark focus-visible:ring focus-visible:ring-2 focus-visible:ring-offset-2 outline-none rounded transition-colors' href={nfclink.link} target="_blank">{nfclink.name}</a>
      );
    },
  },
  {
    key: 'user_id',
    allowsSorting: true,
    header: () => <Trans message="User" />,
    body: nfclink => nfclink.username,
    width: 'w-200'
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-160 flex-shrink-0',
    visibleInMode: 'all',
    body: nfclink => {
      const url_code = localStorage.getItem("url_code");
      return (
        <div className='text-muted flex'>
          <IconButton size="md" className="text-muted" onClick={() => {
            navigator.clipboard.writeText(nfclink.copy_url);
            toast.positive(message('Copied link to clipboard'));
          }}>
            <CopyLinkIcon />
          </IconButton>

          {
            url_code
            ?
            <DialogTrigger type="modal" isOpen={nfclink.url_code == url_code} onClose={() => {localStorage.removeItem('url_code'); window.location.reload();}}>
            <IconButton size="md" className="text-muted" id={nfclink.url_code}>
              <EditIcon />
            </IconButton>
            <UpdateNfcLinkDialog nfclink={nfclink} />
          </DialogTrigger>
          :<DialogTrigger type="modal">
          <IconButton size="md" className="text-muted" id={nfclink.url_code}>
            <EditIcon />
          </IconButton>
          <UpdateNfcLinkDialog nfclink={nfclink} />
        </DialogTrigger>
          }
          {nfclink.forward_id || nfclink.username ? <ResetNfcCard nfclink={nfclink}/> : null}
        </div>
      );
    },
  },
];

export function NfcLinkIndexPage() {
  const { tags } = useContext(SiteConfigContext);
  const { base_url } = useSettings();

  const filters = useMemo(() => {
    return NfcLinkIndexPageFilters();
  }, []);


  return (
    <>
      <DataTablePage
        endpoint="nfc-links"
        queryParams={{
          with: 'user,linkgroup,link',
        }}
        title={<Trans message="NFC Business Cards" />}
        columns={columnConfig}
        // filters={filters}
        actions={<Actions />}
        selectedActions={window.location.pathname.includes("/admin/") && <DeleteSelectedItemsAction />}
        emptyStateMessage={
          <DataTableEmptyStateMessage
            image={softwareEngineerSvg}
            title={<Trans message="No NFC Business cards have been added yet" />}
            filteringTitle={<Trans message="No matching Business Card" />}
          />
        }
      />
      <div className='p-12 md:p-24' >
        <div style={{ background: '#2296F3', padding: 15, color: '#fff', display: 'flex', alignItems: 'center' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 256 256"
          >
            <path
              fill="#ffffff"
              strokeMiterlimit={10}
              d="M25 2C12.297 2 2 12.297 2 25s10.297 23 23 23 23-10.297 23-23S37.703 2 25 2zm0 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4 27h-8v-2h2V23h-2v-2h6v15h2z"
              fontFamily="none"
              fontSize="none"
              fontWeight="none"
              style={{
                mixBlendMode: "normal",
              }}
              textAnchor="none"
              transform="scale(5.12)"
            />
          </svg>
          <span style={{marginLeft: 10}}>If you want to register a new card, tap it to your mobile phone!</span>
        </div>
      </div>
    </>
  );
}

function Actions() {

  if (!window.location.pathname.includes("/admin/")) {
    return <div></div>
  }

  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogTrigger
          type="modal"
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          {/* <DataTableAddItemButton onClick={() => setOpen(true)}>
          <Trans message="Upload Cards" />
        </DataTableAddItemButton> */}
        <IconButton
        variant="outline"
        color="primary"
        radius="rounded"
        size="sm"
        className="flex-shrink-0"
        onClick={() => setOpen(true)}
      >
        <FileUploadIcon />
      </IconButton>
          <NfcUploadDialog/>
        </DialogTrigger>
      <DataTableExportCsvButton endpoint="nfc-links/csv/export" />
      <DialogTrigger type="modal">
        <DataTableAddItemButton>
          <Trans message="Generate Cards" />
        </DataTableAddItemButton>
        <CreateNfcLink />
      </DialogTrigger>
    </>
  );
}

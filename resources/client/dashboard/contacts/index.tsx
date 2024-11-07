import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ContactIndexPageFilters } from './index-filters';
import softwareEngineerSvg from './software-engineer.svg';
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
import axios from 'axios';
import { FileUploadIcon } from '@common/icons/material/FileUpload';
import { ColumnConfig } from '@common/datatable/column-config';
import { Trans } from '@common/i18n/trans';
import { DataTablePage } from '@common/datatable/page/data-table-page';
import { DataTableEmptyStateMessage } from '@common/datatable/page/data-table-emty-state-message';
import { Button } from '@common/ui/buttons/button';


interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}



const columnConfig: ColumnConfig<Contact>[] = [
  {
    key: 'name',
    allowsSorting: true,
    visibleInMode: 'all',
    width: 'flex-3  min-w-200',
    header: () => <Trans message="Name" />,
    body: contact => contact.name,
  },
  {
    key: 'email',
    allowsSorting: true,
    header: () => <Trans message="Email" />,
    body: contact => contact.email,
    width: 'w-200'
  },
  {
    key: 'phone',
    allowsSorting: true,
    header: () => <Trans message="Phone" />,
    body: contact => contact.phone,
    width: 'w-200'
  },
  {
    key: 'note',
    allowsSorting: true,
    header: () => <Trans message="Note" />,
    body: contact => contact.message,
    width: 'w-200'
  },
];

export function ContactIndexPage() {


  const filters = useMemo(() => {
    return ContactIndexPageFilters();
  }, []);


  return (
    <>
      <DataTablePage
        endpoint="contacts"
        title={<Trans message="Contacts" />}
        columns={columnConfig}
        // filters={filters}
        actions={<Actions />}
        emptyStateMessage={
          <DataTableEmptyStateMessage
            image={softwareEngineerSvg}
            title={<Trans message="No Contact Found" />}
            filteringTitle={<Trans message="No matching Contact Found" />}
          />
        }
      />
  
    </>
  );
}


function Actions() {
  return (
    <Button variant="flat" elementType="a" color="primary" href={"/api/v1/download-contacts"}
    download="download">
          <Trans message="Export Contacts" />
    </Button>
  );
}

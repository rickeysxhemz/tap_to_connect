import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {CheckIcon} from '@common/icons/material/Check';
import {CloseIcon} from '@common/icons/material/Close';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Link, Link as RouterLink} from 'react-router-dom';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import React, {Fragment} from 'react';
import {ShareLinkButton} from '@app/dashboard/links/sharing/share-link-button';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {CustomDomain} from '@common/custom-domains/custom-domain';
import {useDefaultCustomDomainHost} from '@common/custom-domains/use-default-custom-domain-host';
import {removeProtocol} from '@common/utils/urls/remove-protocol';
import {useLinkFormValueLists} from '@app/dashboard/links/requests/use-link-form-value-lists';
import {BarChartIcon} from '@common/icons/material/BarChart';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';
import {LinkStyle} from '@common/ui/buttons/external-link';
import { CopyAllIcon } from '@common/icons/material/CopyAll';
import { CopyBiolink } from './copy-biolink';

export const BiolinksDatatableColumns: ColumnConfig<Biolink>[] = [
  {
    key: 'name',
    allowsSorting: true,
    header: () => <Trans message="Name" />,
    width: 'flex-3 min-w-200',
    visibleInMode: 'all',
    body: biolink => (
      <a
        className={LinkStyle}
        href={biolink.short_url}
        target="_blank"
        rel="noreferrer"
      >
        {biolink.name}
      </a>
    ),
  },
  {
    key: 'clicks_count',
    allowsSorting: true,
    header: () => <Trans message="Clicks" />,
    body: biolink =>
      biolink.clicks_count ? (
        <FormattedNumber value={biolink.clicks_count} />
      ) : (
        '-'
      ),
  },
  {
    key: 'domain_id',
    allowsSorting: true,
    header: () => <Trans message="Domain" />,
    body: biolink => <DomainColumn model={biolink} />,
  },
  {
    key: 'user_id',
    allowsSorting: true,
    header: () => <Trans message="Owner" />,
    width: 'flex-2 min-w-140',
    body: biolink => {
      if (!biolink.user) return '';
      return (
        <NameWithAvatar
          image={biolink.user.avatar}
          label={biolink.user.display_name}
          description={biolink.user.email}
        />
      );
    },
  },
  {
    key: 'links_count',
    allowsSorting: true,
    header: () => <Trans message="Links" />,
    body: biolink =>
      biolink.links_count ? (
        <FormattedNumber value={biolink.links_count} />
      ) : (
        '-'
      ),
  },
  {
    key: 'active',
    allowsSorting: true,
    header: () => <Trans message="Active" />,
    body: biolink =>
      biolink.active ? (
        <CheckIcon className="icon-md text-positive" />
      ) : (
        <CloseIcon className="icon-md text-danger" />
      ),
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    header: () => <Trans message="Last updated" />,
    body: link =>
      link.updated_at ? <FormattedDate date={link.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-150 flex-shrink-0',
    visibleInMode: 'all',
    body: biolink => (
      <div className="text-muted">
        <Tooltip label={<Trans message="Clicks report" />}>
          <RouterLink to={`${biolink.id}`}>
            <IconButton size="md">
              <BarChartIcon />
            </IconButton>
          </RouterLink>
        </Tooltip>
        <ShareLinkButton link={biolink} />
        <PermissionAwareButton resource={biolink} action="update">
          <Link to={`${biolink.id}/edit/content`}>
            <IconButton size="md">
              <EditIcon />
            </IconButton>
          </Link>
        </PermissionAwareButton>
        <CopyBiolink link={biolink}></CopyBiolink>
      </div>
    ),
  },
];

interface DomainColumnProps {
  model: {
    domain_id?: number;
    domain?: CustomDomain;
  };
}
export function DomainColumn({model}: DomainColumnProps) {
  const {data} = useLinkFormValueLists();
  const defaultHost = useDefaultCustomDomainHost(data?.domains);
  if (model.domain_id === 0 && defaultHost) {
    return <Fragment>{defaultHost}</Fragment>;
  }
  if (model.domain_id && model.domain) {
    return <Fragment>{removeProtocol(model.domain.host)}</Fragment>;
  }
  return <Trans message="All domains" />;
}

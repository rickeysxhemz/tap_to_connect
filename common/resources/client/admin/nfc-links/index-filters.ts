import {
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '../../datatable/filters/backend-filter';
import {message} from '../../i18n/message';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';

export const NfcLinkIndexPageFilters = (): BackendFilter[] => {
  return [
    {
      key: 'type',
      label: message('Type'),
      description: message('Type of the Nfc Link'),
      defaultOperator: FilterOperator.ne,
      control: {
        type: FilterControlType.Select,
        defaultValue: '01',
        options: [
          {
            key: '01',
            label: message('Default'),
            value: false,
          },
          {
            key: '02',
            label: message('Rotator'),
            value: true,
          },
        ],
      },
    },
    createdAtFilter({
      description: message('Date Nfc Link was created'),
    }),
    updatedAtFilter({
      description: message('Date Nfc Link was last updated'),
    }),
  ];
};

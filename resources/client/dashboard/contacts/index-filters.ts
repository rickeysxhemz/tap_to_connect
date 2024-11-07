
import { BackendFilter, FilterControlType, FilterOperator } from '@common/datatable/filters/backend-filter';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import { message } from '@common/i18n/message';

export const ContactIndexPageFilters = (): BackendFilter[] => {
  return [
    {
      key: 'type',
      label: message('Type'),
      description: message('Type of the Contact'),
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
      description: message('Contact was created'),
    }),
    updatedAtFilter({
      description: message('Contact was last updated'),
    }),
  ];
};

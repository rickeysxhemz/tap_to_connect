import { FormTextField } from '@common/ui/forms/input-field/text-field/text-field';
import { Trans } from '@common/i18n/trans';
import { Biolink, BiolinkWidget } from '@app/dashboard/biolink/biolink';
import { CrupdateWidgetDialog } from '@app/dashboard/biolink/biolink-editor/content/widgets/crupdate-widget-dialog';
import { WidgetType } from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import { useTrans } from '@common/i18n/use-trans';
import { message } from '@common/i18n/message';
import { FormRadioGroup } from '@common/ui/forms/radio-group/radio-group';
import { FormRadio } from '@common/ui/forms/radio-group/radio';
import { FileUploadProvider } from '@common/uploads/uploader/file-upload-provider';
import { FormImageSelector } from '@common/ui/images/image-selector';

export interface VcfWidget extends BiolinkWidget {
  type: WidgetType.Vcf;
  config: {
    button_text: string;
  };
}

interface VcfWidgetDialogProps {
  biolink: Biolink;
  widget?: VcfWidget;
}
export function VcfWidgetDialog({ biolink, widget }: VcfWidgetDialogProps) {
  const { trans } = useTrans();
  return (
    <CrupdateWidgetDialog
      dialogSize='fullscreen'
      biolink={biolink}
      type={WidgetType.Vcf}
      widget={widget}
      onSubmit={(values, form) => {
        // if (!values.url.includes('tiktok.com/')) {
        //   form.setError('url', {
        //     message: trans(message('Invalid tiktok url')),
        //   });
        // } else {
        //   return Promise.resolve(values);
        // }

        return Promise.resolve(values);
      }}
    >
      <div className="mb-10 grid grid-cols-2 gap-12">
        <div className='bg-white border border-gray-200 rounded-lg shadow'>
          <div className='p-14 flex items-start justify-between border-b rounded-t dark:border-gray-600'>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Name
            </h3>
          </div>
          <div className="p-14">
            <FormTextField
              autoFocus
              className='mb-12'
              placeholder="Prefix"
              name="prefix"
              type="text"
              label={<Trans message="Prefix" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="First Name"
              name="first_name"
              type="text"
              label={<Trans message="First Name" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Middle Name"
              name="middle_name"
              type="text"
              label={<Trans message="Middle Name" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Last Name"
              name="last_name"
              type="text"
              label={<Trans message="Last Name" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Suffix"
              name="suffix"
              type="text"
              label={<Trans message="Suffix" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Nickname"
              name="nickname"
              type="text"
              label={<Trans message="Nickname" />}
            />

          </div>
        </div>
        <div className='bg-white border border-gray-200 rounded-lg shadow'>
          <div className='p-14 flex items-start justify-between border-b rounded-t dark:border-gray-600'>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Work
            </h3>
          </div>
          <div className="p-14">
            <FormTextField
              className='mb-12'
              placeholder="Organization"
              name="organization"
              type="text"
              label={<Trans message="Organization" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Title"
              name="title"
              type="text"
              label={<Trans message="Title" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Role"
              name="role"
              type="text"
              label={<Trans message="Role" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Work URL"
              name="work_url"
              type="text"
              label={<Trans message="Work URL" />}
            />
          </div>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-12">
        <div className='bg-white border border-gray-200 rounded-lg shadow'>
          <div className='p-14 flex items-start justify-between border-b rounded-t dark:border-gray-600'>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Emails
            </h3>
          </div>
          <div className="p-14">
            <FormTextField
              autoFocus
              className='mb-12'
              placeholder="Email"
              name="email"
              type="email"
              label={<Trans message="Email" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Work Email"
              name="work_email"
              type="text"
              label={<Trans message="Work Email" />}
            />
          </div>
        </div>
        <div className='bg-white border border-gray-200 rounded-lg shadow'>
          <div className='p-14 flex items-start justify-between border-b rounded-t dark:border-gray-600'>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Phones
            </h3>
          </div>
          <div className="p-14">
            <FormTextField
              className='mb-12'
              placeholder="Home Phone"
              name="home_phone"
              type="text"
              label={<Trans message="Home Phone" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Work Phone"
              name="work_phone"
              type="text"
              label={<Trans message="Work Phone" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Cell Phone"
              name="cell_phone"
              type="text"
              label={<Trans message="Cell Phone" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Home Fax"
              name="home_fax"
              type="text"
              label={<Trans message="Home Fax" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Work Fax"
              name="work_fax"
              type="text"
              label={<Trans message="Work Fax" />}
            />

          </div>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-12">
        <div className='bg-white border border-gray-200 rounded-lg shadow'>
          <div className='p-14 flex items-start justify-between border-b rounded-t dark:border-gray-600'>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Home Address
            </h3>
          </div>
          <div className="p-14">
            <FormTextField
              className='mb-12'
              placeholder="Label"
              name="home_address_label"
              type="text"
              label={<Trans message="Label" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Street"
              name="home_address_street"
              type="text"
              label={<Trans message="Street" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="City"
              name="home_address_city"
              type="text"
              label={<Trans message="City" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="State / Province"
              name="home_address_state_or_province"
              type="text"
              label={<Trans message="State / Province" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Postal Code"
              name="home_address_postal_code"
              type="text"
              label={<Trans message="Postal Code" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Country"
              name="home_address_country"
              type="text"
              label={<Trans message="Country" />}
            />

          </div>
        </div>
        <div className='bg-white border border-gray-200 rounded-lg shadow'>
          <div className='p-14 flex items-start justify-between border-b rounded-t dark:border-gray-600'>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Work Address
            </h3>
          </div>
          <div className="p-14">
            <FormTextField
              className='mb-12'
              placeholder="Label"
              name="work_address_label"
              type="text"
              label={<Trans message="Label" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Street"
              name="work_address_street"
              type="text"
              label={<Trans message="Street" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="City"
              name="work_address_city"
              type="text"
              label={<Trans message="City" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="State / Province"
              name="work_address_state_or_province"
              type="text"
              label={<Trans message="State / Province" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Postal Code"
              name="work_address_postal_code"
              type="text"
              label={<Trans message="Postal Code" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Country"
              name="work_address_country"
              type="text"
              label={<Trans message="Country" />}
            />

          </div>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-12">
        <div className='bg-white border border-gray-200 rounded-lg shadow'>
          <div className='p-14 flex items-start justify-between border-b rounded-t dark:border-gray-600'>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Personal
            </h3>
          </div>
          <div className="p-14">
            <label className="block first-letter:capitalize text-left whitespace-nowrap text-sm mb-4">Birthday</label>
            <div className="grid grid-cols-3 gap-12">
              <FormTextField
                className='mb-12'
                placeholder="Day"
                name="birth_day"
                type="number"
              />
              <FormTextField
                className='mb-12'
                placeholder="Month"
                name="birth_month"
                type="number"
              />
              <FormTextField
                className='mb-12'
                placeholder="Year"
                name="birth_year"
                type="number"
              />
            </div>
            <label className="block first-letter:capitalize text-left whitespace-nowrap text-sm mb-4">Anniversary</label>
            <div className="grid grid-cols-3 gap-12">
              <FormTextField
                className='mb-12'
                placeholder="Day"
                name="anniversary_day"
                type="number"
              />
              <FormTextField
                className='mb-12'
                placeholder="Month"
                name="anniversary_month"
                type="number"
              />
              <FormTextField
                className='mb-12'
                placeholder="Year"
                name="anniversary_year"
                type="number"
              />
            </div>
            <FormTextField
              className='mb-12'
              placeholder="Personal URL"
              name="personal_url"
              type="text"
              label={<Trans message="Personal URL" />}
            />
            <FormRadioGroup
              className="mb-30"
              size="sm"
              name="gender"
              orientation="horizontal"
              label={<Trans message="Gender" />}
            >
              <FormRadio key="male" value="male">
                <Trans message="Male" />
              </FormRadio>
              <FormRadio key='female' value="female">
                <Trans message="Female" />
              </FormRadio>
              <FormRadio key='other' value="other">
                <Trans message="Other" />
              </FormRadio>
            </FormRadioGroup>

          </div>
        </div>
        <div className='bg-white border border-gray-200 rounded-lg shadow'>
          <div className='p-14 flex items-start justify-between border-b rounded-t dark:border-gray-600'>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Images
            </h3>
          </div>
          <div className="p-14">

            <FileUploadProvider>
              <FormImageSelector name="photo" diskPrefix="widgets" className='mb-10'/>
            </FileUploadProvider>
            <FileUploadProvider>
              <FormImageSelector name="logo" diskPrefix="widgets" />
            </FileUploadProvider>
            {/* <FileUploadProvider>
              <FormImageSelector
                name="photo"
                diskPrefix="biolinks"
                label={<Trans message="Photo" />}
              />
            </FileUploadProvider>
            <FileUploadProvider>
              <FormImageSelector
                name="logo"
                diskPrefix="biolinks"
                label={<Trans message="Logo" />}
              />
            </FileUploadProvider> */}
          </div>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-12">
        <div className='bg-white border border-gray-200 rounded-lg shadow'>
          <div className='p-14 flex items-start justify-between border-b rounded-t dark:border-gray-600'>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Social
            </h3>
          </div>
          <div className="p-14">
            <FormTextField
              className='mb-12'
              placeholder="Linkedin"
              name="linkedin"
              type="text"
              label={<Trans message="Linkedin" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Twitter"
              name="twitter"
              type="text"
              label={<Trans message="Twitter" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Facebook"
              name="facebook"
              type="text"
              label={<Trans message="Facebook" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Instagram"
              name="instagram"
              type="text"
              label={<Trans message="Instagram" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="Youtube"
              name="youtube"
              type="text"
              label={<Trans message="Youtube" />}
            />
            {/* <FormTextField
                className='mb-12'
                placeholder="Custom"
                name="custom"
                type="text"
            /> */}

            {/* <label className="block first-letter:capitalize text-left whitespace-nowrap text-sm mb-4">Custom</label>
            <div className="grid grid-cols-2 gap-10">
              <FormTextField
                className='mb-12'
                placeholder="Custom"
                name="custom"
                type="text"
              />
              <FormTextField
                className='mb-12'
                placeholder="https://www.custom.com/yourprofile"
                name="custom_social"
                type="text"
              />
            </div> */}

          </div>
        </div>
        <div className='bg-white border border-gray-200 rounded-lg shadow'>
          <div className='p-14 flex items-start justify-between border-b rounded-t dark:border-gray-600'>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Other
            </h3>
          </div>
          <div className="p-14">
            <FormTextField
              className='mb-12'
              placeholder="Note"
              name="note"
              type="text"
              label={<Trans message="Note" />}
            />
            <FormTextField
              className='mb-12'
              placeholder="UID"
              name="uid"
              type="text"
              label={<Trans message="UID" />}
            />
          </div>
        </div>
      </div>

      <FormTextField
        className='mb-12'
        placeholder="Button Text"
        name="button_text"
        type="text"
        label={<Trans message="Button Text" />}
        required
      />

    </CrupdateWidgetDialog>
  );
}

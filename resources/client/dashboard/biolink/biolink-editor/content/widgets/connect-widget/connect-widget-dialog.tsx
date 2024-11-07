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

export interface ConnectWidget extends BiolinkWidget {
  type: WidgetType.Connect;
  config: {
    button_text: string;
  };
}

interface ConnectWidgetDialogProps {
  biolink: Biolink;
  widget?: ConnectWidget;
}
export function ConnectWidgetDialog({ biolink, widget }: ConnectWidgetDialogProps) {
  const { trans } = useTrans();
  return (
    <CrupdateWidgetDialog
      dialogSize='fullscreen'
      biolink={biolink}
      type={WidgetType.Connect}
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
        placeholder="Button Text"
        name="button_text"
        type="text"
        label={<Trans message="Button Text" />}
        required
      />

    </CrupdateWidgetDialog>
  );
}

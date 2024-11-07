import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {nanoid} from 'nanoid';
import {useSettings} from '@common/core/settings/use-settings';
import {useRecaptcha} from '@common/recaptcha/use-recaptcha';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {AliasField} from '@app/dashboard/links/forms/alias-field';
import {LinkDomainSelect} from '@app/dashboard/links/forms/link-domain-select';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import { Biolink } from '@app/dashboard/biolink/biolink';
import { ConnectWidget } from './connect-widget-dialog';
import axios from 'axios';
import { useState } from 'react';
import { toast } from '@common/ui/toast/toast';
import { message } from '@common/i18n/message';

interface SendConnectMail{
  biolink_id?: number | null,
  name: string,
  email: string,
  phone: string,
  message: string,
}

interface ConnectWidgetDialogProps {
  biolink?: Biolink | null;
  widget?: ConnectWidget;
}

export function ConnectMailDialog({ biolink, widget }: ConnectWidgetDialogProps) {

  const navigate = useNavigate();
  const {formId, close} = useDialogContext();

  const form = useForm<SendConnectMail>({
    defaultValues: {
      biolink_id: biolink?.id,
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const [sending, setSending] = useState(false);

  const handleSubmit = async (values: SendConnectMail) => {
    setSending(true);
    try{
      const res = await axios.post("/api/v1/send-connect-mail", {...values});
      setSending(false);
      toast.positive(message("Mail sen't successfully!"));
      close();
    }catch(err:any){
      console.log(err);
      setSending(false);
      const msg = err.response.data?.message;
      toast.danger((message( msg ?? "Failed to send mail.")));
    }

  };

  return (
    <Dialog size="lg" radius="rounded-2xl">
      <DialogHeader>
        <Trans message={"Send message to "+biolink?.name} />
      </DialogHeader>
      <DialogBody>
        <Form
          form={form}
          id={formId}
          onBeforeSubmit={() => {
            // hook form won't clear errors for fields that are not bound to input
            form.clearErrors();
          }}
          onSubmit={handleSubmit}
        >
        <FormTextField
              name="name"
              label={<Trans message="Name" />}
              minLength={3}
              className="mb-12"
              autoFocus
            />

          <FormTextField
        autoFocus
        className='mb-12'
        name="email"
        type="email"
        label={<Trans message="E-mail" />}
      />

<FormTextField
        autoFocus
        className='mb-12'
        name="phone"
        type="text"
        label={<Trans message="Phone" />}
      />

          <FormTextField
            name="message"
            className="mb-24"
            label={<Trans message={"Note for "+biolink?.name} />}
            inputElementType="textarea"
            rows={2}
          />

        </Form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          onClick={() => {
            close();
          }}
        >
          <Trans message="Cancel" />
        </Button>
        <Button
          variant="flat"
          color="primary"
          type="submit"
          form={formId}
          disabled={sending}
        >
          <Trans message="Send" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

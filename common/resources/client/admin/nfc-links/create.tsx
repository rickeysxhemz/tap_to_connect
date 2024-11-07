import {Dialog} from '../../ui/overlays/dialog/dialog';
import {DialogHeader} from '../../ui/overlays/dialog/dialog-header';
import {Trans} from '../../i18n/trans';
import {DialogBody} from '../../ui/overlays/dialog/dialog-body';
import {DialogFooter} from '../../ui/overlays/dialog/dialog-footer';
import {Button} from '../../ui/buttons/button';
import {useDialogContext} from '../../ui/overlays/dialog/dialog-context';
import {useCreateNewNfcLink} from './requests/use-create-new-nfclink';
import {useContext} from 'react';
import {SiteConfigContext} from '../../core/settings/site-config-context';
import {useForm} from 'react-hook-form';
import {Form} from '../../ui/forms/form';
import {FormTextField} from '../../ui/forms/input-field/text-field/text-field';
import { NfcLink } from '@common/nfclink/nfclink';
import { downloadFileFromUrl } from '@common/uploads/utils/download-file-from-url';

export function CreateNfcLink() {
  const {close, formId} = useDialogContext();

  const form = useForm<Partial<NfcLink>>({
    defaultValues: {
      quantity: 1
    },
  });
  const createNewNfcLink = useCreateNewNfcLink(form);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="NFC Business Card links" />
      </DialogHeader>
      <DialogBody>
        <Form id={formId} form={form} onSubmit={(values) => {
          createNewNfcLink.mutate(values, {
            onSuccess: (response) => {
              console.log(response);
              downloadFileFromUrl("/nfc.csv");
              close();
            },
          });
        }}>
          <FormTextField
            type='number'
            name="quantity"
            label={<Trans message="Quantity" />}
            className="mb-20"
            required
            autoFocus
          />


        </Form>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={() => {
            close();
          }}
        >
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          disabled={createNewNfcLink.isLoading}
          variant="flat"
          color="primary"
          type="submit"
        >
          <Trans message="Generate" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

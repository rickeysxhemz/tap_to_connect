import {Dialog} from '../../ui/overlays/dialog/dialog';
import {DialogHeader} from '../../ui/overlays/dialog/dialog-header';
import {Trans} from '../../i18n/trans';
import {DialogBody} from '../../ui/overlays/dialog/dialog-body';
import {DialogFooter} from '../../ui/overlays/dialog/dialog-footer';
import {Button} from '../../ui/buttons/button';
import {useDialogContext} from '../../ui/overlays/dialog/dialog-context';
import {useContext, useState} from 'react';
import {SiteConfigContext} from '../../core/settings/site-config-context';
import {useForm} from 'react-hook-form';
import {Form} from '../../ui/forms/form';
import {FormTextField} from '../../ui/forms/input-field/text-field/text-field';
import { NfcLink } from '@common/nfclink/nfclink';
import { downloadFileFromUrl } from '@common/uploads/utils/download-file-from-url';
import {apiClient, queryClient} from '@common/http/query-client';
import axios from 'axios';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';

export function NfcUploadDialog() {
  const {close, formId} = useDialogContext();

  const form = useForm({
    defaultValues: {
      csv: ""
    },
  });

  const [csv, setCsv] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);


  const uploadCsvFile = async (values: any) => {

    setLoading(true);
    const formData = new FormData();
    formData.append("csv", csv ?? "");

    const res = await axios.post("/api/v1/nfc-links/csv/import", formData);
    console.log(res.data);
    setLoading(false);
    close();
    queryClient.invalidateQueries(DatatableDataQueryKey('nfc-links'));

  }

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Upload Csv File" />
      </DialogHeader>
      <DialogBody>
        <Form id={formId} form={form} onSubmit={uploadCsvFile}>


          <input onChange={(e) => e.target.files && setCsv(e.target.files[0])} required type="file" name="csv" className="block text-left relative w-full appearance-none transition-shadow text bg-transparent rounded border-divider border focus:ring focus:ring-primary/focus focus:border-primary/60 focus:outline-none shadow-sm text-sm h-42 pl-12 pr-12 py-8 file:bg-primary file:text-on-primary file:border-none file:rounded file:text-sm file:font-semibold file:px-10 file:h-24 file:mr-10"/>

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
          variant="flat"
          color="primary"
          type="submit"
          disabled={loading}
        >
          <Trans message="Upload" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

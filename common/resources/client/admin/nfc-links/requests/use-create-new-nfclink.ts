import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import { NfcLink } from '@common/nfclink/nfclink';

interface Response extends BackendResponse {
  nfclink: NfcLink;
}

interface Payload extends Partial<NfcLink> {}

export function useCreateNewNfcLink(form: UseFormReturn<Payload>) {
  const {trans} = useTrans();
  return useMutation((props: Payload) => createNewNfcLink(props), {
    onSuccess: () => {
      toast(trans(message('NFC Link created')));
      queryClient.invalidateQueries(DatatableDataQueryKey('nfc-links'));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createNewNfcLink(payload: Payload): Promise<Response> {
  return apiClient.post('nfc-links', payload).then(r => r.data);
}

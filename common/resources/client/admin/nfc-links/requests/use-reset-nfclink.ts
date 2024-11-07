import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {NfcLink} from '@common/nfclink/nfclink';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';


interface Response extends BackendResponse {
  nfclink: NfcLink;
}

export interface UpdateNfcLinkPayload extends Partial<NfcLink> {
  id: number;
  url_code: string;
  forward_to: string;
}

export function useUpdateNfcLink(form: UseFormReturn<UpdateNfcLinkPayload>) {
  const {trans} = useTrans();
  return useMutation((props: UpdateNfcLinkPayload) => updateNfcLink(props), {
    onSuccess: () => {
      toast(trans(message('NFC Link updated')));
      queryClient.invalidateQueries(DatatableDataQueryKey('nfc-links'));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateNfcLink({id, ...payload}: UpdateNfcLinkPayload): Promise<Response> {
  return apiClient.put(`update-nfc-links/${id}`, payload).then(r => r.data);
}

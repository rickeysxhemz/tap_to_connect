import React from 'react'
import axios from 'axios';
import { IconButton } from '@common/ui/buttons/icon-button';
import { CloseIcon } from '@common/icons/material/Close';
import { NfcLink } from '@common/nfclink/nfclink';
import {apiClient, queryClient} from '@common/http/query-client';
import {toast} from '@common/ui/toast/toast'; 
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';

interface CloseButtonProps {
  nfclink: NfcLink;
}


function ResetNfcCard({nfclink}: CloseButtonProps) {

  const {trans} = useTrans();

  const resetNfcCard = async () => {

    try{
      const res = await axios.post("/api/v1/reset-nfc",{id: nfclink.id});
      if(res.data == 1){
        toast(trans(message('NFC Link updated')));
        queryClient.invalidateQueries(DatatableDataQueryKey('nfc-links'));
      }
    }catch(err){
      console.log(err);
    }

  }

  return (
    <IconButton size="md" className="text-muted" onClick={resetNfcCard}>
      <CloseIcon className="icon-md text-danger" />
    </IconButton>
  )
}

export default ResetNfcCard
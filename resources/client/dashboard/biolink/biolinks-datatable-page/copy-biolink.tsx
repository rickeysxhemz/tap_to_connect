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
import { IconButton } from '@common/ui/buttons/icon-button';
import { CopyAllIcon } from '@common/icons/material/CopyAll';
import { CrupdateBiolinkFormValues } from './crupdate/crupdate-biolink-form-values';
import { toast } from '@common/ui/toast/toast';
import { queryClient } from '@common/http/query-client';
import {Biolink} from '@app/dashboard/biolink/biolink';
import axios from 'axios';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';

interface CopyBiolinkProps {
  link: Biolink;
}

export function CopyBiolink({link}: CopyBiolinkProps) {

  const {trans} = useTrans();

  const handleSubmit = async () => {

    try{
      const res = await axios.post("/api/v1/copy-biolink",{id: link.id});
      if(res.data && res.data.success == true){
        toast(trans(message('Biolink Copied Successfully.')));
        queryClient.invalidateQueries(DatatableDataQueryKey('biolink'));
      }
    }catch(err){
      console.log(err);
    }

  }

  return (
    <IconButton
    size="md"
    className="text-muted"
    onClick={handleSubmit}
  >
    <CopyAllIcon />
  </IconButton>
  );
}

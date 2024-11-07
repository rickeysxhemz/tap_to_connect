import { Dialog } from '../../ui/overlays/dialog/dialog';
import { DialogHeader } from '../../ui/overlays/dialog/dialog-header';
import { Trans } from '../../i18n/trans';
import { DialogBody } from '../../ui/overlays/dialog/dialog-body';
import { DialogFooter } from '../../ui/overlays/dialog/dialog-footer';
import { Button } from '../../ui/buttons/button';
import { useDialogContext } from '../../ui/overlays/dialog/dialog-context';
import { useForm } from 'react-hook-form';
import { NfcLink } from '../../nfclink/nfclink';
import { UpdateNfcLinkPayload, useUpdateNfcLink } from './requests/use-update-nfclink';
import {FormSelect} from '../../ui/forms/select/select';
import {Item} from '../../ui/forms/listbox/item';
import {Form} from '../../ui/forms/form';
import {useContext, useEffect, useState} from 'react';
import {SiteConfigContext} from '../../core/settings/site-config-context';
import { FormRadioGroup } from '@common/ui/forms/radio-group/radio-group';
import { FormRadio } from '@common/ui/forms/radio-group/radio';
import axios from 'axios';
import {Link} from 'react-router-dom'

interface UpdateTagDialogProps {
  nfclink: NfcLink;
}

interface Profile {
  id: number;
  name: string;
}

interface DLink {
  id: number;
  name: string;
}

export function UpdateNfcLinkDialog({ nfclink }: UpdateTagDialogProps) {
  const { close, formId } = useDialogContext();
  const form = useForm<UpdateNfcLinkPayload>({
    defaultValues: {
      id: nfclink.id,
      url_code: nfclink.url_code,
      forward_to: nfclink.forward_to ?? "digital_profile",
      forward_id: nfclink.forward_id
    },
  });
  const updateNfcLink = useUpdateNfcLink(form);

  const [show, setShow] = useState(nfclink.forward_to ?? "digital_profile");

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const fetchDigitalProfiles = async () => {

    try{
      const res = await axios.get("/api/v1/digital-profiles");
      setProfiles(res.data.data);
    }catch(err){
      console.log(err);
    }

  }

  const [links, setLinks] = useState<DLink[]>([]);
  const fetchLinks = async () => {
    try{
      const res = await axios.get("/api/v1/digital-links");
      setLinks(res.data.data);
    }catch(err){
      console.log(err);
    }

  }

  useEffect(() => {
    fetchDigitalProfiles();
    fetchLinks();
  }, []);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Update NFC link" />
      </DialogHeader>
      <DialogBody>
        <Form id={formId} form={form} onSubmit={values => {
          updateNfcLink.mutate(values as UpdateNfcLinkPayload, {
            onSuccess: () => {
              close();
            },
          });
        }}>

          <FormRadioGroup
            required
            className="mb-30"
            size="sm"
            name="forward_to"
            orientation="horizontal"
            label={<Trans message="Forward To" />}
          >
            <FormRadio key="digital_profile" value="digital_profile" onClick={() => setShow('digital_profile')}>
              <Trans message="Digital Profile" />
            </FormRadio>
            <FormRadio key='link' value="link" onClick={() => setShow('link')}>
              <Trans message="Link" />
            </FormRadio>
          </FormRadioGroup>

          {
            show == "digital_profile" ?
            <div>
              <FormSelect name="forward_id" selectionMode="single">
            {profiles
              .map((profile) => (
                <Item key={profile.id} value={profile.id}>
                  <Trans message={profile.name} />
                </Item>
              ))}
          </FormSelect>
          {
            profiles.length == 0 && links.length == 0 &&
            <p className='pt-10'>If you don’t have any links or digital profiles yet, <Link className='text-primary' to="/dashboard/biolinks">click here</Link> to create your first digital profile</p>
          }
            </div>
          :
            <div>
              <FormSelect name="forward_id" selectionMode="single">
            {links
              .map((link) => (
                <Item key={link.id} value={link.id}>
                  <Trans message={link.name} />
                </Item>
              ))}
          </FormSelect>
          {
            profiles.length == 0 && links.length == 0 &&
            <p className='pt-10'>If you don’t have any links or digital profiles yet, <Link className='text-primary' to="/dashboard/links">click here</Link> to create your first link</p>
          }
            </div>
          }



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
          disabled={updateNfcLink.isLoading}
          variant="flat"
          color="primary"
          type="submit"
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

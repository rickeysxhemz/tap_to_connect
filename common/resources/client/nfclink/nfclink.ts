export const TAG_MODEL = 'nfclink';

export interface NfcLink {
  id: number;
  url_code: string;
  name: string;
  link: string;
  copy_url: string;
  quantity: number;
  forward_id: number;
  forward_to: string;
  username: string;
  model_type: typeof TAG_MODEL;
}

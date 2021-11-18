export type APIResponse = IllegalSite[];

export interface IllegalSite {
  domain: string;
  notes?: string;
  path?: string;
  reason?: string;
  ext_redirFrom?: string;
}

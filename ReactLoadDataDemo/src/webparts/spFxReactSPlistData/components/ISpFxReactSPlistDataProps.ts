import {SPHttpClient} from '@microsoft/sp-http';
export interface ISpFxReactSPlistDataProps {
  description: string;
  spHttpClient:SPHttpClient;
  currentUrl: string;
}

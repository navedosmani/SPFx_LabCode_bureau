import { Store } from 'redux';
import { IApplicationState } from './IApplicationState';
export interface IReduxWpProps {
  store:Store<IApplicationState>;
}

import * as React from 'react';
import styles from './ReduxWp.module.scss';
import { IReduxWpProps } from './IReduxWpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IApplicationState } from './IApplicationState';

import { increment, decrement } from './Action';

export default class Newcomponent extends React.Component<IReduxWpProps, IApplicationState, {}> {

  private store = this.props.store;

  public render(): React.ReactElement<IReduxWpProps> {
    return (
      <div>
        <div>New Component executed</div>
        <h2>Counter Value : {this.store.getState().count} </h2>
      </div>
    );
  }
}

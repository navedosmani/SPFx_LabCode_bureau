import * as React from 'react';
import styles from './ReduxWp.module.scss';
import { IReduxWpProps } from './IReduxWpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IApplicationState } from './IApplicationState';
import { increment, decrement } from './Action';
import Newcomponent from './Newcomponent';


export default class ReduxWp extends React.Component<IReduxWpProps, IApplicationState, {}> {
  private store = this.props.store;

  public render(): React.ReactElement<IReduxWpProps> {
    return (
      <div>
        <div className={styles.counter}>
          <h2>Counter</h2>
          <div>
            <button onClick={() => { this.store.dispatch(decrement()); }}>-</button>
            <span>{this.store.getState().count}</span>
            <button onClick={() => { this.store.dispatch(increment()); }}>+</button>
          </div>
        </div>
        <Newcomponent store={this.store}></Newcomponent>
      </div>
    );
  }
}


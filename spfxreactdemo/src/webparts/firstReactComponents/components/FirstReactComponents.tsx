import * as React from 'react';
import styles from './FirstReactComponents.module.scss';
import { IFirstReactComponentsProps } from './IFirstReactComponentsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {Welcome} from './Welcome/Welcome';

export default class FirstReactComponents extends React.Component<IFirstReactComponentsProps, {}> {
  public render(): React.ReactElement<IFirstReactComponentsProps> {
    return (
      <div className={ styles.firstReactComponents }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <Welcome name="React1 Training" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import Products from '../Products';
import {IWelcomeProps} from './../Welcome/IWelcomeProps';

export class Welcome extends React.Component<IWelcomeProps,{}>{
  public render():React.ReactElement<IWelcomeProps>{
    return (<div>
      <div>Welcome to {this.props.name}</div>
      <Products Items="all items"/>
      </div>);
  }
}

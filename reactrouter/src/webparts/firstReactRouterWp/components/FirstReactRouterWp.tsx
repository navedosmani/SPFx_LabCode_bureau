import * as React from 'react';
import styles from './FirstReactRouterWp.module.scss';
import { IFirstReactRouterWpProps } from './IFirstReactRouterWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {HashRouter, Route} from "react-router-dom";

import {Nav, INavStyles, INavLinkGroup} from '@fluentui/react/lib/Nav';
import {Stack, IStackItemTokens, IStackTokens} from '@fluentui/react/lib/Stack';
import SPFxCustomers from './Customers';
import CustomerDetails from './Customerdetails';
import Aboutus from './Aboutus';

const navStyles: Partial<INavStyles> = {root:{width:250}};
const stackTokens: IStackTokens = {childrenGap: 50};

const navLinksGroups: INavLinkGroup[] = [
  {
    name:'Customer Management',
    links:[
      {
        key: 'Customers',
        name: 'Customers',
        url: '#/'
      },
      {
        key: 'CustomerDetails',
        name: 'Customer Details',
        url: '#/Customer/188281'
      },
      {
        key: 'About',
        name: 'About us',
        url: '#/about'
      }
    ]
  }
];

export default class FirstReactRouterWp extends React.Component<IFirstReactRouterWpProps, {}> {
  public render(): React.ReactElement<IFirstReactRouterWpProps> {
    return (
      <div className={ styles.firstReactRouterWp }>
        <Stack horizontal tokens={stackTokens}>
          <Nav styles={navStyles} groups={navLinksGroups}/>
          <HashRouter>
           <Route path="/" exact component = {SPFxCustomers}></Route>
           <Route path="/Customer/:number" component = {CustomerDetails}></Route>
           <Route path="/about" exact component = {Aboutus}></Route>
          </HashRouter>
        </Stack>
      </div>
    );
  }
}

import * as React from 'react';
import styles from './SpfxpnpWp.module.scss';
import { ISpfxpnpWpProps } from './ISpfxpnpWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { IViewField,ListView, SelectionMode,GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import {sp} from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import * as moment from 'moment';

export interface ISpfxpnpWpState{
  items: any[];
  viewFields:IViewField[];
}

export default class SpfxpnpWp extends React.Component<ISpfxpnpWpProps,ISpfxpnpWpState, {}> {
  constructor(props:ISpfxpnpWpProps, state:ISpfxpnpWpState){
    super(props);

    sp.setup({
      spfxContext: this.props.context
    });

    var _viewFields: IViewField[] = [
      {
        name:"ID",
        displayName:"ID",
        isResizable: true,
        sorting:true,
        minWidth:0,
        maxWidth:50
      },
      {
        name:"Title",
        displayName:"Event Name",
        isResizable: true,
        sorting:true,
        minWidth:0,
        maxWidth:200
      },
      {
        name:"EventDetails",
        displayName:"Event Details",
        isResizable: true,
        sorting:true,
        minWidth:0,
        maxWidth:200
      },
      {
        name:"EventDate",
        displayName:"Event Date",
        isResizable: true,
        sorting:true,
        minWidth:0,
        maxWidth:100,
        render: (item:any) =>{
          const edate = item["EventsDate"];
          if(edate){
            const eventdate = moment(edate);
            return <span>{eventdate.format('DD/MM/YYYY')}</span>;
          }
        }
      },
      {
        name:"Organizer.Title",
        displayName:"Organizer",
        isResizable: true,
        sorting:true,
        minWidth:0,
        maxWidth:100
      },
      {
        name:"EventType",
        displayName:"Event Type",
        isResizable: true,
        sorting:true,
        minWidth:0,
        maxWidth:50
      }
    ];

    this.state = {items:[], viewFields:_viewFields};
    this.getLists();
  }

  private async getLists(){
    const allitems: any[] = await sp.web.lists
      .getByTitle("SPFxEvents")
      .items
      .select ("ID", "Title", "EventDetails","EventDate", "EventType", "Organizer/Title")
      .expand ("Organizer")
      .top(100)
      .get();

      this.setState({items:allitems});
  }

  public render(): React.ReactElement<ISpfxpnpWpProps> {
    return (
      <div className={ styles.spfxpnpWp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <ListView
              items = {this.state.items}
              viewFields = {this.state.viewFields}
              showFilter = {true}
              compact = {true}/>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import styles from './SpFxConsumeSpListData.module.scss';
import { ISpFxConsumeSpListDataProps } from './ISpFxConsumeSpListDataProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ISpFxConsumeSpListDataState } from './ISpFxConsumeSpListDataState';
import {IListItem} from './IListItem';
import {MSGraphClient} from '@microsoft/sp-http';

import {
  PrimaryButton,
  TextField,
  Label,
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode
}
from 'office-ui-fabric-react';

let _listItemColumns = [
  {
    key:"ContactPerson",
    name:"Contact Person",
    fieldName: "Title",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true
  },
  {
    key:"ContactNumber",
    name:"Contact Number",
    fieldName: "ContactNumber",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true
  },
  {
    key:"CompanyName",
    name:"Company Name",
    fieldName: "CompanyName",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true
  },
  {
    key:"Country",
    name:"Country",
    fieldName: "Country",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true
  }

];

export default class SpFxConsumeSpListData extends React.Component<ISpFxConsumeSpListDataProps,ISpFxConsumeSpListDataState, {}> {
  constructor(props:ISpFxConsumeSpListDataProps, state:ISpFxConsumeSpListDataState){
    super(props);
    this.state = {lists:[]};
  }

  public componentDidMount(){
    this.props.context.msGraphClientFactory
    .getClient()
    .then((client:MSGraphClient):void =>{

      client
      .api("sites('root')/lists('SPFxContacts')/items?expand=fields")
      .version("v1.0")
      .get((err,res) => {

        if(err){
          console.error(err);
          return;
        }

        var _lists:Array<IListItem> = new Array<IListItem>();

        res.value.map((item:any)=>{
          _lists.push({
            Title:item.fields.Title,
            ContactNumber:item.fields.ContactNumber,
            CompanyName:item.fields.CompanyName,
            Country:item.fields.Country
          });
        });

        this.setState({lists:_lists});

      });
    });
  }

  public render(): React.ReactElement<ISpFxConsumeSpListDataProps> {
    return (
      <div className={ styles.spFxConsumeSpListData }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
             <span className={styles.title}> List of Contact information </span>
             {
               (this.state.lists != null && this.state.lists.length >0) ?
               <p className={styles.from}>
                 <DetailsList
                 items = {this.state.lists}
                 columns = {_listItemColumns}
                 setKey = 'set'
                 checkboxVisibility = {CheckboxVisibility.hidden}
                 selectionMode = {SelectionMode.none}
                 layoutMode = {DetailsListLayoutMode.fixedColumns}
                 compact = {true}
                 />
               </p>
               :
               null
             }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

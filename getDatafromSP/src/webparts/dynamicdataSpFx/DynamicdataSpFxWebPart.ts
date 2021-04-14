import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './DynamicdataSpFxWebPart.module.scss';
import * as strings from 'DynamicdataSpFxWebPartStrings';

import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';


export interface IDynamicdataSpFxWebPartProps {
  listname: string;
  checkbox1: boolean;
}

export interface ISPListItem {
  Title: string;
  Id: string;
  Created: string;
}

export interface ISPListItems {
  value: ISPListItem[];
}

export default class DynamicdataSpFxWebPart extends BaseClientSideWebPart<IDynamicdataSpFxWebPartProps> {
  private listName:string = "";
  private checkbox1Pro:string = "Created";
  private getOptions:Array<IPropertyPaneDropdownOption> ;

  public render(): void {
    this.listName = this.properties.listname;
    this.domElement.innerHTML = `
      <div class="${styles.dynamicdataSpFx}">
      <div class="${styles.Table}">
      <div class = "${styles.Heading}">
        <div class="${styles.cell}">Title</div>

     </div>
      </div>
    </div>

      </div>`;

      this.loadData();
  }

  private loadData():void{
    let url:string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('" + this.listName +"')/items?select=Title";

    if(this.properties.checkbox1){
      url+= ",Created";
      this.domElement.querySelector("." + styles.Heading).innerHTML += `<div class="${styles.cell}">Created</div>`;
    }
    debugger;
    this.GetListData(url).then((response)=>{
      this.RenderListData(response.value);
    });
  }

  private loadOptions(listItems:ISPListItem[]):Array<IPropertyPaneDropdownOption>{
    let option:Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
    if(listItems){
      listItems.forEach((listItem:ISPListItem)=>{
        option.push({key:listItem.Title, text:listItem.Title});
      });
    }
      return option;
  }

  private GetListData(url:string):Promise<ISPListItems>{
    return this.context.spHttpClient.get(url,SPHttpClient.configurations.v1)
    .then((response:SPHttpClientResponse)=>{
      return response.json();
    });
  }

  private RenderListData(listItems:ISPListItem[]):void{
    let strHtml ="";
    if(listItems){
      listItems.forEach((listItem:ISPListItem)=>{

        strHtml += `<div class="${styles.row}">`;
        strHtml += `<div class="${styles.cell}"><p>${listItem.Title}</p></div>`;
          if(this.properties.checkbox1){
            //let itemCreatedstr:string = listItem.Created;
            //let ItemTime:Date = new Date(itemCreatedstr);
            strHtml += `<div class="${styles.cell}"><p>${listItem.Created}</p></div>`;
          }
          strHtml += '</div>';
      });

      this.domElement.querySelector("."+styles.Table).innerHTML += strHtml;

      this.getOptions = this.loadOptions(listItems);
    }


  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listname', {
                  label: "List Name",
                  description:"Enter List Name"
                }),
                PropertyPaneCheckbox('checkbox1',{
                  text:this.checkbox1Pro
                }),
                PropertyPaneDropdown('dropdown1',{
                  label:"List of Items",
                  options:this.getOptions
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

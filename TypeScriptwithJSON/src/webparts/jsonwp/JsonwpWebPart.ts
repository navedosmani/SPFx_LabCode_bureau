import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './JsonwpWebPart.module.scss';
import * as strings from 'JsonwpWebPartStrings';

import * as plannets from './components/GetPlanets';

export interface IJsonwpWebPartProps {
  description: string;
}

export default class JsonwpWebPart extends BaseClientSideWebPart<IJsonwpWebPartProps> {

  public render(): void {

    let getPlannets = new plannets.getPlannets();
    let plannetNames:string[] = getPlannets.listAllPlannets();

    let listplannetNames:string = "<ul>";
    for(let i=0; i<plannetNames.length; i++){
      listplannetNames += '<li><button type = button id ="btn" class="btn" value= ' + plannetNames[i] +'>' + plannetNames[i] + '</button></li>';
    }
    listplannetNames += '</ul>';

    this.domElement.innerHTML = `
      <div class="${ styles.jsonwp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
            <span><h1>${this.properties.description}</h1></span>
              <span class="${ styles.title }">${listplannetNames}</span>
              <div id="details"></div>
            </div>
          </div>
        </div>
      </div>`;
      this._setButtonEventHandlers();
  }

  private _setButtonEventHandlers():void{
    let getplanet = new plannets.getPlannets();

    document.querySelectorAll('.btn').forEach(item =>{
      let plannetname:string = item.innerHTML;
      item.addEventListener('click', event =>{
        getplanet.getPlannetdetails(plannetname);
      });
    });
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

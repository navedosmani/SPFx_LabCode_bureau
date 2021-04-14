import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PropertyPaneCustomFieldWebPart.module.scss';
import * as strings from 'PropertyPaneCustomFieldWebPartStrings';
import {PropertyPanemyTextField} from './Modules/PropertyPanemyTextField';
export interface IPropertyPaneCustomFieldWebPartProps {
  description: string;
  customproperty:string;
}

export default class PropertyPaneCustomFieldWebPart extends BaseClientSideWebPart<IPropertyPaneCustomFieldWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.propertyPaneCustomField }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>

              <p class="${ styles.description }">${escape(this.properties.customproperty)}</p>

            </div>
          </div>
        </div>
      </div>`;
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
                }),
                new PropertyPanemyTextField('customproperty',{
                  label:"My Custom Control",
                  properties:this.properties,
                  backgroundcolor:"yellow",
                  color:"red",
                  defaultvalue:"My custom default value",
                  description:"Description"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

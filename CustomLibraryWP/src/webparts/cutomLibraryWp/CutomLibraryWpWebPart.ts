import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CutomLibraryWpWebPart.module.scss';
import * as strings from 'CutomLibraryWpWebPartStrings';

import * as mylibrary from 'custom-library';

export interface ICutomLibraryWpWebPartProps {
  description: string;
}

export default class CutomLibraryWpWebPart extends BaseClientSideWebPart<ICutomLibraryWpWebPartProps> {

  public render(): void {

    const myInstance = new mylibrary.MylibrarySolutionLibrary();

    this.domElement.innerHTML = `
      <div class="${ styles.cutomLibraryWp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">
              <p>${myInstance.getCurrentTime()}</p>
              </span>

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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

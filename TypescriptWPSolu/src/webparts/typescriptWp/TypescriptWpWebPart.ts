import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TypescriptWpWebPart.module.scss';
import * as strings from 'TypescriptWpWebPartStrings';

import * as empInfo from '../components/module1';

import {IPerson} from './../components/IPerson';

export interface ITypescriptWpWebPartProps {
  description: string;
}

const username = {
  firstname: "Jenkins",
  lastname: "NS"
};

export default class TypescriptWpWebPart extends BaseClientSideWebPart<ITypescriptWpWebPartProps> {

  public render(): void {
    let empinfo = new empInfo.employee('Oliver',10);
    let employeereturn = empinfo.displayEmployee();

    let fullname:string = this.welcomeuser(username);

    this.domElement.innerHTML = `
      <div class="${ styles.typescriptWp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
            <span class="${ styles.title }">Full Name ${fullname}</span> <br>
              <span class="${ styles.title }">${employeereturn}</span><br>
              <span class="${ styles.title }">Age : ${empInfo.age}</span><br>
              <span class="${ styles.title }">Data : ${empInfo.sgtrval}</span><br>

            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected welcomeuser(user:IPerson):string {
    return `Hey ${user.firstname} ${user.lastname} - Welcome to SPFx training`;
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

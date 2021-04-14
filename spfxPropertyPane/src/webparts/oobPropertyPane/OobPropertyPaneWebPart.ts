import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneCheckbox,
  PropertyPaneChoiceGroup,
  PropertyPaneHorizontalRule,
  PropertyPaneToggle,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './OobPropertyPaneWebPart.module.scss';
import * as strings from 'OobPropertyPaneWebPartStrings';

export interface IOobPropertyPaneWebPartProps {
  name: string;
  description: string;
  dropdown1: string;
  slider1: string;
  toggle1: string;
  radiobuttonfiletype:string;
}

export default class OobPropertyPaneWebPart extends BaseClientSideWebPart<IOobPropertyPaneWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.oobPropertyPane}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <p class="${styles.title}">Name : ${this.properties.name}</p>
              <p class="${styles.title}">Description : ${this.properties.description}</p>
              <p class="${styles.title}">Dropdown : ${this.properties.dropdown1}</p>
              <p class="${styles.title}">Toggle : ${this.properties.toggle1}</p>
              <p class="${styles.title}">slider : ${this.properties.slider1}</p>
              <p class="${styles.title}">Radio Button : ${this.properties.radiobuttonfiletype}</p>

            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let getOptions: Array<IPropertyPaneDropdownOption> = this.loadOptions();
    return {
      pages: [
        {
          header: {
            description: "Page 1"
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "Group 1",
              isCollapsed: false,
              groupFields: [
                PropertyPaneTextField('name', {
                  label: "Name",
                  description: "Please enter Name: ",
                  placeholder: "Please enter name",
                  multiline: false,
                  resizable: false,
                  maxLength: 25,
                  value: "",
                  onGetErrorMessage: this.validateexample.bind(this)
                }),
                PropertyPaneTextField('description', {
                  label: "Description",
                  multiline: true,
                  description: "Please enter description"
                })
              ]
            },
            {
              groupName: "Group 2",
              isCollapsed: true,
              groupFields: [
                PropertyPaneDropdown('dropdown1', {
                  label: "Select option",
                  options: getOptions,
                }),
                PropertyPaneSlider("slider1", {
                  label: "Slider",
                  max: 200,
                  min: 10
                }),
                PropertyPaneToggle("toggle1", {
                  label: "Toggle",
                  checked: false
                })
              ]
            }
          ]
        },
        {
          header: {
            description: "Page 2"
          },
          groups: [
            {
              groupFields: [
                PropertyPaneButton("normal", {
                  text: "Normal Button",
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: this.buttonClick_Event,
                  description: "Normal Button"
                }),
                PropertyPaneButton("icon button", {
                  text: "icon button",
                  buttonType: PropertyPaneButtonType.Icon,
                  icon: "Add",
                  onClick: this.buttonClick_Event
                })
              ]
            }
          ]
        },
        {
          header: {
            description: "Page 3"
          },
          groups: [
            {
              groupFields: [
                PropertyPaneChoiceGroup('radiobutton1', {
                  label: "Radio button 1",
                  options: [
                    { key: 'choice1', text: 'Choice 1' },
                    { key: 'choice2', text: 'Choice 2' },
                    { key: 'choice3', text: 'Choice 3', checked: true },
                    { key: 'choice4', text: 'Choice 4' },
                  ]
                }),
                PropertyPaneChoiceGroup('radiobutton2', {
                  label: "Radio button 2",
                  options: [
                    { key:'chart',iconProps:{officeFabricIconFontName:'Chart'},text:'Chart'},
                    { key:'barchart',iconProps:{officeFabricIconFontName:'BarChart4'},text:'barChart'},
                    { key:'Pie',iconProps:{officeFabricIconFontName:'PieDouble'},text:'Pie Chart'},
                  ]
                }),
                PropertyPaneChoiceGroup('radiobuttonfiletype', {
                  label: 'Image Choices :',
                  options: [
                    { key: 'Word', text: 'Word',
                      imageSrc: 'https://bureauspfx.sharepoint.com/Shared%20Documents/docx_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://bureauspfx.sharepoint.com/Shared%20Documents/docx_32x1.png'
                    },
                    { key: 'Excel', text: 'Excel',
                      imageSrc: 'https://bureauspfx.sharepoint.com/Shared%20Documents/xlsx_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://bureauspfx.sharepoint.com//Shared%20Documents/xlsx_32x1.png'
                    },
                    { key: 'PowerPoint', text: 'PowerPoint',
                      imageSrc: 'https://bureauspfx.sharepoint.com/Shared%20Documents/pptx_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://bureauspfx.sharepoint.com/Shared%20Documents/pptx_32x1.png'
                    },
                    { key: 'OneNote', text: 'OneNote',
                      imageSrc: 'https://bureauspfx.sharepoint.com/Shared%20Documents/one_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://bureauspfx.sharepoint.com/Shared%20Documents/one_32x1.png'
                    }
                  ]
                }),

              ]
            }
          ]
        }

      ]
    };
  }
  private buttonClick_Event() {
    alert("button clicked");
  }
  private validateexample(value: string): string {
    if (value === null || value.trim().length === 0) {
      return "Please enter the value";
    } else if (value.length > 15) {
      return "Length should be less than 15";
    }

  }

  private loadOptions(): Array<IPropertyPaneDropdownOption> {
    let options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
    options.push({ key: "test1", text: 'test1' });
    options.push({ key: "test2", text: 'test2' });
    options.push({ key: "test3", text: 'test3' });
    options.push({ key: "test4", text: 'test4' });

    return options;
  }

}

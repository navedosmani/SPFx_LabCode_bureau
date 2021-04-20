import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'MyfieldcustomerFieldCustomizerStrings';
import styles from './MyfieldcustomerFieldCustomizer.module.scss';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMyfieldcustomerFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'MyfieldcustomerFieldCustomizer';

export default class MyfieldcustomerFieldCustomizer
  extends BaseFieldCustomizer<IMyfieldcustomerFieldCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated MyfieldcustomerFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "MyfieldcustomerFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.
    const text: string = `${event.fieldValue}`;

    let backgroundcolor = "#0094ff";
    if(parseInt(text) < 30){
      backgroundcolor = "#FF0000";
    }
    else if(parseInt(text) < 60){
      backgroundcolor = "#00FF00";
    }

    event.domElement.innerHTML = `
    <div class="${styles.Myfieldcustomer}">
    <div class="${styles.full}">
    <div style='width:${text}%; background:${backgroundcolor}; color:#ffffff'>
    &nbsp; ${text}%
    </div>
    </div>
    </div>
    `;

    event.domElement.classList.add(styles.cell);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}

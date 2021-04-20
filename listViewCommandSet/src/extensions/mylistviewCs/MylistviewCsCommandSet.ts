import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'MylistviewCsCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMylistviewCsCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'MylistviewCsCommandSet';

export default class MylistviewCsCommandSet extends BaseListViewCommandSet<IMylistviewCsCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized MylistviewCsCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const GetItemButton: Command = this.tryGetCommand('GetItemButton');
    const MultipleItemButton: Command = this.tryGetCommand('MultipleItemButton');
    const AlertMessageButton: Command = this.tryGetCommand('AlertMessageButton');

    if(GetItemButton){
      GetItemButton.visible = event.selectedRows.length === 1;
    }

    if(MultipleItemButton){
      MultipleItemButton.visible = event.selectedRows.length > 0;
    }

    if (AlertMessageButton) {
      AlertMessageButton.visible = event.selectedRows.length === 0;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    let title = "";
    switch (event.itemId) {
      case 'GetItemButton':
        Dialog.alert(`${event.selectedRows[0].getValueByName("Title")}`);
        break;
      case 'MultipleItemButton':
        this._multipleitemEvent(event);
        break;
        case 'AlertMessageButton':
          Dialog.alert(`you cliecked alert message`);
          break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _multipleitemEvent(event: IListViewCommandSetExecuteEventParameters){
    let title = "";
    for(var i=0; i< event.selectedRows.length;i++){
      title += " " + event.selectedRows[i].getValueByName("Title");
    }
    Dialog.alert(title);
  }
}

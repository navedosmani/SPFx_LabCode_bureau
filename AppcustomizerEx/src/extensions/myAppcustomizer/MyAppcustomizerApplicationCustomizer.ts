import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import styles from './AppCustomizer.module.scss';
import * as strings from 'MyAppcustomizerApplicationCustomizerStrings';
import { escape } from '@microsoft/sp-lodash-subset';
const LOG_SOURCE: string = 'MyAppcustomizerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMyAppcustomizerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class MyAppcustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<IMyAppcustomizerApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceholders);
    return Promise.resolve();
  }

  private _renderPlaceholders(): void {

    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top,
        { onDispose: this._onDispose });
    }

    if (!this._topPlaceholder) {
      return;
    }


    let topString: string = this.properties.Top;
    if (!topString) {
      topString = "(Top property was not defined)";
    }

    if (this._topPlaceholder.domElement) {
      this._topPlaceholder.domElement.innerHTML = `
        <div class ="${styles.app}">
        <div class ="${styles.top}">
        <div class="${styles.navbar}">
          <a href="#">Home</a>
          <a href="#">News</a>
          <a href="#">Contact Us</a>
          <a href="#">About us</a>
        </div>
        </div>
        </div>
        `;
    }

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom,
        { onDispose: this._onDispose });
    }

    if (!this._bottomPlaceholder) {
      return;
    }

    if (this.properties) {
      let bottomString: string = this.properties.Bottom;
      if (!bottomString) {
        bottomString = "(Top property was not defined)";
      }

      if (this._bottomPlaceholder.domElement) {
        this._bottomPlaceholder.domElement.innerHTML = `
        <div class ="${styles.app}">
        <div class ="${styles.bottom}">
        <div class="${styles.navbar}">
        <a href="#">Terms and condition</a>
        <a href="#">Privacy</a>
        </div>
        </div>
        </div>
        `;
      }
    }
  }


  private _onDispose(): void {
    console.log("dispose called");
  }
}

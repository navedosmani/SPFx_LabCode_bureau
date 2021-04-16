import * as React from 'react';
import styles from './DisplayTab.module.scss';
import { IDisplayTabProps } from './IDisplayTabProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';


const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export default class DisplayTab extends React.Component<IDisplayTabProps, {}> {
  public render(): React.ReactElement<IDisplayTabProps> {
    return (

            <Pivot>
              <PivotItem headerText="Tab 1">
                <Label styles={labelStyles}><PrimaryButton text="Primary" allowDisabledFocus  /></Label>
              </PivotItem>
              <PivotItem headerText="Tab 2">
                <Label styles={labelStyles}>Tab 2 loaded</Label>
              </PivotItem>
              <PivotItem headerText="Tab 3">
                <Label styles={labelStyles}>Tab 3 loaded</Label>
              </PivotItem>
              <PivotItem headerText="Tab 4">
                <Label styles={labelStyles}>Tab 4 loaded</Label>
              </PivotItem>
            </Pivot>

    );
  }
}

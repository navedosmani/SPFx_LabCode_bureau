import * as React from 'react';

import { IProducts } from './IProducts';

export interface IProductsListProps {
  products: IProducts[];
}

export class ProductsList extends React.Component<IProductsListProps, {}>{

  public render(): React.ReactElement<IProductsListProps> {
    return (<ul>
      {
        this.props.products.map(productItem => (
          <li>
            {productItem.Title}
            <button type="button" id={productItem.id.toString()} onClick={()=>this.onButtonClick(productItem)}>Get Product details</button>
          </li>
        ))
      }
    </ul>);
  }

  private onButtonClick(product:IProducts):void{
    alert("Title : " + product.Title + " - ID " + product.id);
  }
}

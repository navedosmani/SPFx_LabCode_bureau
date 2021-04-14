import * as React from 'react';

import { IProducts } from './IProducts';

export interface IProductsListProps {
  products: IProducts[];
  onRemoveProduct: RemoveProductCallback;
}

export type RemoveProductCallback = (products: IProducts) => void;

export class ProductsList extends React.Component<IProductsListProps, {}>{

  public render(): React.ReactElement<IProductsListProps> {
    return (<ul>
      {
        this.props.products.map(productItem => (
          <li>
            {productItem.Title}
            <button type="button" id={productItem.id.toString()} onClick={() => this.onButtonClick(productItem)}>Delete</button>
          </li>
        ))
      }
    </ul>);
  }

  private onButtonClick(product: IProducts): void {
    if (window.confirm('Are you sure delete the product'))
      this.props.onRemoveProduct(product);
  }
}

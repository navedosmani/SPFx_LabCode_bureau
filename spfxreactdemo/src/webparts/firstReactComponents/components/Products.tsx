import * as React from 'react';
import Electronics from './Electronics';

export interface IProductsProps{
  Items:string;
}
export default class Products extends React.Component<IProductsProps,{}>{
  public render():React.ReactElement<IProductsProps>{
    return <div>List of Products
      <h6>Product 1</h6>
      <h6>Product 2</h6>
      <h6>Product 3</h6>
      <h6>Product 4</h6>
      <p>{this.props.Items}</p>
      <Electronics title="Laptop" year="2021" pricevalue={50000} ></Electronics>
    </div>;
  }
}

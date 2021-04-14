import * as React from 'react';

export interface IItemsProps{
  title:string;
  year:string;
  pricevalue:number;
}

export interface IItemsState{
  title:string;
  year:string;
  price:number;
}

export default class Electronics extends React.Component<IItemsProps,IItemsState,{}>{
  constructor(props:IItemsProps,state:IItemsState){
    super(props);
    let title = this.props.title;
    let year = this.props.year;
    let price = this.props.pricevalue;
    this.state ={title,year,price};
  }

  private changeprice():void{
    let newPrice = this.state.price - 100;
    this.setState({
      price:newPrice,
      title:"Laptop 01"
    });
  }

  public render():React.ReactElement<IItemsProps>{
    return (
      <div>
        <h1>{this.state.price}</h1>
        <ul>
          <li>Product Name : {this.state.title}</li>
          <li>Product Name : {this.state.year}</li>
          <li>Product Name : {this.state.price}</li>
        </ul>
        <button onClick={()=>this.changeprice()}>Change Price</button>
      </div>
    );
  }
}

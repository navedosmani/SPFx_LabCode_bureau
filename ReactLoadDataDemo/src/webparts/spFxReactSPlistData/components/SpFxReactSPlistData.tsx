import * as React from 'react';
import styles from './SpFxReactSPlistData.module.scss';
import { ISpFxReactSPlistDataProps } from './ISpFxReactSPlistDataProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {IProducts} from './IProducts';
import {IProductsListProps, ProductsList} from './ProductsList';
import {SPHttpClient,SPHttpClientResponse} from '@microsoft/sp-http';

export interface ISpFxReactSPlistDataState{
  products:IProducts[];
}

export default class SpFxReactSPlistData extends React.Component<ISpFxReactSPlistDataProps, ISpFxReactSPlistDataState,{}> {

  constructor(props:ISpFxReactSPlistDataProps, state:ISpFxReactSPlistDataState){
    super(props);
    this.state = {products:[]};
  }

  /*private _products:IProducts[] = [
    {id:1,Title:"Laptop"},
    {id:2,Title:"Desktop"},
    {id:3,Title:"Mobile"},
    {id:4,Title:"WebCam"},
    {id:5,Title:"Headset"},
  ];*/

  public componentWillMount():void{
    this.getProductsFromSpList()
    .then((splistproducts:IProducts[]) =>{
      this.setState({products:splistproducts});
    });
  }

  private getProductsFromSpList():Promise<IProducts[]>{
    return new Promise<IProducts[]>((resolve, reject) =>{
      const url:string = `${this.props.currentUrl}/_api/lists/getbytitle('Test02')/items?$slect = Id, Title`;
      this.props.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then((response:SPHttpClientResponse)=>{
        return response.json();
      })
      .then((jsonResponse:any)=>{
        let splistproducts:IProducts[] = [];

        for(let i=0; i<jsonResponse.value.length; i++){
          splistproducts.push({
            id:jsonResponse.value[i].Id,
            Title:jsonResponse.value[i].Title,
          });
          resolve(splistproducts);
        }
      });
    });
  }

  public render(): React.ReactElement<ISpFxReactSPlistDataProps> {
    return (
      <div className={ styles.spFxReactSPlistData }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SP Data using React!</span>
              <ProductsList products={this.state.products} onRemoveProduct={this._removeProduct}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _removeProduct = (product:IProducts):void =>{
    const newProducts = this.state.products.filter(_product => _product != product);
    this.setState({products:newProducts});

    this.deleteProductfromSPList(product.id);
  }

  private deleteProductfromSPList(id:number):Promise<IProducts[]>{
    return new Promise<IProducts[]>((resolve,reject)=>{
      const url:string = `${this.props.currentUrl}/_api/lists/getbytitle('Test02')/items(${id})`;
      this.props.spHttpClient.post(url, SPHttpClient.configurations.v1,{
        headers:{
          'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': '',
            'IF-MATCH': '*',
            'X-HTTP-Method': 'DELETE'
        }
      })
      .then((response:SPHttpClientResponse):void =>{
        alert(`Product delected sucessfully`);
      },(error:any):void =>{
        alert(`${error}`);
      });
    });
  }


}

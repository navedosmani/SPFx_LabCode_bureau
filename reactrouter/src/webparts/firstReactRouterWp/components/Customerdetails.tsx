import * as React from 'react';

export default class Customerdetails extends React.Component{

  public render(){
    return <div>
      <h1>
        Selected Customer Details - ID is <span style={{color:'green'}}>
          {this.props["match"]["params"]["number"]}
        </span></h1>

        <p>Customer details info .....</p>

    </div>;
  }
}

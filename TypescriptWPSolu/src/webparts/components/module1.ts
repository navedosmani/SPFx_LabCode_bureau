export let age:number = 20;
export let sgtrval:string = " Data from module";

export class employee{

  private empCode: number;
  private empName: string;

  constructor(name:string, code:number){
    this.empCode = code;
    this.empName = name;
  }

  public displayEmployee(){
    return ("Employee code :" + this.empCode + ", Employee Name : " + this.empName);
  }
}

declare interface IMylistviewCsCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'MylistviewCsCommandSetStrings' {
  const strings: IMylistviewCsCommandSetStrings;
  export = strings;
}

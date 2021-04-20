export class MylibrarySolutionLibrary {
  public name(): string {
    return 'MylibrarySolutionLibrary';
  }

  public getCurrentTime():string{
    return 'Current Time : ' + new Date().toDateString();
  }
}

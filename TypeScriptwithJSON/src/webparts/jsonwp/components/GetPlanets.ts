export class getPlannets{

  public listAllPlannets(): string[]{
    const planets:any = require("./Planets.json");
    const myobjStr = JSON.stringify(planets);

    let plannetNames:string[] = [];
    JSON.parse(myobjStr,(key,value:string)=>{
      if(key === 'name'){
        plannetNames.push(value);
      }
    });

    return plannetNames;

  }

  public getPlannetdetails(plannetname:string){
    const planets:any = require("./Planets.json");
    const selectedplanet:any = planets.filter((planet) => planet.name === plannetname)[0];

    let displayplannetdetails:string = `<table border='1'>
    <tr><td colspan=2><a href=${selectedplanet.wikiLink} target=_blank><img sytle="height:200px" src=${selectedplanet.imageLink}></a></td></tr>
    <tr><td>ID</td><td>${selectedplanet.id}</td></tr>
    <tr><td>summary</td><td>${selectedplanet.summary}</td></tr>
    <tr><td>solarOrbitYears</td><td>${selectedplanet.solarOrbitYears}</td></tr>
    <tr><td>solarOrbitAvgDistanceKm</td><td>${selectedplanet.solarOrbitAvgDistanceKm}</td></tr>
    <tr><td>ID</td><td>${selectedplanet.numSatellites}</td></tr>
    `;
    displayplannetdetails += `</table>`;
    document.getElementById("details").innerHTML = displayplannetdetails;

  }
}


//Injektfunktionalitäten bereitstellen
import { Injectable,inject} from '@angular/core';

//Für BEarbeitung von Observerable
import { Observable } from 'rxjs';

//Service und Modelle 
import { ApiRoute } from '../backend/api_enum';
import { UserModel } from "../model/usermodel";
import { RestService } from '../common/rest.service'

@Injectable({
  providedIn: 'root'
})

//Service
export class UserService {

  //Inject RestService
  private rest :RestService = inject(RestService);

  //Hole benutzer per Id
  getByUid$(uid:string) : Observable<UserModel>
  {
    //Gebe zurück
    return this.rest.get$<UserModel>(ApiRoute.User_By_Uid,{uid : uid});
  }

  //Gebe vertrauensvollen Guide der Stadt zurück
  getGuideByCity$(city:string,page:number,pagesize:number) : Observable<UserModel[]>
  {
    //Restservice aufruf
    return this.rest.get$<UserModel[]>(ApiRoute.User_Guide_By_City,{city : city, page:page,pagesize:pagesize});
  }
 
  //Gebe vertrauensvollen Guide der Stadt zurück
  getGuideByCityCount$(city:string) : Observable<number>
  {
    //Restservice aufruf
     return this.rest.get$<number>(ApiRoute.User_Guide_By_City_Count,{city : city});
  }

  //Gebe alle vorhandenen Benutzer zurück
  getAll$() : Observable<UserModel[]>
  {
    //Restaufruf und zurückgeben
    return this.rest.get$<UserModel[]>(ApiRoute.User_All);
  }

  //Benutzer anlegen
  add$(usermodel : UserModel) : Observable<UserModel>
  {
    //Benutzer anlegen
    return this.rest.put$<UserModel>(ApiRoute.User_Add,usermodel);
  }

  //Benutzer aktualisieren
  update$(usermodel : UserModel) : Observable<UserModel>
  {
    //aktualisieren
    return this.rest.patch$<UserModel>(ApiRoute.User_Update,usermodel);
  }
 
}

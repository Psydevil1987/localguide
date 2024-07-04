
//Injektfunktionalitäten bereitstellen
import { Injectable,inject} from '@angular/core';

//Import, die für IAM benötigt werden
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

//Grundelement zu Promise machen
import { firstValueFrom } from 'rxjs';

//Eigene Services und Modelle bekanntmachen und DPI nutzen zu können
import { UserModel } from "../model/usermodel";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  //Komponenten für IAM
  private keycloakService = inject(KeycloakService);

  //Komponenten für Userverarbeiungen
  private userService = inject(UserService);

  //Speicherung der Userdaten aus db
  public userModel : UserModel | any;

  //Speicherung der Profiledaten aus IAM
  public authProfile : KeycloakProfile | any;

  //Funktionalität,die prüft ob User eingeloggt und Token noch gültig ist
  public isLoggedIn()
  {
    //Weiterreichung an IAM
    return this.keycloakService.isLoggedIn();
  }

  public logout(redictUrl:string)
  {
    this.keycloakService.logout(redictUrl);
  }

  //Prüfung ob die benötigten Daten innerhalb der Localguide Db definiert sind oder nur IAM
  public isUserDefined()
  {
    if(this.userModel  === undefined || this.userModel.id === undefined)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  //Funktionalität zum Laden des Benutzer aus der DB bzw. Synchronisierung DB <-> IAM
  public async loadUser()
  { 
    //Benutzernamen holen
    let username=this.keycloakService.getUsername();

    //Profil speichern, falls weiter informationen benötigt
    this.authProfile = this.keycloakService.getKeycloakInstance().profile;

    //Usermodel aus API anfragen und Speichern
    this.userModel = await firstValueFrom(this.userService.getByUid$(username));
  }

}

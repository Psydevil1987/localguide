//Inject und Grundfunktionalitäten
import { inject, Injectable } from '@angular/core';

//Funktionaliäten die für Authguard benötigt werden
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';

//Import der IAM-Kompenten
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService extends KeycloakAuthGuard  {
  
  //Inject IAM
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  //Auth funktionalitäten
  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    
    //Wenn nciht authentifiziert, dann einleiten
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    //Rückgabe ob nun authentifiziert
    return this.authenticated;
  }
}

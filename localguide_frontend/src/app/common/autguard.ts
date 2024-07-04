//Inject und Grundfunktionalitäten
import { Inject, Injectable } from '@angular/core';

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
export class AuthGuard extends KeycloakAuthGuard {

  //DPI für Router und IAM
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  //Funktionalität,die zur Abfrage ob der User berechtigt ist, zur router zu kommen
  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Wenn benutzer nicht authentifiziert, dann wird der Loginprozess mit IAM gestartet
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    // Hole benötigte Rollen innerhalb des Routings definiert
    const requiredRoles = route.data.roles;

    // Wenn keine Rollen benötigt, dann ist Authentifizierung ausreichen
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }

    // Wenn Rollen benöigt, dann muss der User alle ahben
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}
//IAM funktionalitäten
import {KeycloakService } from 'keycloak-angular';

//Umgebungseinstellungen, um die Urls etc nutzen zu könne
import {environment} from '../config/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        //Konfiguration von IAM-Client
        config: {
          url: environment.keycloak.url,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.client_id
        },
        //Profile soll gleich geladen werden
        loadUserProfileAtStartUp: true,
        //Beim Startup prüfen ob IAM da
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: false,
          //Nutzung des internen Flows
          flow:"implicit"
        },
        //HTTP-Client hängt Bearer Token dran
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
      });
  }
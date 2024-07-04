//Grundsätzliche Applikationskonfigurationen und DPI funktionalitäten
import { APP_INITIALIZER,ApplicationConfig } from '@angular/core';

//Einbindung der Routeingfunktionalitäten
import { provideRouter, UrlSerializer } from '@angular/router';

// Einbindungen von IAM und Weitergabe der Token an das Backend
import { KeycloakService,KeycloakBearerInterceptor } from 'keycloak-angular';

//Globale Initilisierung von KeyCloak
import {initializeKeycloak} from './common/authfunction'

//Grundsätzliche Konfigurationselemente für HTTP-Client Niutzung
import { provideHttpClient,HTTP_INTERCEPTORS, withInterceptorsFromDi } from "@angular/common/http"

//Einbindung der routen
import { routes } from './app.routes';

//Urls sollen caseinsensitiv werden
import {LowerCaseUrlSerializer} from './common/lowercaseurlserializer'


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//Anwendung konfigurieren
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)
            , provideAnimationsAsync()
            , provideHttpClient(withInterceptorsFromDi())
            , KeycloakService
            , {
              provide: APP_INITIALIZER,
              useFactory: initializeKeycloak,
              multi: true,
              deps: [KeycloakService]
            }
            , {
              provide: UrlSerializer,
              useClass: LowerCaseUrlSerializer
            }
          ]
};

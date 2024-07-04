//Zur Definition von Routen obligatorisch
import { Routes } from '@angular/router';

//Nutzung des Services zum starten einen Authentifizierung bei bestimmter Pfadanfrage
import { AuthGuardService } from './common/authguard.service'

//Einbinden der eigenen Komponenten damit diese in der Router benutzt werden kann
import { HomeComponent } from './components/home/home.component';
import { VermittlungsplatzComponent } from './components/vermittlungsplatz/vermittlungsplatz.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

//Definition der Routen
export const routes: Routes = 
[
    { path: '', 
      redirectTo: 'home',
      pathMatch: 'full'
    },
    { path: 'home', 
      component: HomeComponent,
    },
    { path: 'vermittlungsplatz',
      component: VermittlungsplatzComponent, 
    },
    { path: 'login'
    , component:LoginComponent
    , canActivate:[AuthGuardService]
    },
    { path: 'logout'
    , component:LogoutComponent
    }
    ,
    //Wenn auf Profile zugeriffen werden soll, dann muss IAM als erstes benutzt werden
    { path: 'profile'
    , component: ProfileComponent 
    , canActivate:[AuthGuardService]
    }
];

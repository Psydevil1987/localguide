//Inject und Grundfunktionalitäten
import { Component,inject, OnInit} from '@angular/core';

//Service, der zum einloggen verwendet werden muss
import { AuthService } from '../../service/auth.service';

//Navigieren innerhal der logik anstossen
import { Router } from '@angular/router';


@Component({

//Element-Name
  selector: 'app-login',
  standalone: true,

  //Komponenten,die im HTML verfügbar sein sollen
  imports: [],
  //Keine Guid, da es per Authguard aufgerufen und sofort zum IAM weitergeleitet wird
  templateUrl: './login.component.html',
  //siehe templateUrl
  styleUrl: './login.component.scss'
})

//Loginlogik, wobei durch OnInit nur eine Logikkomponente, da Autorizierung erzwungen wird
export class LoginComponent implements OnInit  {

//Funktionalitäten für IAM
private authservice = inject(AuthService);

//Navigationsfunktionaliäten
private router = inject(Router)

//Interface definition
async ngOnInit() {
  {
    
    //Lade User, sodass sich im IAM eingelegt werden muss
    await this.authservice.loadUser();
 
    //Wenn User nicht in der DB von Localguide, dann zum Profile weiterleiten, da Daten von IAM nicht ausreichend sind
    if(!this.authservice.isUserDefined())
    {
      this.router.navigateByUrl('/profile');
    }//Sonst zu Vermittlungsplatz weiterleiten
    else
    {
      this.router.navigateByUrl('/vermittlungsplatz');
    }
  }
 }
}

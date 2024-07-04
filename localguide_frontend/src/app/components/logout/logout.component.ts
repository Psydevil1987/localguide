//Inject und Grundfunktionalitäten
import { Component,inject, OnInit} from '@angular/core';

//Service, der zum einloggen verwendet werden muss
import { AuthService } from '../../service/auth.service';

//Navigieren innerhal der logik anstossen
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit  {

  //Funktionalitäten für IAM
  private authservice = inject(AuthService);
  
  //Navigationsfunktionaliäten
  private router = inject(Router)
  
  //Interface definition
  async ngOnInit() {
    {
      //Logout und navigation
      this.authservice.logout(window.location.origin + "/vermittlungsplatz");
    }
   }
  }
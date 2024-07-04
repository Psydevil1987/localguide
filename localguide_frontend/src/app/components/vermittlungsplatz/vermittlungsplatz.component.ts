//Inject und Grundfunktionalitäten
import { Component,inject} from '@angular/core';

//Angular View-Material
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { RouterModule } from '@angular/router';
import { MatIcon  } from '@angular/material/icon';
import { MatPaginatorModule  } from '@angular/material/paginator';
//Promise Nutzung
import { firstValueFrom } from 'rxjs';

//Usermodel und Auth
import { UserModel } from '../../model/usermodel';
import { AuthService } from '../../service/auth.service';

@Component({
  //Element-Name
  selector: 'app-Vermittlungsplatz',
  standalone: true,

  //Komponenten,die im HTML verfügbar sein sollen
  imports: [CommonModule,MatIcon,RouterModule,MatPaginatorModule],
  
  //Html-Representation
  templateUrl: './vermittlungsplatz.component.html',

  //Style
  styleUrls: ['./vermittlungsplatz.component.scss']
})

//Logik
export class VermittlungsplatzComponent {

  //Funktionalitäten zur Anmeldung unb Userinformationen
  private userservice = inject(UserService)
  public authService = inject(AuthService)
   
  //Merken ob user angemeldet
  public isAuthentficated : Boolean = false;
  public searchCityParam : string ="";
  public searchState: string = "NOSEARCH";

  //Für Modal Kontaktaufnahme
  public showModal = false;

  //für PAging
  public totalItems = 100;
  public pageSize = 10;
  public currentPage = 0;

  //Gefundene Guides
  data : UserModel[] | any;

  constructor()
  {
    //Merken ob user angemeldet, erstmal nicht, wenn er sich anmeldet, dann kann Kontakt aufgenommen werdne
    this.isAuthentficated = this.authService.isLoggedIn();

    //Wenn angemeldet, dann Userinfo laden
    if(this.isAuthentficated){
        this.authService.loadUser();
      }
    ;
  }



 //Funktionalität,die bei Suchen nach Guides ausgeführt werden soll
  public async searchguide() {
    
    //Status merken
    this.searchState = "SEARCH";

    //Gebe daten Synchron zurück
    this.data = await firstValueFrom(this.userservice.getGuideByCity$(this.searchCityParam,this.currentPage,this.pageSize));

    //Wenn keine Gefunden, dann Status setzen
    if(this.data === undefined || this.data.length==0)
    {
      //Status nicht gefunden
      this.searchState = "NOTFOUND"
    }
    else
    {
      //sonst was gefunden
      //hole anzahl gesamter gefundener Guides
      this.totalItems = await firstValueFrom(this.userservice.getGuideByCityCount$(this.searchCityParam))
      this.searchState = "FOUND"
    }

  }

  //Pageing function
  async pageChanged(event: any) {
    //hole page
    this.currentPage = event.pageIndex;
    this.pageSize=event.pageSize;
    
    //hole Daten für die Page
    this.data = await firstValueFrom(this.userservice.getGuideByCity$(this.searchCityParam,this.currentPage,this.pageSize));
  }

  //Popupmodal für Call
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }



}



//Angular Material einbinden
import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLink,RouterModule} from '@angular/router';
import { MatToolbarModule  } from '@angular/material/toolbar';
import { MatIcon  } from '@angular/material/icon';
import { MatIconButton  } from '@angular/material/button';
import { MatDivider  } from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';

//Grundkomonente gestalten
@Component({
  //Elementname zum ansprechen
  selector: 'app-root',
  standalone: true,
  //Einbindung Viewmaterial
  imports: [CommonModule,
            RouterOutlet,
            RouterLink,
            RouterModule,
            MatToolbarModule,
            MatIcon,
            MatIconButton,
            MatDivider,
            MatSidenavModule,
            FlexLayoutModule
          ],
  //Template vom gesamten Design
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'LocalXperience';

}

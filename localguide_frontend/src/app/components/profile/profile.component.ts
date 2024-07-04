import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { UserModel } from '../../model/usermodel';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public authService = inject(AuthService);
  private userService = inject(UserService);
  public showModal = false;

  ngOnInit() {
  }

  constructor() {
    this.authService.loadUser();

    if (!this.authService.isUserDefined()) {
      this.authService.userModel = new UserModel();
      this.authService.userModel.idp_uid = this.authService.authProfile.username;
      this.authService.userModel.surename = this.authService.authProfile.lastName;
      this.authService.userModel.givenname = this.authService.authProfile.firstName;
    }
  }

  onProfilePictureUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.authService.userModel.picture = reader.result;
    };
  }

  async onSubmit() {
    if (!this.authService.isUserDefined()) {
      await firstValueFrom(this.userService.add$(this.authService.userModel));
    } else {
      await firstValueFrom(this.userService.update$(this.authService.userModel));
    }
    window.location.reload();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}

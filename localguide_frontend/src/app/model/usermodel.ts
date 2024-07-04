
//Usermodel -> Elemente, die von der Api zurückgegeben werden bzw. für Frontend benutzt werden sollen
export class UserModel {
    id?: number;
    idp_uid?: string;
    surename?: string;
    givenname?: string;
    is_guide? : boolean;
    city? : string;
    about? : string;
    picture?: string;
    age?: string;
    hobbies?: string;
    is_verified?:boolean;
  }
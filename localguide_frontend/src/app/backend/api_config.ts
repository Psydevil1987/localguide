//Import der mögliche Api-Konext funktionaliäten
import {ApiRoute} from '../backend/api_enum'

//Baseurl
let baseurl ="https://litau.myqnapcloud.com:7000/localguide/api";

//Konfigriguration List, Enum-Kontext zur Url, in der Regel Base\[Contexturl]
export const api_config : Record<ApiRoute, string>  = {
      //Alle User zurückgeben
      [ApiRoute.User_All] : `${baseurl}/user/get_all`

      //bestimmten User zurückgeben
     ,[ApiRoute.User_By_Uid] : `${baseurl}/user/`

      //User per Stadt zurückgeben
     ,[ApiRoute.User_Guide_By_City] : `${baseurl}/user/get_guide_by_city`

     //User Anzahl per Stadt zurückgeben
     ,[ApiRoute.User_Guide_By_City_Count] : `${baseurl}/user/get_guide_by_city_count`

     //User hinzufügen 
     ,[ApiRoute.User_Add] : `${baseurl}/user/`

     //User aktualisieren
     ,[ApiRoute.User_Update] : `${baseurl}/user/`
};
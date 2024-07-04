#ORM
from sqlalchemy import select,update,func
from typing import List
#UserModel, ORM-Mapping
from models.UserModel import UserModel

#Schematas sollen eingehalten werden
from schemas.UserSchema import UserSchema

#Vaterklasse mit Grundfunktionalitäten, die ohne weitere Implementierung benutz werden können
from services.base.BaseDataManager import BaseDataManager

#Klasse mit Ableitung
class UserDataManager(BaseDataManager):

    #Hole benutzer mit Uid->IAM
    def get_by_uid(self,uid:str) -> UserSchema:
        ##Statement per ORM 
        stmt = select(UserModel).where(UserModel.idp_uid == uid)

        #führe aus und gebe zurück
        model = self.base_get_one(stmt)

        #Mapping auf das Schema
        return UserSchema(**model.to_dict())

    #Hole Guides, die zur Stadt passen Rückgabe muss Schema berücksichtigen
    def get_guide_by_city(self,city:str,page:int,pagesize:int) -> List[UserSchema]:
        #Liste
        schemas: List[UserSchema] = list()

        ## Abfrage
        stmt = select(UserModel).where((UserModel.city == city)
                                      & (UserModel.is_guide)
                                      & (UserModel.is_verified)).offset(page * pagesize).limit(pagesize).order_by(UserModel.givenname).order_by(UserModel.id)
        #Anfragen und in Liste Packen
        for model in self.base_get_all(stmt):
            schemas += [UserSchema(**model.to_dict())]

        ##Elemente oder leer
        return schemas
    
    #Hole Guides Anzahl für Paging, die zur Stadt passen Rückgabe muss Schema berücksichtigen
    def get_guide_by_city_count(self,city:str) -> int:
        
        ## Abfrage
        stmt = select(func.count()).where((UserModel.city == city)
                                      & (UserModel.is_guide)
                                      & (UserModel.is_verified))
  
        ##Elemente oder leer
        return self.base_get_one(stmt)
    

    #Hole alle Benutzer
    def get_all(self) -> List[UserSchema]:

        #Liste
        schemas: List[UserSchema] = list()

        #ORM-Abfrage
        stmt = select(UserModel)
        
        ##Liste befüllen
        for model in self.base_get_all(stmt):
            schemas += [UserSchema(**model.to_dict())]

        #Liste zurückgeben
        return schemas

    #Benutzer hinzufügen
    def add(self,userschema:UserSchema):
        
        #Füge einen hinzu
        self.base_add_one(UserModel(**userschema.dict()))

        #Element 1 zu 1 zurückgeben
        return userschema

    #Aktualisiere Benutzer
    def update(self,userschema:UserSchema):
        #Mach aus Schema ein Model, da das ORM Mapping ist
        usermodel = UserModel(**userschema.dict())

        #ORM-Statment generieren
        stmt = update(UserModel).where(UserModel.id == usermodel.id).values(usermodel.to_dict())

        #Ausführen
        self.base_update_one(stmt)

        #zurückgeben
        return userschema
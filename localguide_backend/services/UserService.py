from typing import List

#Base-Service funktionalitäen
from services.base.BaseService import BaseService

#Ansprechnen der Datenschicht
from services.UserDataManager import UserDataManager

#Konventionen, Auruf und Rückgabe
from schemas.UserSchema import UserSchema

#Funktionen als Wrapper für Userrouter
class UserService(BaseService):

    def get_by_uid(self,uid:str) -> UserSchema:
        return UserDataManager(session=self.session).get_by_uid(uid=uid)

    def get_guide_by_city(self,city:str,page:int,pagesize:int) -> List[UserSchema]:
        return UserDataManager(session=self.session).get_guide_by_city(city=city,page=page,pagesize=pagesize)
        
    def get_guide_by_city_count(self,city:str) -> int:
        return UserDataManager(session=self.session).get_guide_by_city_count(city=city)

    def get_all(self) -> List[UserSchema]:
        return UserDataManager(session=self.session).get_all()

    def add(self,userschema:UserSchema) -> UserSchema:
        return UserDataManager(session=self.session).add(userschema)

    def update(self,userschema:UserSchema) -> UserSchema:
        return UserDataManager(session=self.session).update(userschema)
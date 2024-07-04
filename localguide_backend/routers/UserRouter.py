#ORM
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

#SESSION DPI
from common.Session import create_session

#Definierte Service und Vereinbarung von Aufruf und Rückgabe
from services.UserService import UserService
from schemas.UserSchema import UserSchema

#Prefix bei url User
router = APIRouter(prefix="/user")

#User direkt, dann muss mit uid der User zurückgegeben werden -> GET-METHODE
@router.get("/", response_model=UserSchema)
async def get_by_id(uid: str, session: Session = Depends(create_session)) -> UserSchema:
    ##Aufruf Service und weitergabe DPI-Session und uid
    return UserService(session=session).get_by_uid(uid=uid)

#User get_guide_by_city -> Rückgabe passende Guides, die verfiziziert und zur Stadt passen -> GET-METHODE
@router.get("/get_guide_by_city", response_model=List[UserSchema])
async def get_guide_by_city(city: str,page:int,pagesize:int, session: Session = Depends(create_session)) -> UserSchema:
    
    ##Aufruf Service und weitergabe DPI-Session und Stadt als ach page und size
    return UserService(session=session).get_guide_by_city(city=city,page=page,pagesize=pagesize)

#User get_guide_by_city_count -> Rückgabe passende Guides Anzahl für Pageing -> GET-METHODE
@router.get("/get_guide_by_city_count")
async def get_guide_by_city_count(city: str,session: Session = Depends(create_session)) -> int:
    
    ##Aufruf Service und weitergabe DPI-Session und Stadt
    return UserService(session=session).get_guide_by_city_count(city=city)

#User get_all -> Alle Bentzer zurückgeben -> GET-METHODE
@router.get("/get_all", response_model=List[UserSchema])
async def get_all(session: Session = Depends(create_session)) -> List[UserSchema]:
    
    return UserService(session=session).get_all()

#User direkt -> Neuen Benutzer anlegen -> PUT-METHODE
@router.put("/", response_model=UserSchema)
async def add(userschema: UserSchema, session: Session = Depends(create_session)) -> UserSchema:

     ##Aufruf Service und weitergabe DPI-Session und Userinformationen
    return UserService(session=session).add(userschema);

#User direkt -> Informationen aktualsiieren -> patch-METHODE
@router.patch("/", response_model=UserSchema)
async def update(userschema: UserSchema, session: Session = Depends(create_session)) -> UserSchema:
    ##Aufruf Service und weitergabe DPI-Session und Userinformationen
    return UserService(session=session).update(userschema);
#Imports für SQLalchemy/ORM
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Sequence

##Basemodel
from models.base.BaseModel import BaseModel


##Usermodell definition
class UserModel(BaseModel):

    #Tabelle USER
    __tablename__ = "USER"

    #PK , Sequence muss benutzt werden
    id: Mapped[int] = mapped_column("ID",Sequence("SEQ_USER"),primary_key=True,autoincrement=False)

    #idp_uid-> Mapping zum IAM
    idp_uid: Mapped[str] = mapped_column("IDP_UID")

    #weitere Spalten->selbsterklärend
    surename: Mapped[str] = mapped_column("SURENAME")

    givenname: Mapped[str] = mapped_column("GIVENNAME")

    is_guide: Mapped[bool] = mapped_column("IS_GUIDE")

    city: Mapped[str] = mapped_column("CITY")

    about: Mapped[str] = mapped_column("ABOUT")

    picture: Mapped[str] = mapped_column("PICTURE")

    age: Mapped[str] = mapped_column("AGE")

    hobbies: Mapped[str] = mapped_column("HOBBIES")

    is_verified: Mapped[bool] = mapped_column("IS_VERIFIED",default=False)

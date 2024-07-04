
##ORM funktionalitäten
from typing import (Any,List,Sequence)
from sqlalchemy.sql.expression import Executable
from services.base.BaseSession import BaseSession

##Eigene Exception
from exception.NotFoundException import NotFoundException

class BaseDataManager(BaseSession):

    #Grundfunktionaliäten
    def base_update_one(self,update_stmt:Executable) -> None:
        self.session.execute(update_stmt)

    def base_add_one(self, model: Any) -> None:
        self.session.add(model)

    def base_add_all(self, models: Sequence[Any]) -> None:
        self.session.add_all(models)

    def base_get_one(self, select_stmt: Executable) -> Any:
        model = self.session.scalar(select_stmt)

        if(model is None):
            raise NotFoundException("")

        return model

    def base_get_all(self, select_stmt: Executable) -> List[Any]:
        modellist = list(self.session.scalars(select_stmt).all())

        if(modellist is None or modellist.count==0):
            raise NotFoundException("")

        return modellist
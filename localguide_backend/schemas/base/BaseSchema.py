#ORM-Modellconfig
from pydantic import (BaseModel,ConfigDict)

#Grundschemaaufbau, damit ein Konvertieren einfach gehalten werden kann
class BaseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
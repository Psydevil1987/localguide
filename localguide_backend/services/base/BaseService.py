#Basesession, zum speicherm ORM-Sessin
from services.base.BaseSession import BaseSession

#Jede Service hat Baseserviceabzuleiten und Basesession sorgt dafür das ORM-Session gespeichert wutd
class BaseService(BaseSession):
    #Keine weiteren funktionalitäten, soll als Vaterklasse genutzt werden
    pass
from sqlalchemy.orm import Session

#Jede Service soll SqlSession speichern
class BaseSession:

    #Speichern der Session, die zur Datenschicht durchgereicht wird.
    def __init__(self, session: Session) -> None:
        self.session = session
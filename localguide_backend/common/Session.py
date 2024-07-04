#ORM
from contextlib import contextmanager
from typing import Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import (Session,sessionmaker)

#Datenbank config
from common.DatabaseConfig import DatabaseConfig

# Neue Session erzeugen, aufgrundlage Connectionsinr
SessionFactory = sessionmaker(
    bind=create_engine(DatabaseConfig.connectionstring),
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)


def create_session() -> Iterator[Session]:
   ##Erzeugung einer neuen session per yield und die kann per DPI genutzt werdn
    session = SessionFactory()
    try:
        yield session
        ##Session freigegebn und kein Fehler, dann commit
        session.commit()

    except Exception:
        ##Wenn ein Fehler auftritt dann rollbakc
        session.rollback()
        raise
    finally:
        ##danach aber auf jedenfall schließen
        session.close()


@contextmanager
def open_session() -> Iterator[Session]:
    
    #DPI
    return create_session()
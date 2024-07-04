# Localguide - Backend
Die Backendkomponente setzt auf die Eigenschaften von FastApi, sodass durch einfache Mechanismen die Grundelemente von Rest definiert und behandelt werden. Anschließend wird durch die Routendefinitionen die Services Registriert und beim Abrufen vom Client gestartet, sodass die Logikschicht ihre Arbeit verrichten kann.

## [common](common)
Grundsätzliche Komponenten, die Datenbankkonfiguration, Applikationskonfiguration und Sessionhandling für Datenbankzugriffe

## [exception](exception)
Grundsätzliche Exceptionklassen zum Mappen eines HTTP-Statuscodes

## [models](models)
Zugriff auf SQL-Achemy und somit auf die Datenspeicherung

## [schemas](schemas)
Schemas werden zur Plausibilisierungen von Serviceanfragen und Rückmeldungen von FastAPI genutzt 

## [routers](routers)
Router werden beim Start von FastApi als Teilungsmechanismus benutzt um nicht alle Route in einer Datei definieren zu müssen.

## [services](services)
Die eigentlichen Rest-Services die bereitgestellt werden.

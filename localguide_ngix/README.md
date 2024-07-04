# Localguide - Ngix
Exemplarische Konfiguration des Reverse Proxys [nginx.conf](nginx.conf)</br>
</br>

Diese Konfiguration wurde für den Demobetrieb aufgebaut und ist natürlich veränderbar.
</br>
Es muss nur bedacht werden, dass die jeweiligen Applikationsbestandteile die URL aktualisieren müssen

## Localguide - Ngix - Routen

| Technologie               | Listen-Url    | Destination-Url |
| :---:                     | :---: |:---: |
| **Frontend (Angular)**    | \*/\*   | http://localguide.local:4200/ |
| **IAM (Keycloak)**        | \*/realms/\* <br/> \*/resources/6q47a/\* |   | http://localhost:9009/realms <br/>http://localhost:9009/resources/6q47a/
| **Backend (FastAPI)**    | \*/localguide/api/*   | http://localguide.local:8000/ |

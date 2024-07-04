//Umgebungseinstellungen
export const environment = {
  //Wenn nicht development
  production: true,
  //Url real
  "keycloak": {
      "url": "https://litau.myqnapcloud.com:7000/",
      "realm" :"localguide",
      "client_id": "localguide",
    },
  //API-BaseUrl
  "api":
  {
    "base_url" :"https://litau.myqnapcloud.com:7000/localguide/api"
  }
};

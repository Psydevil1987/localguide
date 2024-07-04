#FastApi funktionalitäten
from fastapi import FastAPI,Request,status
from fastapi.responses import JSONResponse
from exception.NotFoundException import NotFoundException
from routers import UserRouter
from common.ApplicationConfig import ApplicationConfig

#Hole name der als OPENAPI-Title benutzt werden soll
app = FastAPI(title=ApplicationConfig.api_title)

#Default Exceptionhandler für NotFoundException -> 404
@app.exception_handler(NotFoundException)
async def notfound_exception_handler(request: Request, exc: NotFoundException):
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": f"Ressource not Found"},
    )

#Weitere Router hinzufügen
app.include_router(UserRouter.router)

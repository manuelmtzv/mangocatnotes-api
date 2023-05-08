from fastapi import FastAPI

from routes.note import note_router

app = FastAPI()


app.include_router(note_router)

from fastapi import APIRouter

note_router = APIRouter(prefix="/api")


@note_router.get("/notes")
def find_all_notes():
    return {"message": "All notes"}


@note_router.get("/notes")
def create_note():
    return {"message": "Post notes"}


@note_router.get("/notes/{id}")
def find_note():
    return {"message": "Get note"}


@note_router.get("/notes/{id}")
def update_note():
    return {"message": "Update note"}


@note_router.get("/notes/{id}")
def delete_note():
    return {"message": "Delete note"}

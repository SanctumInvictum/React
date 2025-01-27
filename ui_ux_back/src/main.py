import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import uuid
import os
import shutil
from pathlib import Path
from reader.router import router as router_manga_pages
from users.router import router as router_users


app = FastAPI(debug=True)


app.include_router(router_users)
app.include_router(router_manga_pages)



app.mount("/temp", StaticFiles(directory="temp"), name="temp")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Укажите URL приложения React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



Storage_Dir = Path("storage")
@app.post("/upload/")
async def upload_zip_file(file: UploadFile = File(...)):
    # Validate file type
    if not file.filename.lower().endswith(".zip"):
        raise HTTPException(status_code=400, detail="Invalid file type. Only .cbz files are allowed.")

    # Generate a unique identifier for the upload
    unique_id = str(uuid.uuid4())

    # Save the uploaded file to the temporary directory
    file_path = os.path.join(Storage_Dir, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Close the file stream
    file.file.close()

    return JSONResponse(
        status_code=200,
        content={
            "message": "File uploaded successfully",
            "unique_id": unique_id,
            "archiveId": file.filename.split('.')[0],
            "file_path": file_path,
        },
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

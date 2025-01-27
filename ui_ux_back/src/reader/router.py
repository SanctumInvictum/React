from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from pathlib import Path
import zipfile
import shutil
import os

#from users.models import Users
#from users.dependencies import get_current_user

router = APIRouter(
    prefix="/Reader",
    tags=["Reader_page"]
)

# Путь к временной папке для извлечения
TEMP_DIR = Path("temp")


@router.get("/get-images/{archive_id}")
async def get_images(archive_id: str, request: Request):
    archive_path = Path(f"storage/{archive_id}.zip")

    if not archive_path.exists():
        raise HTTPException(status_code=404, detail="Archive not found")

    temp_folder = TEMP_DIR / archive_id
    temp_folder.mkdir(parents=True, exist_ok=True)

    try:
        # Разархивировать
        with zipfile.ZipFile(archive_path, 'r') as zip_ref:
            zip_ref.extractall(temp_folder)

        # Собрать абсолютные ссылки на изображения
        base_url = request.base_url  # Получаем базовый URL
        images = [
            f"{base_url}temp/{archive_id}/{file}"
            for file in os.listdir(temp_folder)
            if file.endswith(('.png', '.jpg', '.jpeg'))
        ]

        # Вернуть ссылки на изображения
        return JSONResponse(content={"images": images})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from app.api.routes import router as api_router
from app.config.settings import settings
import uvicorn
import os
from dotenv import load_dotenv

# Ensure environment variables are loaded
load_dotenv()

app = FastAPI(title="Driver Log Analyser")

# Create directories if they don't exist
os.makedirs(settings.VECTOR_DB_DIR, exist_ok=True)
os.makedirs("app/ui/static", exist_ok=True)
os.makedirs("app/ui/templates", exist_ok=True)

# Templates and static files
templates = Jinja2Templates(directory="app/ui/templates")
app.mount("/static", StaticFiles(directory="app/ui/static"), name="static")

# Include API routes
app.include_router(api_router, prefix="/api")

@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

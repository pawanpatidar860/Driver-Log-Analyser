from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    OPENROUTER_API_KEY: str
    OPENROUTER_MODEL: str = "openai/gpt-3.5-turbo"
    LOG_LEVEL: str = "INFO"
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    VECTOR_DB_DIR: str = "faiss_index"

settings = Settings()

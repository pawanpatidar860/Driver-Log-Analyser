from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
from typing import Optional
import os
from dotenv import load_dotenv

# Explicitly load .env file
load_dotenv()

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    OPENROUTER_API_KEY: str
    OPENROUTER_MODEL: str = "openai/gpt-3.5-turbo"
    LOG_LEVEL: str = "INFO"
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    VECTOR_DB_DIR: str = "faiss_index"

    @field_validator("OPENROUTER_API_KEY")
    @classmethod
    def strip_key(cls, v: str) -> str:
        return v.strip()

settings = Settings()

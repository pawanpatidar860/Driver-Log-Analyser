from langchain_openai import ChatOpenAI
from app.config.settings import settings
from loguru import logger

class LLMClient:
    def __init__(self):
        if not settings.OPENROUTER_API_KEY or settings.OPENROUTER_API_KEY == "your_openrouter_api_key_here":
            logger.error("OPENROUTER_API_KEY not set in environment")
            self.llm = None
        else:
            logger.info(f"Initializing OpenRouter LLM Client with model: {settings.OPENROUTER_MODEL}")
            self.llm = ChatOpenAI(
                model=settings.OPENROUTER_MODEL,
                api_key=settings.OPENROUTER_API_KEY,
                base_url="https://openrouter.ai/api/v1",
                default_headers={
                    "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
                    "HTTP-Referer": "http://localhost",
                    "X-Title": "Driver Log Analyser",
                }
            )

    def get_llm(self):
        if self.llm is None:
            raise ValueError("OPENROUTER_API_KEY not set in environment")
        return self.llm

# Single reusable client instance
client_instance = LLMClient()

def get_llm():
    return client_instance.get_llm()

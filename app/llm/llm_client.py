from langchain_openai import ChatOpenAI
from app.config.settings import settings
from loguru import logger

class LLMClient:
    def __init__(self):
        # We use both openai_api_key and api_key for maximum compatibility across versions
        # and explicitly set the Authorization header in case the library fails to do so for the custom base_url.
        logger.info(f"Initializing LLMClient with model: {settings.OPENROUTER_MODEL}")

        self.llm = ChatOpenAI(
            model=settings.OPENROUTER_MODEL,
            openai_api_key=settings.OPENROUTER_API_KEY,
            api_key=settings.OPENROUTER_API_KEY,
            base_url="https://openrouter.ai/api/v1",
            openai_api_base="https://openrouter.ai/api/v1",
            default_headers={
                "HTTP-Referer": "https://github.com/driver-log-analyser",
                "X-Title": "Driver Log Analyser",
                "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
            }
        )

    def get_llm(self):
        return self.llm

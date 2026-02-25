from langchain_openai import ChatOpenAI
from app.config.settings import settings

class LLMClient:
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.OPENROUTER_MODEL,
            openai_api_key=settings.OPENROUTER_API_KEY,
            openai_api_base="https://openrouter.ai/api/v1",
            default_headers={
                "HTTP-Referer": "https://github.com/driver-log-analyser",
                "X-Title": "Driver Log Analyser",
            }
        )

    def get_llm(self):
        return self.llm

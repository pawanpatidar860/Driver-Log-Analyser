from app.agents.log_analysis_agent import LogAnalysisAgent
from app.models.schemas import LogError
from app.rag.vector_store import VectorStore
from app.config.settings import settings
from typing import List
from loguru import logger
import os

class LogService:
    def __init__(self):
        self.agent = LogAnalysisAgent()
        self.vector_store = VectorStore("extracted_errors")
        self.index_path = os.path.join(settings.VECTOR_DB_DIR, "extracted_errors")

    async def analyze_logs(self, log_text: str) -> List[LogError]:
        errors = await self.agent.analyze(log_text)

        if errors:
            logger.info(f"Storing {len(errors)} extracted errors in FAISS")
            error_texts = [f"Type: {e.error_type} | Message: {e.error_message} | Driver: {e.driver_name}" for e in errors]

            # Phase 1 requirement: Store extracted errors in FAISS
            self.vector_store.clear(self.index_path)
            self.vector_store.add_texts(error_texts)
            self.vector_store.save(self.index_path)

        return errors

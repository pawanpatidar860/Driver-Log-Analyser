from app.agents.log_analysis_agent import LogAnalysisAgent
from app.models.schemas import LogError
from typing import List

class LogService:
    def __init__(self):
        self.agent = LogAnalysisAgent()

    async def analyze_logs(self, log_text: str) -> List[LogError]:
        return await self.agent.analyze(log_text)

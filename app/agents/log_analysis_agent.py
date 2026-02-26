from typing import List
from app.parsers.log_parser import LogParser
from app.llm.llm_client import get_llm
from app.llm.prompts import LOG_ANALYSIS_PROMPT
from app.models.schemas import LogError, LogAnalysisResult
from langchain_core.output_parsers import PydanticOutputParser

class LogAnalysisAgent:
    def __init__(self):
        self.llm = get_llm()
        self.output_parser = PydanticOutputParser(pydantic_object=LogAnalysisResult)

    async def analyze(self, log_text: str) -> List[LogError]:
        error_blocks = LogParser.extract_error_blocks(log_text)
        if not error_blocks:
            return []

        combined_blocks = "\n---\n".join(error_blocks[:10])
        format_instructions = self.output_parser.get_format_instructions()

        chain = LOG_ANALYSIS_PROMPT | self.llm | self.output_parser

        result = await chain.ainvoke({
            "log_blocks": combined_blocks,
            "format_instructions": format_instructions
        })
        return result.errors

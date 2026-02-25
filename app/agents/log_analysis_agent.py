from typing import List
from app.parsers.log_parser import LogParser
from app.llm.llm_client import LLMClient
from app.llm.prompts import LOG_ANALYSIS_PROMPT
from app.models.schemas import LogError, LogAnalysisResult
from langchain_core.output_parsers import PydanticOutputParser

class LogAnalysisAgent:
    def __init__(self):
        self.llm_client = LLMClient()
        self.output_parser = PydanticOutputParser(pydantic_object=LogAnalysisResult)

    async def analyze(self, log_text: str) -> List[LogError]:
        error_blocks = LogParser.extract_error_blocks(log_text)
        if not error_blocks:
            return []

        # Combine blocks but keep it within reasonable limits
        combined_blocks = "\n---\n".join(error_blocks[:10])

        format_instructions = self.output_parser.get_format_instructions()

        # We need to inject format_instructions into the prompt
        # Let's adjust the prompt to accept it
        chain = LOG_ANALYSIS_PROMPT | self.llm_client.get_llm() | self.output_parser

        # Re-defining LOG_ANALYSIS_PROMPT might be better if I want to include format instructions
        # But let's just use it as is if it works.
        # Actually, I'll modify prompts.py to include format_instructions

        result = await chain.ainvoke({
            "log_blocks": combined_blocks,
            "format_instructions": format_instructions
        })
        return result.errors

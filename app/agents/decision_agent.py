from app.llm.llm_client import LLMClient
from app.llm.prompts import DECISION_PROMPT
from app.models.schemas import RootCauseClassification, LogError
from langchain_core.output_parsers import PydanticOutputParser
from typing import List

class DecisionAgent:
    def __init__(self):
        self.llm_client = LLMClient()
        self.output_parser = PydanticOutputParser(pydantic_object=RootCauseClassification)

    async def decide(self, errors: List[LogError], context: str) -> RootCauseClassification:
        format_instructions = self.output_parser.get_format_instructions()

        chain = DECISION_PROMPT | self.llm_client.get_llm() | self.output_parser

        # Convert errors list to string for the prompt
        errors_str = "\n".join([str(e.model_dump()) for e in errors])

        result = await chain.ainvoke({
            "errors": errors_str,
            "context": context,
            "format_instructions": format_instructions
        })
        return result

from app.parsers.pdf_parser import PDFParser
from app.parsers.html_parser import HTMLParser
from app.agents.doc_analysis_agent import DocAnalysisAgent
from typing import Optional

class DocService:
    def __init__(self):
        self.doc_agent = DocAnalysisAgent()
        self.html_parser = HTMLParser()

    async def process_pdf(self, content: bytes):
        text = PDFParser.parse(content)
        await self.doc_agent.process_docs(text)

    async def process_url(self, url: str):
        text = await self.html_parser.parse(url)
        await self.doc_agent.process_docs(text)

    def get_context(self, query: str) -> str:
        return self.doc_agent.search_relevant_context(query)

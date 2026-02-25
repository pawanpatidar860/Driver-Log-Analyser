import asyncio
import unittest
from unittest.mock import MagicMock, patch
from app.services.log_service import LogService
from app.services.doc_service import DocService
from app.models.schemas import LogError

class TestServices(unittest.TestCase):
    @patch("app.agents.log_analysis_agent.LogAnalysisAgent.analyze")
    @patch("app.services.log_service.VectorStore")
    def test_log_service(self, mock_vs, mock_analyze):
        mock_analyze.return_value = [LogError(error_type="ERROR", error_message="Test error")]

        service = LogService()
        async def run():
            return await service.analyze_logs("test log")

        loop = asyncio.new_event_loop()
        result = loop.run_until_complete(run())
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0].error_message, "Test error")
        mock_vs.return_value.add_texts.assert_called_once()

    @patch("app.parsers.html_parser.HTMLParser.parse")
    @patch("app.agents.doc_analysis_agent.DocAnalysisAgent.process_docs")
    def test_doc_service_url(self, mock_process, mock_parse):
        mock_parse.return_value = "Test doc content"
        mock_process.return_value = None

        service = DocService()
        async def run():
            await service.process_url("http://example.com")

        loop = asyncio.new_event_loop()
        loop.run_until_complete(run())
        mock_parse.assert_called_once()
        mock_process.assert_called_once_with("Test doc content")

if __name__ == "__main__":
    unittest.main()

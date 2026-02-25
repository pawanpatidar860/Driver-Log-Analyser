import asyncio
from app.parsers.log_parser import LogParser
from app.parsers.html_parser import HTMLParser
import unittest
from unittest.mock import MagicMock, patch

class TestParsers(unittest.TestCase):
    def test_log_parser(self):
        log_text = """
2023-10-01 10:00:00 INFO: Starting driver
2023-10-01 10:00:01 ERROR: Failed to connect to database
Traceback (most recent call last):
  File "driver.py", line 10, in connect
    db.connect()
Exception: Connection refused
2023-10-01 10:00:02 INFO: Retrying...
"""
        blocks = LogParser.extract_error_blocks(log_text)
        self.assertEqual(len(blocks), 1)
        self.assertIn("ERROR: Failed to connect", blocks[0])
        self.assertIn("Exception: Connection refused", blocks[0])

    @patch("httpx.AsyncClient.get")
    def test_html_parser(self, mock_get):
        # Mock response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><p>Hello World</p><a href="/page2">Next</a></body></html>'

        mock_response2 = MagicMock()
        mock_response2.status_code = 200
        mock_response2.text = '<html><body><p>Page 2</p></body></html>'

        mock_get.side_effect = [mock_response, mock_response2]

        parser = HTMLParser(max_depth=1)

        async def run_test():
            text = await parser.parse("http://example.com")
            return text

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        text = loop.run_until_complete(run_test())

        self.assertIn("Hello World", text)
        self.assertIn("Page 2", text)

if __name__ == "__main__":
    unittest.main()

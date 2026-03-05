import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from typing import Set
from loguru import logger

class HTMLParser:
    def __init__(self, max_depth: int = 2):
        self.max_depth = max_depth
        self.visited_urls: Set[str] = set()

    async def parse(self, url: str, depth: int = 0) -> str:
        if depth > self.max_depth or url in self.visited_urls:
            return ""

        self.visited_urls.add(url)
        logger.debug(f"Crawling: {url} (depth: {depth})")

        try:
            async with httpx.AsyncClient(follow_redirects=True) as client:
                response = await client.get(url, timeout=10.0)
                if response.status_code != 200:
                    logger.warning(f"Failed to fetch {url}: Status {response.status_code}")
                    return ""

                soup = BeautifulSoup(response.text, "html.parser")

                # Extract text from current page
                for element in soup(["script", "style", "nav", "footer", "header"]):
                    element.decompose()

                text = soup.get_text(separator=" ", strip=True)

                # Recursive crawl
                if depth < self.max_depth:
                    base_domain = urlparse(url).netloc
                    links = soup.find_all("a", href=True)
                    for link in links:
                        next_url = urljoin(url, link["href"])
                        # Only follow links on the same domain
                        if urlparse(next_url).netloc == base_domain:
                            # Remove fragment
                            next_url = next_url.split("#")[0]
                            text += "\n" + await self.parse(next_url, depth + 1)

                return text
        except Exception as e:
            logger.error(f"Error crawling {url}: {e}")
            return ""

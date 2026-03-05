import os
from app.rag.chunker import Chunker
from app.rag.vector_store import VectorStore
from app.config.settings import settings

class DocAnalysisAgent:
    def __init__(self, index_name: str = "driver_docs"):
        self.chunker = Chunker()
        self.vector_store = VectorStore(index_name)
        self.index_path = os.path.join(settings.VECTOR_DB_DIR, index_name)

    async def process_docs(self, text: str):
        chunks = self.chunker.split_text(text)
        self.vector_store.clear(self.index_path)
        self.vector_store.add_texts(chunks)
        self.vector_store.save(self.index_path)

    def search_relevant_context(self, query: str, k: int = 30) -> str:
        self.vector_store.load(self.index_path)
        docs = self.vector_store.similarity_search(query, k=k)
        return "\n---\n".join([doc.page_content for doc in docs])

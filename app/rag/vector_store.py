from langchain_community.vectorstores import FAISS
from app.rag.embeddings import get_embeddings
import os
import shutil

class VectorStore:
    def __init__(self, index_name: str):
        self.index_name = index_name
        self.embeddings = get_embeddings()
        self.db = None

    def add_texts(self, texts: list[str], metadatas: list[dict] = None):
        if not texts:
            return
        if self.db is None:
            self.db = FAISS.from_texts(texts, self.embeddings, metadatas=metadatas)
        else:
            self.db.add_texts(texts, metadatas=metadatas)

    def similarity_search(self, query: str, k: int = 4):
        if self.db is None:
            return []
        return self.db.similarity_search(query, k=k)

    def save(self, path: str):
        if self.db:
            self.db.save_local(path)

    def load(self, path: str):
        if os.path.exists(path):
            self.db = FAISS.load_local(path, self.embeddings, allow_dangerous_deserialization=True)

    def clear(self, path: str):
        if os.path.exists(path):
            shutil.rmtree(path)
        self.db = None

    @classmethod
    def create_from_texts(cls, texts: list[str], index_name: str, metadatas: list[dict] = None):
        instance = cls(index_name)
        instance.add_texts(texts, metadatas)
        return instance

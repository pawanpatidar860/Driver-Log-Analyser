from app.rag.chunker import Chunker
from app.rag.vector_store import VectorStore
import unittest
import os
import shutil

class TestRAG(unittest.TestCase):
    def setUp(self):
        self.test_index = "test_index"
        self.test_path = "test_faiss_store"
        if os.path.exists(self.test_path):
            shutil.rmtree(self.test_path)

    def tearDown(self):
        if os.path.exists(self.test_path):
            shutil.rmtree(self.test_path)

    def test_rag_flow(self):
        chunker = Chunker(chunk_size=50, chunk_overlap=0)
        text = "This is a long piece of documentation about driver settings. The timeout parameter should be set to 30."
        chunks = chunker.split_text(text)

        self.assertGreater(len(chunks), 1)

        vs = VectorStore(self.test_index)
        vs.add_texts(chunks)

        # Test search
        results = vs.similarity_search("timeout parameter", k=1)
        self.assertEqual(len(results), 1)
        self.assertIn("timeout", results[0].page_content)

        # Test save/load
        vs.save(self.test_path)
        self.assertTrue(os.path.exists(self.test_path))

        vs2 = VectorStore(self.test_index)
        vs2.load(self.test_path)
        results2 = vs2.similarity_search("timeout parameter", k=1)
        self.assertEqual(len(results2), 1)
        self.assertIn("timeout", results2[0].page_content)

if __name__ == "__main__":
    unittest.main()

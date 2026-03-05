from langchain.text_splitter import RecursiveCharacterTextSplitter

class Chunker:
    def __init__(self, chunk_size: int = 4000, chunk_overlap: int = 400):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
        )

    def split_text(self, text: str):
        return self.splitter.split_text(text)

    def split_documents(self, docs):
        return self.splitter.split_documents(docs)

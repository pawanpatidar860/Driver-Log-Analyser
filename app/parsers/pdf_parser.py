from pypdf import PdfReader
import io

class PDFParser:
    @staticmethod
    def parse(file_content: bytes) -> str:
        reader = PdfReader(io.BytesIO(file_content))
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text

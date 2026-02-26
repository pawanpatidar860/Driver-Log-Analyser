# Driver Log Analyser

An AI-powered tool to analyze driver logs and correlate errors with official documentation to identify root causes.

## Features
- **Log Parsing**: Extracts and normalizes errors/exceptions from raw log files.
- **Documentation RAG**: Supports PDF uploads and recursive HTML crawling for documentation context.
- **Root Cause Analysis**: Classifies issues into:
  - **Configuration Issue**: Missing or incorrect parameters.
  - **Documented / Known Behavior**: Explicitly mentioned limitations or behaviors.
  - **Code Issue**: Unidentified errors not found in documentation.
- **Modern Tech Stack**: FastAPI, LangChain, FAISS, OpenRouter, and Tailwind CSS.

## Architecture
The project follows a modular architecture:
- `app/api`: FastAPI routes.
- `app/agents`: LangChain agents for log analysis, doc processing, and decision making.
- `app/rag`: Vector store (FAISS) and embedding management.
- `app/parsers`: Specialized parsers for Logs, PDFs, and HTML.
- `app/services`: Orchestration logic.
- `app/models`: Pydantic schemas for type safety.

## Setup Instructions

### Prerequisites
- Python 3.11+
- OpenRouter API Key

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Driver-log-analyser.git
   cd Driver-log-analyser
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```bash
   export OPENROUTER_API_KEY=your_key_here
   # OR create a .env file:
   # OPENROUTER_API_KEY=your_key_here
   ```

### Running the Application
Start the FastAPI server:
```bash
uvicorn app.main:app --reload
```
The UI will be available at `http://localhost:8000`.

## API Usage
### POST `/api/analyze`
Analyzes a log file against documentation.
- **Parameters**:
  - `log_file`: (.txt file) Mandatory.
  - `doc_file`: (.pdf file) Optional.
  - `doc_url`: (string) Optional URL.
- **Response**: `FinalResponse` schema containing extracted errors and root cause classification.

## Production Readiness
- Environment-based configuration.
- Structured logging with loguru.
- Pydantic models for validation.
- Decoupled components for scalability.
- NO user authentication required.

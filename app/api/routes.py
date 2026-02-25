from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.log_service import LogService
from app.services.doc_service import DocService
from app.agents.decision_agent import DecisionAgent
from app.models.schemas import FinalResponse, LogError
from typing import Optional
import os

router = APIRouter()
log_service = LogService()
doc_service = DocService()
decision_agent = DecisionAgent()

@router.post("/analyze", response_model=FinalResponse)
async def analyze(
    log_file: UploadFile = File(...),
    doc_file: Optional[UploadFile] = File(None),
    doc_url: Optional[str] = Form(None)
):
    try:
        # 1. Read and analyze logs
        log_content = (await log_file.read()).decode("utf-8")
        extracted_errors = await log_service.analyze_logs(log_content)

        if not extracted_errors:
            # If no errors found by LLM, try to return a generic "no errors" response
            # or handle it gracefully.
            # For now, let's assume some errors might be found or we return empty
            pass

        # 2. Process documentation if provided
        if doc_file:
            doc_content = await doc_file.read()
            await doc_service.process_pdf(doc_content)
        elif doc_url:
            await doc_service.process_url(doc_url)
        else:
            raise HTTPException(status_code=400, detail="Documentation (PDF or URL) must be provided")

        # 3. Get context for each error and decide root cause
        # For simplicity, we'll combine all errors into one query or take the most significant one
        query = " ".join([f"{e.error_type} {e.error_message}" for e in extracted_errors])
        context = doc_service.get_context(query)

        root_cause = await decision_agent.decide(extracted_errors, context)

        return FinalResponse(
            extracted_errors=extracted_errors,
            root_cause=root_cause
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.log_service import LogService
from app.services.doc_service import DocService
from app.agents.decision_agent import DecisionAgent
from app.models.schemas import FinalResponse, LogError
from typing import Optional
from loguru import logger

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
    logger.info(f"Received analysis request for log file: {log_file.filename}")
    try:
        # 1. Read and analyze logs
        log_content = (await log_file.read()).decode("utf-8")
        extracted_errors = await log_service.analyze_logs(log_content)

        if not extracted_errors:
            logger.warning("No errors extracted from the log file.")
        else:
            logger.info(f"Extracted {len(extracted_errors)} errors.")

        # 2. Process documentation if provided
        if doc_file:
            doc_content = await doc_file.read()
            await doc_service.process_pdf(doc_content)
        elif doc_url:
            await doc_service.process_url(doc_url)
        else:
            raise HTTPException(status_code=400, detail="Documentation (PDF or URL) must be provided")

        # 3. Get context for each error and decide root cause
        # Use failing_parameter if available for more targeted search
        search_terms = []
        for e in extracted_errors:
            if e.failing_parameter:
                search_terms.append(e.failing_parameter)
            else:
                # Fallback to error message if no specific parameter identified
                search_terms.append(f"{e.error_type} {e.error_message}")

        query = " ".join(list(set(search_terms))) # Use set to avoid redundant terms
        context = doc_service.get_context(query)

        root_cause = await decision_agent.decide(extracted_errors, context)
        logger.info(f"Root cause classification complete: {root_cause.category}")

        return FinalResponse(
            extracted_errors=extracted_errors,
            root_cause=root_cause
        )
    except ValueError as ve:
        if "OPENROUTER_API_KEY" in str(ve):
            logger.error(str(ve))
            raise HTTPException(status_code=500, detail=str(ve))
        raise HTTPException(status_code=500, detail=str(ve))
    except HTTPException:
        raise
    except Exception as e:
        logger.exception(f"Unhandled error during analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

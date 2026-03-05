from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class LogError(BaseModel):
    error_type: str
    error_message: str
    driver_name: Optional[str] = None
    failing_operation: Optional[str] = None
    failing_parameter: Optional[str] = None
    timestamp: Optional[str] = None

class LogAnalysisResult(BaseModel):
    errors: List[LogError]

class AnalysisRequest(BaseModel):
    doc_url: Optional[str] = None

class RootCauseClassification(BaseModel):
    category: str = Field(..., description="Configuration Issue, Code Issue, No Error Found, or Not Able to Identify the Error")
    explanation: str
    relevant_reference: Optional[str] = None

class FinalResponse(BaseModel):
    extracted_errors: List[LogError]
    root_cause: RootCauseClassification

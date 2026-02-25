from langchain_core.prompts import ChatPromptTemplate

LOG_ANALYSIS_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are an expert systems engineer. Analyze the following log blocks and extract errors into a structured JSON format. "
               "Identify error_type, error_message, driver_name, failing_operation, and timestamp if available.\n{format_instructions}"),
    ("user", "Log Blocks:\n{log_blocks}")
])

DECISION_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are a root cause analysis expert. Compare the extracted errors from logs against the provided driver documentation. "
               "Classify the root cause as: 'Configuration Issue', 'Documented / Known Behavior', or 'Code Issue'.\n\n"
               "Context from Documentation:\n{context}\n\n{format_instructions}"),
    ("user", "Extracted Errors:\n{errors}\n\n"
             "Provide the classification, a detailed explanation, and refer to the documentation where applicable.")
])

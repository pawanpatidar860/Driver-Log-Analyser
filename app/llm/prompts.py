from langchain_core.prompts import ChatPromptTemplate

LOG_ANALYSIS_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are an expert systems engineer. Analyze the following log blocks and extract errors into a structured JSON format. "
               "Identify error_type, error_message, driver_name, failing_operation, failing_parameter, and timestamp if available. "
               "The failing_parameter should be the specific field or configuration key mentioned in the error.\n{format_instructions}"),
    ("user", "Log Blocks:\n{log_blocks}")
])

DECISION_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are a root cause analysis expert. Compare the extracted errors from logs against the provided driver documentation. "
               "Classify the root cause as one of: 'Configuration Issue', 'Code Issue', 'No Error Found', or 'Not Able to Identify the Error'.\n\n"
               "If the parameter from the log exists in documentation and indicates incorrect configuration, return 'Configuration Issue'.\n"
               "If the documentation does NOT mention the error or configuration problem, return 'Code Issue'.\n\n"
               "Context from Documentation:\n{context}\n\n{format_instructions}"),
    ("user", "Extracted Errors:\n{errors}\n\n"
             "Provide the classification, a short explanation of the issue, and refer to the documentation where applicable.")
])

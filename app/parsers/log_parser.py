import re
from typing import List

class LogParser:
    @staticmethod
    def extract_error_blocks(log_text: str) -> List[str]:
        lines = log_text.splitlines()
        error_blocks = []
        current_block = []

        # Pattern to detect start of a log entry (usually starts with a date/timestamp)
        new_entry_pattern = re.compile(r'^\d{4}-\d{2}-\d{2}')
        # Pattern to detect if a line contains error info
        error_indicator_pattern = re.compile(r'(ERROR|EXCEPTION|FATAL|CRITICAL|Traceback)', re.IGNORECASE)

        in_error = False

        for line in lines:
            is_new_entry = new_entry_pattern.match(line)
            has_error_indicator = error_indicator_pattern.search(line)

            if has_error_indicator:
                if is_new_entry:
                    # New log entry that is an error
                    if current_block:
                        error_blocks.append("\n".join(current_block))
                    current_block = [line]
                    in_error = True
                else:
                    # Line with error indicator but not necessarily a new entry (could be a stack trace line)
                    if in_error:
                        current_block.append(line)
                    else:
                        # Error started without a timestamped line? (unlikely but possible)
                        current_block = [line]
                        in_error = True
            elif is_new_entry:
                # New entry but not an error
                if in_error:
                    error_blocks.append("\n".join(current_block))
                    current_block = []
                    in_error = False
            else:
                # Not a new entry and no error indicator
                if in_error:
                    if len(current_block) < 50: # Avoid overly long blocks
                        current_block.append(line)
                    else:
                        error_blocks.append("\n".join(current_block))
                        current_block = []
                        in_error = False

        if current_block:
            error_blocks.append("\n".join(current_block))

        return [b for b in error_blocks if b.strip()]

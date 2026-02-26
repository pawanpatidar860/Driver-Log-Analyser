from app.config.settings import settings
import os

def diagnose():
    print("--- Driver Log Analyser Diagnostics ---")
    print(f"Model: {settings.OPENROUTER_MODEL}")

    key = settings.OPENROUTER_API_KEY
    if not key or key == "your_openrouter_api_key_here":
        print("ERROR: OPENROUTER_API_KEY is not set or is still the placeholder value.")
    else:
        masked_key = key[:6] + "..." + key[-4:] if len(key) > 10 else "***"
        print(f"OPENROUTER_API_KEY: {masked_key} (Length: {len(key)})")

    print(f"Log Level: {settings.LOG_LEVEL}")
    print(f"Vector DB Dir: {settings.VECTOR_DB_DIR}")
    print("---------------------------------------")

if __name__ == "__main__":
    diagnose()

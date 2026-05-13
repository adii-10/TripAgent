from prompts import SYSTEM_PROMPT
from bedrock_client import ask_bedrock
from services.mcp_service import execute_weather_tool


async def generate_trip_plan(user_query):

    weather_data = await execute_weather_tool("Goa")

    final_prompt = f"""
{SYSTEM_PROMPT}

USER REQUEST:
{user_query}

LIVE WEATHER DATA:
{weather_data}

Using the weather information,
generate a detailed day-wise travel itinerary.
"""

    result = ask_bedrock(final_prompt)

    return result
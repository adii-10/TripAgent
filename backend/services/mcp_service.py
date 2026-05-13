import asyncio
from mcp import ClientSession
from mcp.client.sse import sse_client


MCP_SERVER_URL = "http://127.0.0.1:8080/sse"


async def execute_weather_tool(city):

    try:

        async with sse_client(MCP_SERVER_URL) as streams:

            read_stream, write_stream = streams

            async with ClientSession(
                read_stream,
                write_stream
            ) as session:

                await session.initialize()

                tools = await session.list_tools()

                print("AVAILABLE TOOLS:")
                print(tools)

                result = await session.call_tool(
                    "get_current_weather",
                    {
                        "location": city
                    }
                )

                print("MCP RESULT:")
                print(result)

                return str(result)

    except Exception as e:

        print("MCP ERROR:")
        print(e)

        return f"Weather tool failed: {str(e)}"
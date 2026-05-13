def determine_tools(user_query):

    tools_needed = []

    query = user_query.lower()

    if "weather" in query:
        tools_needed.append("weather")

    if "beach" in query:
        tools_needed.append("places")

    if "trip" in query:
        tools_needed.append("weather")
        tools_needed.append("places")

    return tools_needed
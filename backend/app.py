from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.itinerary_service import generate_trip_plan

app = FastAPI()


# CORS CONFIGURATION
# Allows frontend (localhost:3000)
# to communicate with backend (localhost:8000)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# HOME ROUTE

@app.get("/")
def home():

    return {
        "message": "AI Trip Agent Backend Running"
    }


# TRIP PLANNER ROUTE

@app.get("/trip")
async def plan_trip(query: str):

    result = await generate_trip_plan(query)

    return {
        "success": True,
        "query": query,
        "response": result
    }
"use client"

import { useState } from "react"

export default function TripAgentUI() {

  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")

  const generateTrip = async () => {

    if (!query) return

    setLoading(true)
    setResponse("")

    try {

      const res = await fetch(
        `http://127.0.0.1:8000/trip?query=${encodeURIComponent(query)}`
      )

      const data = await res.json()

      setResponse(
        data.response.output.message.content[0].text
      )

    } catch (error) {

      console.error(error)

      setResponse(
        "Failed to generate itinerary. Please make sure backend and MCP server are running."
      )
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/10 backdrop-blur-xl bg-black/20">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              AI Trip Agent
            </h1>

            <p className="text-sm text-slate-400">
              AWS Bedrock + MCP Powered Travel Planner
            </p>

          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">

            <span>Bedrock</span>
            <span>MCP</span>
            <span>FastAPI</span>
            <span>Next.js</span>

          </div>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div className="space-y-8">

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm">
              ✨ Agentic AI Travel Assistant
            </div>

            <div className="space-y-6">

              <h1 className="text-6xl lg:text-7xl font-black leading-tight tracking-tight">

                Plan Trips With
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                  AI + MCP Tools
                </span>

              </h1>

              <p className="text-lg leading-8 text-slate-300 max-w-xl">

                Generate intelligent travel itineraries using
                Amazon Bedrock, MCP tool calling, weather data,
                and real-time travel reasoning.

              </p>

            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-5 pt-4">

              <FeatureCard
                title="Live Weather"
                description="Uses MCP weather tools for dynamic planning"
              />

              <FeatureCard
                title="Smart Budgeting"
                description="AI optimizes plans based on your budget"
              />

              <FeatureCard
                title="Agentic Workflow"
                description="LLM dynamically calls external tools"
              />

              <FeatureCard
                title="AWS Bedrock"
                description="Powered by Nova Pro foundation models"
              />

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="relative">

            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />

            <div className="relative border border-white/10 bg-white/5 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl">

              {/* Header */}
              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-3xl font-bold">
                    Trip Planner
                  </h2>

                  <p className="text-slate-400 mt-1">
                    Ask your AI travel assistant
                  </p>

                </div>

                <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse" />

              </div>

              {/* Example */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 mb-6">

                <p className="text-sm text-slate-400 mb-3">
                  Example Prompt
                </p>

                <p className="leading-7 text-slate-200">
                  “Plan a 3-day Goa trip under ₹20k with beaches,
                  nightlife, weather suggestions, and food recommendations.”
                </p>

              </div>

              {/* Input */}
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your dream trip..."
                className="w-full h-40 rounded-3xl bg-slate-950/70 border border-white/10 p-5 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500 resize-none text-[15px]"
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-5">

                <Tag label="Goa" />
                <Tag label="Budget" />
                <Tag label="Beach" />
                <Tag label="Nightlife" />
                <Tag label="Adventure" />

              </div>

              {/* Button */}
              <button
                onClick={generateTrip}
                className="w-full mt-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >

                {
                  loading
                    ? "Generating AI Itinerary..."
                    : "Generate Smart Trip"
                }

              </button>

              {/* RESPONSE */}
              {
                response && (
                  <div className="mt-10 space-y-5">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-black font-black text-lg">
                        AI
                      </div>

                      <div>

                        <h3 className="text-xl font-bold">
                          Your Smart Itinerary
                        </h3>

                        <p className="text-sm text-slate-400">
                          Generated using AWS Bedrock + MCP
                        </p>

                      </div>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/90 to-slate-900/90 p-8 whitespace-pre-wrap text-[15px] leading-8 text-slate-200 overflow-auto max-h-[700px] shadow-2xl">

                      {response}

                    </div>

                  </div>
                )
              }

            </div>

          </div>

        </div>

      </section>

      {/* Architecture */}
      <section className="relative z-10 px-6 pb-24">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold mb-5">
              Agentic AI Architecture
            </h2>

            <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-8">

              This system combines Amazon Bedrock foundation models
              with MCP tool execution to build an intelligent travel assistant.

            </p>

          </div>

          <div className="grid md:grid-cols-5 gap-5 items-center">

            <ArchitectureCard
              title="User"
              subtitle="Travel Request"
            />

            <Arrow />

            <ArchitectureCard
              title="Frontend"
              subtitle="Next.js UI"
            />

            <Arrow />

            <ArchitectureCard
              title="Backend"
              subtitle="FastAPI Server"
            />

          </div>

          <div className="grid md:grid-cols-5 gap-5 items-center mt-6">

            <ArchitectureCard
              title="Bedrock"
              subtitle="Nova Pro LLM"
            />

            <Arrow />

            <ArchitectureCard
              title="MCP Server"
              subtitle="Weather Tools"
            />

            <Arrow />

            <ArchitectureCard
              title="AI Output"
              subtitle="Travel Itinerary"
            />

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-5">

          <div>

            <h3 className="font-bold text-lg">
              AI Trip Agent
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Built with AWS Bedrock, MCP, FastAPI, Python, and Next.js
            </p>

          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400">

            <span>Amazon Bedrock</span>
            <span>•</span>
            <span>MCP Protocol</span>
            <span>•</span>
            <span>Next.js</span>

          </div>

        </div>

      </footer>

    </div>
  )
}


/* COMPONENTS */

function FeatureCard({ title, description }) {

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">

      <h3 className="font-bold text-lg mb-3">
        {title}
      </h3>

      <p className="text-sm leading-7 text-slate-400">
        {description}
      </p>

    </div>
  )
}

function Tag({ label }) {

  return (
    <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300">
      {label}
    </div>
  )
}

function ArchitectureCard({ title, subtitle }) {

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center hover:bg-white/10 transition-all duration-300">

      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      <p className="text-sm text-slate-400 mt-3">
        {subtitle}
      </p>

    </div>
  )
}

function Arrow() {

  return (
    <div className="hidden md:flex items-center justify-center text-5xl text-slate-600">
      →
    </div>
  )
}
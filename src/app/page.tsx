'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Camera, Upload, Copy, CheckCircle, Eye, X } from 'lucide-react'
import {
  GlassCard,
  TechnicalButton
} from '../components/TechnicalComponents'
import {
  CircuitLoader,
  ComponentIcon,
  ConfidenceBar,
  TechnicalBadge
} from '../components/TechnicalIcons'
import SchematicViewer from '../components/SchematicViewer'
import { EnhancedSchematicViewer } from '../components/SchematicSymbols'

interface Component {
  name: string
  type: string
  confidence: number
}

interface Project {
  title: string
  description: string
  difficulty: string
  components_needed: string[]
  code: string
  wiring_description: string
}

interface ApiResponse {
  components: Component[]
  projects: Project[]
}

interface Position {
  x: number
  y: number
}

interface Connection {
  from_component: string
  from_pin: string
  to_component: string
  to_pin: string
}

interface SchematicComponent {
  name: string
  type: string
  position: Position
  pins: string[]
}

interface Circuit {
  components: SchematicComponent[]
  connections: Connection[]
  svg_data: string
}

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ApiResponse | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [schematicData, setSchematicData] = useState<Circuit | null>(null)
  const [schematicLoading, setSchematicLoading] = useState(false)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setLoading(true)
    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        const data = await response.json()
        setResults(data)
      } else {
        console.error('Analysis failed')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleViewSchematic = async (project: Project, index: number) => {
    setSchematicLoading(true)
    setSelectedProjectIndex(index)
    setSchematicData(null) // Clear previous schematic

    try {
      const response = await fetch('/api/schematic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ components: project.components_needed }),
      })

      if (response.ok) {
        const data = await response.json()
        setSchematicData(data)
      } else {
        console.error('Schematic generation failed')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSchematicLoading(false)
    }
  }

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on mobile
      })
      setCameraStream(stream)
      setShowCamera(true)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Could not access camera. Please check permissions.')
    }
  }

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
      setCameraStream(null)
    }
    setShowCamera(false)
  }

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (ctx) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0)

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' })
            setSelectedFile(file)
            const url = URL.createObjectURL(blob)
            setPreviewUrl(url)
            closeCamera()
          }
        }, 'image/jpeg', 0.9)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 font-sans tracking-tight">
            Electronics Cookbook
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans">
            Upload an image of electronic components and get AI-powered project suggestions with code and wiring diagrams
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <GlassCard className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6 text-slate-800">
                Upload Component Image
              </h2>

              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
                {/* File Upload Option */}
                <div className="border-2 border-dashed border-black/30 rounded-lg p-6 transition-colors hover:border-black/50 w-full md:w-64">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center space-y-3"
                  >
                    <div className="p-3 bg-black/10 rounded-full">
                      <Upload className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Upload from files
                      </p>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, JPEG up to 10MB
                      </p>
                    </div>
                  </label>
                </div>

                {/* Camera Option */}
                <div className="border-2 border-dashed border-black/30 rounded-lg p-6 transition-colors hover:border-black/50 w-full md:w-64">
                  <button
                    onClick={openCamera}
                    className="flex flex-col items-center space-y-3 w-full"
                  >
                    <div className="p-3 bg-black/10 rounded-full">
                      <Camera className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Take a photo
                      </p>
                      <p className="text-xs text-slate-500">
                        Use your camera
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {previewUrl && (
                <div className="mt-6">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={400}
                    height={300}
                    className="max-w-md mx-auto rounded-lg shadow-lg"
                  />
                </div>
              )}

              {selectedFile && (
                <div className="mt-6">
                  <TechnicalButton
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="px-8 py-3"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <CircuitLoader />
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Upload className="w-5 h-5" />
                        <span>Analyze Image</span>
                      </div>
                    )}
                  </TechnicalButton>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Results Section */}
          {results && (
            <div className="space-y-6">
              {/* Detected Components */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-800">
                  Detected Components
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.components.map((component, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg border border-black/10"
                    >
                      <ComponentIcon type={component.type} />
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">
                          {component.name}
                        </p>
                        <ConfidenceBar confidence={component.confidence} />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Project Suggestions */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800">
                  Project Suggestions
                </h3>
                {results.projects.map((project, index) => (
                  <GlassCard key={index} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800">
                          {project.title}
                        </h4>
                        <p className="text-slate-600 mt-1">
                          {project.description}
                        </p>
                      </div>
                      <TechnicalBadge variant={project.difficulty === 'easy' ? 'green' : project.difficulty === 'medium' ? 'yellow' : 'red'}>
                        {project.difficulty}
                      </TechnicalBadge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-slate-700 mb-2">
                          Components Needed:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {project.components_needed.map((comp, compIndex) => (
                            <span
                              key={compIndex}
                              className="px-3 py-1 bg-black/10 text-black rounded-full text-sm"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-slate-700">Code:</h5>
                          <button
                            onClick={() => copyToClipboard(project.code, index)}
                            className="flex items-center space-x-1 text-sm text-black hover:text-gray-800"
                          >
                            {copiedIndex === index ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                            <span>
                              {copiedIndex === index ? 'Copied!' : 'Copy'}
                            </span>
                          </button>
                        </div>
                        <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{project.code}</code>
                        </pre>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-700 mb-2">
                          Wiring Instructions:
                        </h5>
                        <p className="text-slate-600 bg-black/5 p-3 rounded-lg">
                          {project.wiring_description}
                        </p>
                      </div>
{/* 
                      <div className="mt-4">
                        <TechnicalButton
                          onClick={() => handleViewSchematic(project, index)}
                          disabled={schematicLoading && selectedProjectIndex === index}
                          className="px-4 py-2"
                        >
                          {schematicLoading && selectedProjectIndex === index ? (
                            <div className="flex items-center space-x-2">
                              <CircuitLoader />
                              <span>Generating Schematic...</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <Eye className="w-4 h-4" />
                              <span>View Schematic</span>
                            </div>
                          )}
                        </TechnicalButton>
                      </div> */}
                    </div>
                  </GlassCard>
                ))}
              </div>

              {/* Schematic Viewer */}
              {schematicData && (
                <div className="mt-8">
                  <EnhancedSchematicViewer circuit={schematicData} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Take Photo</h3>
              <button
                onClick={closeCamera}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 bg-black rounded-lg object-cover"
              />
              <canvas
                ref={canvasRef}
                className="hidden"
              />
            </div>

            <div className="flex justify-center mt-4">
              <TechnicalButton
                onClick={takePhoto}
                className="px-6 py-2"
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
              </TechnicalButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import React from 'react'

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

interface SchematicViewerProps {
  circuit: Circuit
}

export default function SchematicViewer({ circuit }: SchematicViewerProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-slate-800">
          Circuit Schematic
        </h3>

        {/* Render SVG */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            dangerouslySetInnerHTML={{ __html: circuit.svg_data }}
            className="w-full"
          />
        </div>

        {/* Component List */}
        <div className="mt-6">
          <h4 className="text-lg font-medium mb-3 text-slate-700">
            Components
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {circuit.components.map((comp, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <div className="font-medium text-slate-800">
                  {comp.name}
                </div>
                <div className="text-sm text-slate-600">
                  Type: {comp.type}
                </div>
                <div className="text-sm text-slate-500">
                  Position: ({comp.position.x}, {comp.position.y})
                </div>
                <div className="text-sm text-slate-500">
                  Pins: {comp.pins.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connections */}
        <div className="mt-6">
          <h4 className="text-lg font-medium mb-3 text-slate-700">
            Connections
          </h4>
          <div className="space-y-2">
            {circuit.connections.map((conn, index) => (
              <div
                key={index}
                className="bg-blue-50 p-3 rounded-lg border border-blue-200"
              >
                <div className="text-sm text-slate-700">
                  {conn.from_component} ({conn.from_pin}) → {conn.to_component} ({conn.to_pin})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React from 'react'

interface Position {
  x: number
  y: number
}

interface SchematicComponent {
  name: string
  type: string
  position: Position
  pins: string[]
}

interface Connection {
  from_component: string
  from_pin: string
  to_component: string
  to_pin: string
}

interface Circuit {
  components: SchematicComponent[]
  connections: Connection[]
  svg_data: string
}

// Standard electronic symbol components
export const SchematicSymbols = {
  // Arduino board symbol
  Arduino: ({ x, y, width = 80, height = 40 }: { x: number; y: number; width?: number; height?: number }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="5"
        fill="#4A90E2"
        stroke="#2C5AA0"
        strokeWidth="2"
      />
      <text
        x={x + width/2}
        y={y + height/2 + 5}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        Arduino
      </text>
      {/* Pin connections */}
      <circle cx={x} cy={y + 10} r="3" fill="#333" />
      <circle cx={x} cy={y + 20} r="3" fill="#333" />
      <circle cx={x} cy={y + 30} r="3" fill="#333" />
      <circle cx={x + width} cy={y + 10} r="3" fill="#333" />
      <circle cx={x + width} cy={y + 20} r="3" fill="#333" />
      <circle cx={x + width} cy={y + 30} r="3" fill="#333" />
    </g>
  ),

  // LED symbol
  LED: ({ x, y }: { x: number; y: number }) => (
    <g>
      {/* LED triangle */}
      <path
        d={`M${x},${y} L${x+20},${y-10} L${x+40},${y} L${x+20},${y+10} Z`}
        fill="#FF6B6B"
        stroke="#CC5555"
        strokeWidth="2"
      />
      {/* Arrow indicating light direction */}
      <path
        d={`M${x+20},${y-5} L${x+15},${y} L${x+20},${y+5}`}
        fill="none"
        stroke="#333"
        strokeWidth="1"
        markerEnd="url(#arrowhead)"
      />
      {/* Connection lines */}
      <line x1={x} y1={y} x2={x-10} y2={y} stroke="#333" strokeWidth="2" />
      <line x1={x+40} y1={y} x2={x+50} y2={y} stroke="#333" strokeWidth="2" />
    </g>
  ),

  // Resistor symbol
  Resistor: ({ x, y, width = 40 }: { x: number; y: number; width?: number }) => (
    <g>
      <path
        d={`M${x},${y} L${x+8},${y-8} L${x+16},${y+8} L${x+24},${y-8} L${x+32},${y+8} L${x+40},${y}`}
        fill="none"
        stroke="#333"
        strokeWidth="3"
      />
      <line x1={x} y1={y} x2={x-10} y2={y} stroke="#333" strokeWidth="2" />
      <line x1={x+40} y1={y} x2={x+50} y2={y} stroke="#333" strokeWidth="2" />
    </g>
  ),

  // Push button symbol
  Button: ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect
        x={x}
        y={y-5}
        width="30"
        height="20"
        rx="3"
        fill="#E8E8E8"
        stroke="#666"
        strokeWidth="2"
      />
      <line x1={x-10} y1={y+2.5} x2={x} y2={y+2.5} stroke="#333" strokeWidth="2" />
      <line x1={x+30} y1={y+2.5} x2={x+40} y2={y+2.5} stroke="#333" strokeWidth="2" />
      <line x1={x+10} y1={y-5} x2={x+10} y2={y-15} stroke="#333" strokeWidth="2" />
      <line x1={x+20} y1={y-5} x2={x+20} y2={y-15} stroke="#333" strokeWidth="2" />
    </g>
  ),

  // Breadboard symbol
  Breadboard: ({ x, y, width = 100, height = 60 }: { x: number; y: number; width?: number; height?: number }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#8B4513"
        stroke="#654321"
        strokeWidth="2"
      />
      {/* Connection holes */}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <circle cx={x + 15 + i * 10} cy={y + 10} r="2" fill="#333" />
          <circle cx={x + 15 + i * 10} cy={y + 20} r="2" fill="#333" />
          <circle cx={x + 15 + i * 10} cy={y + 30} r="2" fill="#333" />
          <circle cx={x + 15 + i * 10} cy={y + 40} r="2" fill="#333" />
          <circle cx={x + 15 + i * 10} cy={y + 50} r="2" fill="#333" />
        </g>
      ))}
      <text
        x={x + width/2}
        y={y + height + 15}
        textAnchor="middle"
        fill="#333"
        fontSize="10"
      >
        Breadboard
      </text>
    </g>
  ),

  // Power rail (top)
  PowerRail: ({ x, y, width = 500 }: { x: number; y: number; width?: number }) => (
    <g>
      <line x1={x} y1={y} x2={x + width} y2={y} stroke="#333" strokeWidth="3" />
      <text x={x + 10} y={y - 5} fill="#333" fontSize="12" fontWeight="bold">+</text>
      <text x={x + width - 20} y={y - 5} fill="#333" fontSize="12" fontWeight="bold">+</text>
    </g>
  ),

  // Ground rail (bottom)
  GroundRail: ({ x, y, width = 500 }: { x: number; y: number; width?: number }) => (
    <g>
      <line x1={x} y1={y} x2={x + width} y2={y} stroke="#333" strokeWidth="3" />
      <line x1={x + 10} y1={y + 5} x2={x + 10} y2={y + 15} stroke="#333" strokeWidth="2" />
      <line x1={x + 15} y1={y + 8} x2={x + 15} y2={y + 18} stroke="#333" strokeWidth="2" />
      <line x1={x + 20} y1={y + 11} x2={x + 20} y2={y + 21} stroke="#333" strokeWidth="2" />
      <text x={x + width - 30} y={y + 25} fill="#333" fontSize="12" fontWeight="bold">GND</text>
    </g>
  ),

  // Connection wire
  Wire: ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333" strokeWidth="2" />
      <circle cx={x1} cy={y1} r="2" fill="#333" />
      <circle cx={x2} cy={y2} r="2" fill="#333" />
    </g>
  )
}

// Generate professional schematic SVG
export const generateSchematicSVG = (circuit: Circuit): string => {
  const width = 600
  const height = 400
  const padding = 40

  // Position components automatically
  const positionedComponents = positionComponents(circuit.components)

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7"
         refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="#f8f9fa"/>

      <!-- Power and ground rails -->
      <g id="power-rails">
        ${SchematicSymbols.PowerRail({ x: padding, y: padding, width: width - 2 * padding })}
        ${SchematicSymbols.GroundRail({ x: padding, y: height - padding, width: width - 2 * padding })}
      </g>

      <!-- Components -->
      <g id="components">
        ${positionedComponents.map(comp =>
          generateComponentSVG(comp)
        ).join('\n        ')}
      </g>

      <!-- Connections -->
      <g id="connections">
        ${generateConnectionsSVG(circuit.connections, positionedComponents)}
      </g>
    </svg>
  `
}

const positionComponents = (components: SchematicComponent[]): SchematicComponent[] => {
  const positioned: SchematicComponent[] = []
  const usedPositions = new Set<string>()

  components.forEach((comp, index) => {
    let position = comp.position

    // Auto-position if no position specified
    if (!position || (position.x === 0 && position.y === 0)) {
      position = findOptimalPosition(comp, index, usedPositions)
    }

    positioned.push({ ...comp, position })
    usedPositions.add(`${position.x},${position.y}`)
  })

  return positioned
}

const findOptimalPosition = (component: SchematicComponent, index: number, usedPositions: Set<string>): Position => {
  const spacing = 120
  const startX = 100
  const startY = 120

  // Simple grid layout
  const row = Math.floor(index / 2)
  const col = index % 2

  return {
    x: startX + col * spacing,
    y: startY + row * 80
  }
}

const generateComponentSVG = (component: SchematicComponent): string => {
  const { x, y } = component.position

  switch (component.type.toLowerCase()) {
    case 'arduino':
    case 'microcontroller':
      return `
        <rect x="${x}" y="${y}" width="80" height="40" rx="5" fill="#4A90E2" stroke="#2C5AA0" stroke-width="2"/>
        <text x="${x + 40}" y="${y + 25}" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Arduino</text>
        <circle cx="${x}" cy="${y + 10}" r="3" fill="#333"/>
        <circle cx="${x}" cy="${y + 20}" r="3" fill="#333"/>
        <circle cx="${x}" cy="${y + 30}" r="3" fill="#333"/>
        <circle cx="${x + 80}" cy="${y + 10}" r="3" fill="#333"/>
        <circle cx="${x + 80}" cy="${y + 20}" r="3" fill="#333"/>
        <circle cx="${x + 80}" cy="${y + 30}" r="3" fill="#333"/>
      `

    case 'led':
      return `
        <path d="M${x},${y} L${x+20},${y-10} L${x+40},${y} L${x+20},${y+10} Z" fill="#FF6B6B" stroke="#CC5555" stroke-width="2"/>
        <path d="M${x+20},${y-5} L${x+15},${y} L${x+20},${y+5}" fill="none" stroke="#333" stroke-width="1" marker-end="url(#arrowhead)"/>
        <line x1="${x}" y1="${y}" x2="${x-10}" y2="${y}" stroke="#333" stroke-width="2"/>
        <line x1="${x+40}" y1="${y}" x2="${x+50}" y2="${y}" stroke="#333" stroke-width="2"/>
      `

    case 'resistor':
      return `
        <path d="M${x},${y} L${x+8},${y-8} L${x+16},${y+8} L${x+24},${y-8} L${x+32},${y+8} L${x+40},${y}" fill="none" stroke="#333" stroke-width="3"/>
        <line x1="${x}" y1="${y}" x2="${x-10}" y2="${y}" stroke="#333" stroke-width="2"/>
        <line x1="${x+40}" y1="${y}" x2="${x+50}" y2="${y}" stroke="#333" stroke-width="2"/>
      `

    case 'button':
    case 'pushbutton':
      return `
        <rect x="${x}" y="${y-5}" width="30" height="20" rx="3" fill="#E8E8E8" stroke="#666" stroke-width="2"/>
        <line x1="${x-10}" y1="${y+2.5}" x2="${x}" y2="${y+2.5}" stroke="#333" stroke-width="2"/>
        <line x1="${x+30}" y1="${y+2.5}" x2="${x+40}" y2="${y+2.5}" stroke="#333" stroke-width="2"/>
        <line x1="${x+10}" y1="${y-5}" x2="${x+10}" y2="${y-15}" stroke="#333" stroke-width="2"/>
        <line x1="${x+20}" y1="${y-5}" x2="${x+20}" y2="${y-15}" stroke="#333" stroke-width="2"/>
      `

    case 'breadboard':
      return `
        <rect x="${x}" y="${y}" width="100" height="60" fill="#8B4513" stroke="#654321" stroke-width="2"/>
        <circle cx="${x + 15}" cy="${y + 10}" r="2" fill="#333"/>
        <circle cx="${x + 25}" cy="${y + 10}" r="2" fill="#333"/>
        <circle cx="${x + 35}" cy="${y + 10}" r="2" fill="#333"/>
        <circle cx="${x + 45}" cy="${y + 10}" r="2" fill="#333"/>
        <circle cx="${x + 55}" cy="${y + 10}" r="2" fill="#333"/>
        <circle cx="${x + 65}" cy="${y + 10}" r="2" fill="#333"/>
        <circle cx="${x + 75}" cy="${y + 10}" r="2" fill="#333"/>
        <circle cx="${x + 85}" cy="${y + 10}" r="2" fill="#333"/>
        <circle cx="${x + 15}" cy="${y + 20}" r="2" fill="#333"/>
        <circle cx="${x + 25}" cy="${y + 20}" r="2" fill="#333"/>
        <circle cx="${x + 35}" cy="${y + 20}" r="2" fill="#333"/>
        <circle cx="${x + 45}" cy="${y + 20}" r="2" fill="#333"/>
        <circle cx="${x + 55}" cy="${y + 20}" r="2" fill="#333"/>
        <circle cx="${x + 65}" cy="${y + 20}" r="2" fill="#333"/>
        <circle cx="${x + 75}" cy="${y + 20}" r="2" fill="#333"/>
        <circle cx="${x + 85}" cy="${y + 20}" r="2" fill="#333"/>
        <circle cx="${x + 15}" cy="${y + 30}" r="2" fill="#333"/>
        <circle cx="${x + 25}" cy="${y + 30}" r="2" fill="#333"/>
        <circle cx="${x + 35}" cy="${y + 30}" r="2" fill="#333"/>
        <circle cx="${x + 45}" cy="${y + 30}" r="2" fill="#333"/>
        <circle cx="${x + 55}" cy="${y + 30}" r="2" fill="#333"/>
        <circle cx="${x + 65}" cy="${y + 30}" r="2" fill="#333"/>
        <circle cx="${x + 75}" cy="${y + 30}" r="2" fill="#333"/>
        <circle cx="${x + 85}" cy="${y + 30}" r="2" fill="#333"/>
        <circle cx="${x + 15}" cy="${y + 40}" r="2" fill="#333"/>
        <circle cx="${x + 25}" cy="${y + 40}" r="2" fill="#333"/>
        <circle cx="${x + 35}" cy="${y + 40}" r="2" fill="#333"/>
        <circle cx="${x + 45}" cy="${y + 40}" r="2" fill="#333"/>
        <circle cx="${x + 55}" cy="${y + 40}" r="2" fill="#333"/>
        <circle cx="${x + 65}" cy="${y + 40}" r="2" fill="#333"/>
        <circle cx="${x + 75}" cy="${y + 40}" r="2" fill="#333"/>
        <circle cx="${x + 85}" cy="${y + 40}" r="2" fill="#333"/>
        <circle cx="${x + 15}" cy="${y + 50}" r="2" fill="#333"/>
        <circle cx="${x + 25}" cy="${y + 50}" r="2" fill="#333"/>
        <circle cx="${x + 35}" cy="${y + 50}" r="2" fill="#333"/>
        <circle cx="${x + 45}" cy="${y + 50}" r="2" fill="#333"/>
        <circle cx="${x + 55}" cy="${y + 50}" r="2" fill="#333"/>
        <circle cx="${x + 65}" cy="${y + 50}" r="2" fill="#333"/>
        <circle cx="${x + 75}" cy="${y + 50}" r="2" fill="#333"/>
        <circle cx="${x + 85}" cy="${y + 50}" r="2" fill="#333"/>
        <text x="${x + 50}" y="${y + 75}" text-anchor="middle" fill="#333" font-size="10">Breadboard</text>
      `

    default:
      // Generic component
      return `
        <rect x="${x}" y="${y}" width="60" height="30" rx="3" fill="#E8E8E8" stroke="#666" stroke-width="2"/>
        <text x="${x + 30}" y="${y + 20}" text-anchor="middle" fill="#333" font-size="10">${component.name}</text>
        <line x1="${x}" y1="${y + 15}" x2="${x - 15}" y2="${y + 15}" stroke="#333" stroke-width="2"/>
        <line x1="${x + 60}" y1="${y + 15}" x2="${x + 75}" y2="${y + 15}" stroke="#333" stroke-width="2"/>
      `
  }
}

const generateConnectionsSVG = (connections: Connection[], components: SchematicComponent[]): string => {
  return connections.map(connection => {
    const fromComp = components.find(c => c.name === connection.from_component)
    const toComp = components.find(c => c.name === connection.to_component)

    if (!fromComp || !toComp) return ''

    // Find pin positions (simplified)
    const fromX = fromComp.position.x + 60
    const fromY = fromComp.position.y + 15
    const toX = toComp.position.x - 15
    const toY = toComp.position.y + 15

    return `
      <line x1="${fromX}" y1="${fromY}" x2="${toX}" y2="${toY}" stroke="#333" stroke-width="2"/>
      <circle cx="${fromX}" cy="${fromY}" r="2" fill="#333"/>
      <circle cx="${toX}" cy="${toY}" r="2" fill="#333"/>
    `
  }).join('\n      ')
}

// Enhanced schematic viewer component
export const EnhancedSchematicViewer: React.FC<{ circuit: Circuit }> = ({ circuit }) => {
  const svgContent = generateSchematicSVG(circuit)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-slate-800">
          Professional Circuit Schematic
        </h3>

        {/* Render SVG */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
          <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            className="w-full"
          />
        </div>

        {/* Component Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-sm">
            <div className="font-medium text-slate-700 mb-2">Symbols:</div>
            <div className="space-y-1 text-slate-600">
              <div>⚡ Arduino Board</div>
              <div>💡 LED (Light Emitting Diode)</div>
              <div>⟲ Resistor</div>
              <div>⏻ Push Button</div>
              <div>🔌 Breadboard</div>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-medium text-slate-700 mb-2">Components:</div>
            <div className="space-y-1">
              {circuit.components.map((comp, index) => (
                <div key={index} className="text-slate-600">
                  <span className="font-medium">{comp.name}</span>
                  <span className="text-slate-500"> ({comp.type})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm">
            <div className="font-medium text-slate-700 mb-2">Connections:</div>
            <div className="space-y-1">
              {circuit.connections.map((conn, index) => (
                <div key={index} className="text-slate-600 text-xs">
                  {conn.from_component} → {conn.to_component}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

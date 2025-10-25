"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Palette } from 'lucide-react'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
}

const presetColors = [
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#ef4444', // Red
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#3b82f6', // Blue
  '#ec4899', // Pink
  '#84cc16', // Lime
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#14b8a6', // Teal
  '#a855f7', // Violet
]

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  const handleColorChange = (color: string) => {
    setInputValue(color)
    onChange(color)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (newValue.match(/^#[0-9A-F]{6}$/i)) {
      onChange(newValue)
    }
  }

  const convertToHex = (color: string): string => {
    // If it's already a hex color, return it
    if (color.startsWith('#')) return color
    
    // If it's an oklch color, try to extract a reasonable hex approximation
    if (color.includes('oklch')) {
      // Mapeo inverso de OKLCH a hex para la visualización
      const oklchToHex: { [key: string]: string } = {
        'oklch(0.646 0.222 286.75)': '#8b5cf6', // Purple
        'oklch(0.696 0.17 197.137)': '#06b6d4',  // Cyan
        'oklch(0.6 0.25 240)': '#3b82f6',        // Blue
        'oklch(0.7 0.2 150)': '#10b981',         // Green
        'oklch(0.6 0.25 20)': '#ef4444',         // Red
        'oklch(0.7 0.2 60)': '#f97316',          // Orange
        'oklch(0.65 0.25 320)': '#ec4899',       // Pink
        'oklch(0.7 0.2 280)': '#a855f7',         // Violet
        'oklch(0.6 0.2 180)': '#14b8a6'          // Teal
      }
      
      return oklchToHex[color] || '#8b5cf6' // Default to purple
    }
    
    return color
  }

  const displayColor = convertToHex(inputValue)

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-12 h-10 p-0 border-2"
              style={{ backgroundColor: displayColor }}
            >
              <span className="sr-only">Pick color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Preset Colors</label>
                <div className="grid grid-cols-6 gap-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        handleColorChange(color)
                        setIsOpen(false)
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Custom Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={displayColor}
                    onChange={(e) => {
                      handleColorChange(e.target.value)
                    }}
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                  />
                  <Input
                    value={displayColor}
                    onChange={handleInputChange}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter color value"
          className="flex-1"
        />
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Palette className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
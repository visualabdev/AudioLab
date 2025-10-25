// Audio generator for demo purposes
export class AudioGenerator {
  private audioContext: AudioContext | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  // Generate a simple tone for demo purposes
  generateTone(frequency: number = 440, duration: number = 30): string {
    if (!this.audioContext) return ''

    const sampleRate = this.audioContext.sampleRate
    const numSamples = sampleRate * duration
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate)
    const channelData = buffer.getChannelData(0)

    // Generate a simple sine wave with some variation
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      // Create a more interesting sound with multiple frequencies
      const wave1 = Math.sin(2 * Math.PI * frequency * t) * 0.3
      const wave2 = Math.sin(2 * Math.PI * (frequency * 1.5) * t) * 0.2
      const wave3 = Math.sin(2 * Math.PI * (frequency * 0.5) * t) * 0.1
      
      // Add some envelope to make it more musical
      const envelope = Math.exp(-t * 0.1) * (1 - Math.exp(-t * 10))
      
      channelData[i] = (wave1 + wave2 + wave3) * envelope
    }

    // Convert buffer to blob URL
    return this.bufferToUrl(buffer)
  }

  private bufferToUrl(buffer: AudioBuffer): string {
    const length = buffer.length
    const channels = buffer.numberOfChannels
    const sampleRate = buffer.sampleRate
    
    // Create WAV file
    const arrayBuffer = new ArrayBuffer(44 + length * channels * 2)
    const view = new DataView(arrayBuffer)
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }
    
    writeString(0, 'RIFF')
    view.setUint32(4, 36 + length * channels * 2, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, channels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * channels * 2, true)
    view.setUint16(32, channels * 2, true)
    view.setUint16(34, 16, true)
    writeString(36, 'data')
    view.setUint32(40, length * channels * 2, true)
    
    // Convert float samples to 16-bit PCM
    let offset = 44
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < channels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]))
        view.setInt16(offset, sample * 0x7FFF, true)
        offset += 2
      }
    }
    
    const blob = new Blob([arrayBuffer], { type: 'audio/wav' })
    return URL.createObjectURL(blob)
  }

  // Generate different types of demo tracks
  static generateDemoTracks(): { [key: string]: string } {
    const generator = new AudioGenerator()
    
    return {
      'demo-beat-1': generator.generateTone(220, 30), // A3
      'demo-beat-2': generator.generateTone(330, 30), // E4
      'demo-beat-3': generator.generateTone(440, 30), // A4
      'demo-sample-1': generator.generateTone(523, 15), // C5
      'demo-midi-1': generator.generateTone(659, 20), // E5
    }
  }
}
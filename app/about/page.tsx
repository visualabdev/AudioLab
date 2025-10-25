import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Users, Award, Headphones, Mic, Radio } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { label: "Beats Creados", value: "500+", icon: Music },
    { label: "Artistas Satisfechos", value: "1,200+", icon: Users },
    { label: "Años de Experiencia", value: "8+", icon: Award },
    { label: "Horas de Música", value: "10,000+", icon: Headphones }
  ]

  const team = [
    {
      name: "Alex Rodriguez",
      role: "Fundador & Productor Principal",
      description: "Con más de 10 años en la industria musical, Alex ha trabajado con artistas de renombre internacional.",
      skills: ["Hip Hop", "Trap", "R&B", "Pop"]
    },
    {
      name: "Maria Santos",
      role: "Productora & Sound Designer",
      description: "Especialista en sonidos electrónicos y diseño de audio, Maria aporta creatividad e innovación.",
      skills: ["Electronic", "Ambient", "Lo-Fi", "Experimental"]
    },
    {
      name: "David Chen",
      role: "Ingeniero de Mezcla",
      description: "Experto en mezcla y masterización, David asegura la calidad profesional de cada track.",
      skills: ["Mixing", "Mastering", "Audio Engineering"]
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black mb-6 animate-gradient-text">Sobre AudioLab</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Somos un estudio de producción musical dedicado a crear beats, samples y contenido MIDI de la más alta calidad. 
              Nuestra misión es empoderar a artistas y productores con herramientas musicales profesionales.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="glass-card border-primary/20 shadow-xl text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-black text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="glass-card border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Mic className="h-6 w-6 text-primary" />
                  Nuestra Historia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  AudioLab nació en 2016 de la pasión por la música y la tecnología. Lo que comenzó como un pequeño 
                  estudio casero se ha convertido en una plataforma reconocida mundialmente por la calidad de sus producciones.
                </p>
                <p>
                  Hemos trabajado con artistas emergentes y establecidos, proporcionando las herramientas musicales 
                  que necesitan para llevar su creatividad al siguiente nivel.
                </p>
                <p>
                  Nuestro enfoque siempre ha sido la calidad sobre la cantidad, asegurándonos de que cada beat, 
                  sample y archivo MIDI cumpla con los más altos estándares profesionales.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Radio className="h-6 w-6 text-primary" />
                  Nuestra Misión
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Democratizar la producción musical proporcionando acceso a contenido de calidad profesional 
                  a precios accesibles para artistas de todos los niveles.
                </p>
                <p>
                  Creemos que la música es un lenguaje universal y queremos ser el puente que conecte a los 
                  productores con las herramientas que necesitan para expresar su creatividad.
                </p>
                <p>
                  Nos comprometemos a mantener la innovación constante, explorando nuevos géneros y técnicas 
                  de producción para mantenernos a la vanguardia de la industria musical.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4">Nuestro Equipo</h2>
              <p className="text-xl text-muted-foreground">
                Conoce a los profesionales detrás de AudioLab
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="glass-card border-primary/20 shadow-xl">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      {member.description}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <Card className="glass-card border-primary/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-black">Nuestros Valores</CardTitle>
              <CardDescription className="text-lg">Los principios que guían nuestro trabajo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <Award className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold">Calidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Cada producción pasa por rigurosos controles de calidad para asegurar excelencia profesional.
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center">
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold">Comunidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Construimos una comunidad de artistas y productores que se apoyan mutuamente.
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                    <Music className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold">Innovación</h3>
                  <p className="text-sm text-muted-foreground">
                    Constantemente exploramos nuevos sonidos y técnicas para mantenernos a la vanguardia.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Check, X, Music, Users, Globe } from "lucide-react"

export default function LicensesPage() {
  const licenseFeatures = [
    {
      feature: "Uso comercial",
      basic: true,
      premium: true,
      exclusive: true
    },
    {
      feature: "Uso no comercial",
      basic: true,
      premium: true,
      exclusive: true
    },
    {
      feature: "Distribución digital",
      basic: true,
      premium: true,
      exclusive: true
    },
    {
      feature: "Streaming (Spotify, Apple Music, etc.)",
      basic: true,
      premium: true,
      exclusive: true
    },
    {
      feature: "Presentaciones en vivo",
      basic: true,
      premium: true,
      exclusive: true
    },
    {
      feature: "Sincronización con video",
      basic: false,
      premium: true,
      exclusive: true
    },
    {
      feature: "Radio y TV",
      basic: false,
      premium: true,
      exclusive: true
    },
    {
      feature: "Stems separados incluidos",
      basic: false,
      premium: true,
      exclusive: true
    },
    {
      feature: "Uso exclusivo (solo tú puedes usar el beat)",
      basic: false,
      premium: false,
      exclusive: true
    },
    {
      feature: "Derechos de autor transferidos",
      basic: false,
      premium: false,
      exclusive: true
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 animate-gradient-text">Acuerdo de Licencia</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprende los diferentes tipos de licencias disponibles y qué derechos obtienes con cada una
            </p>
          </div>

          {/* License Types Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="glass-card border-primary/20 shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Music className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Licencia Básica</CardTitle>
                <CardDescription>Perfecta para artistas independientes</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-black text-primary">Incluida</div>
                <p className="text-sm text-muted-foreground">
                  Con cada compra de beat o sample
                </p>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  Más Popular
                </Badge>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-2xl">Licencia Premium</CardTitle>
                <CardDescription>Para uso profesional y comercial</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-black text-primary">+$50</div>
                <p className="text-sm text-muted-foreground">
                  Upgrade disponible para cualquier beat
                </p>
                <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  Profesional
                </Badge>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle className="text-2xl">Licencia Exclusiva</CardTitle>
                <CardDescription>Derechos completos y exclusivos</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-black text-primary">Consultar</div>
                <p className="text-sm text-muted-foreground">
                  Precio personalizado según el beat
                </p>
                <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                  Exclusivo
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* License Comparison Table */}
          <Card className="glass-card border-primary/20 shadow-xl mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-primary" />
                Comparación de Licencias
              </CardTitle>
              <CardDescription>
                Revisa qué incluye cada tipo de licencia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold">Característica</th>
                      <th className="text-center p-4 font-semibold">Básica</th>
                      <th className="text-center p-4 font-semibold">Premium</th>
                      <th className="text-center p-4 font-semibold">Exclusiva</th>
                    </tr>
                  </thead>
                  <tbody>
                    {licenseFeatures.map((item, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="p-4 font-medium">{item.feature}</td>
                        <td className="p-4 text-center">
                          {item.basic ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {item.premium ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {item.exclusive ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Detailed License Terms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Términos Generales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Derechos Otorgados</h4>
                  <p>
                    Todas las licencias otorgan derechos no exclusivos, mundiales y perpetuos para usar el contenido 
                    en producciones musicales según los términos específicos de cada licencia.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Modificaciones Permitidas</h4>
                  <p>
                    Puedes editar, modificar, cortar, acelerar, ralentizar y adaptar el contenido según tus necesidades creativas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Créditos</h4>
                  <p>
                    Los créditos no son obligatorios pero son apreciados. Formato sugerido: "Produced by AudioLab" o "Beat by AudioLab".
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Restricciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Prohibiciones</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Revender el contenido original sin modificar</li>
                    <li>Reclamar autoría exclusiva del beat o sample</li>
                    <li>Crear bibliotecas de samples competidoras</li>
                    <li>Compartir archivos con terceros no autorizados</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Limitaciones de Responsabilidad</h4>
                  <p>
                    AudioLab no será responsable por reclamaciones de terceros relacionadas con el uso del contenido licenciado.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <Card className="glass-card border-primary/20 shadow-xl mt-12">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">¿Necesitas una Licencia Personalizada?</CardTitle>
              <CardDescription className="text-lg">
                Contacta nuestro equipo para discutir opciones de licencia específicas para tu proyecto
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Para proyectos especiales, uso en medios masivos, o necesidades específicas de licenciamiento, 
                podemos crear un acuerdo personalizado que se adapte a tus requerimientos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contacto" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Contactar Equipo Legal
                </a>
                <a 
                  href="mailto:licensing@audiolab.com" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary/20 text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  licensing@audiolab.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 animate-gradient-text">Términos de Servicio</h1>
            <p className="text-xl text-muted-foreground">
              Última actualización: 24 de octubre de 2025
            </p>
          </div>

          <Card className="glass-card border-primary/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ScrollText className="h-6 w-6 text-primary" />
                Términos y Condiciones de Uso
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">1. Aceptación de los Términos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al acceder y utilizar AudioLab ("el Servicio"), usted acepta estar sujeto a estos Términos de Servicio ("Términos"). 
                  Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">2. Descripción del Servicio</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AudioLab es una plataforma digital que proporciona beats, samples, archivos MIDI y otros contenidos musicales 
                  para uso en producciones musicales. Nuestro servicio incluye:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                  <li>Venta de beats instrumentales</li>
                  <li>Biblioteca de samples de audio</li>
                  <li>Archivos MIDI para composición</li>
                  <li>Licencias de uso para contenido musical</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">3. Licencias y Derechos de Uso</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Al comprar contenido de AudioLab, usted obtiene una licencia no exclusiva, libre de regalías para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                  <li>Usar el contenido en producciones musicales comerciales y no comerciales</li>
                  <li>Modificar, editar y adaptar el contenido según sus necesidades</li>
                  <li>Distribuir y vender música que incorpore nuestro contenido</li>
                  <li>Realizar presentaciones públicas de música que incluya nuestro contenido</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">4. Restricciones de Uso</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Está prohibido:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                  <li>Revender, redistribuir o sublicenciar el contenido original sin modificar</li>
                  <li>Reclamar autoría exclusiva del contenido adquirido</li>
                  <li>Usar el contenido para crear bibliotecas de samples competidoras</li>
                  <li>Compartir archivos descargados con terceros no autorizados</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">5. Pagos y Reembolsos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Los pagos se procesan de forma segura a través de nuestros proveedores certificados. Ofrecemos reembolsos 
                  completos dentro de los 7 días posteriores a la compra si no está satisfecho con su adquisición. 
                  Después de este período, no se procesarán reembolsos debido a la naturaleza digital de nuestros productos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">6. Propiedad Intelectual</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Todo el contenido disponible en AudioLab es propiedad de AudioLab o sus licenciantes. 
                  Los derechos de autor y otros derechos de propiedad intelectual permanecen con AudioLab, 
                  excepto por los derechos específicamente otorgados en la licencia de uso.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">7. Limitación de Responsabilidad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AudioLab no será responsable por daños indirectos, incidentales, especiales o consecuentes 
                  que resulten del uso o la imposibilidad de usar nuestro servicio. Nuestra responsabilidad 
                  total no excederá el monto pagado por el contenido específico en cuestión.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">8. Modificaciones de los Términos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                  Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro sitio web. 
                  El uso continuado del servicio después de dichas modificaciones constituye su aceptación de los nuevos términos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">9. Ley Aplicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estos términos se regirán e interpretarán de acuerdo con las leyes del estado de California, Estados Unidos, 
                  sin tener en cuenta sus disposiciones sobre conflictos de leyes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">10. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Si tiene preguntas sobre estos Términos de Servicio, puede contactarnos en:
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mt-3">
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> legal@audiolab.com<br />
                    <strong>Dirección:</strong> AudioLab Studios, Los Angeles, CA, Estados Unidos
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
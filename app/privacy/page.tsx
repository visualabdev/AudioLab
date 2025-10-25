import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 animate-gradient-text">Política de Privacidad</h1>
            <p className="text-xl text-muted-foreground">
              Última actualización: 24 de octubre de 2025
            </p>
          </div>

          <Card className="glass-card border-primary/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-primary" />
                Compromiso con su Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">1. Información que Recopilamos</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Recopilamos información que usted nos proporciona directamente y información que se recopila automáticamente 
                  cuando utiliza nuestros servicios:
                </p>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">Información Personal</h3>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1 mb-4">
                  <li>Nombre y dirección de correo electrónico</li>
                  <li>Información de facturación y pago</li>
                  <li>Historial de compras y descargas</li>
                  <li>Comunicaciones con nuestro equipo de soporte</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-2">Información Técnica</h3>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                  <li>Dirección IP y ubicación geográfica</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Páginas visitadas y tiempo de navegación</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">2. Cómo Utilizamos su Información</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                  <li>Procesar y completar sus transacciones</li>
                  <li>Proporcionar acceso a contenido descargado</li>
                  <li>Enviar confirmaciones de compra y actualizaciones de cuenta</li>
                  <li>Mejorar nuestros servicios y experiencia de usuario</li>
                  <li>Prevenir fraude y garantizar la seguridad</li>
                  <li>Cumplir con obligaciones legales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">3. Compartir Información</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  No vendemos, alquilamos o compartimos su información personal con terceros, excepto en las siguientes circunstancias:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                  <li><strong>Proveedores de servicios:</strong> Compartimos información con proveedores que nos ayudan a operar nuestro negocio</li>
                  <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos</li>
                  <li><strong>Transferencias comerciales:</strong> En caso de fusión, adquisición o venta de activos</li>
                  <li><strong>Con su consentimiento:</strong> Cuando usted nos autorice específicamente</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">4. Seguridad de Datos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger su información personal 
                  contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye encriptación SSL, 
                  servidores seguros y acceso restringido a información personal.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">5. Cookies y Tecnologías de Seguimiento</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Utilizamos cookies y tecnologías similares para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                  <li>Recordar sus preferencias y configuraciones</li>
                  <li>Analizar el tráfico y uso del sitio web</li>
                  <li>Personalizar contenido y anuncios</li>
                  <li>Mejorar la funcionalidad del sitio</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Puede controlar las cookies a través de la configuración de su navegador, aunque esto puede afectar 
                  la funcionalidad de nuestro sitio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">6. Sus Derechos</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Dependiendo de su ubicación, puede tener los siguientes derechos:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                  <li><strong>Acceso:</strong> Solicitar una copia de la información personal que tenemos sobre usted</li>
                  <li><strong>Rectificación:</strong> Solicitar la corrección de información inexacta</li>
                  <li><strong>Eliminación:</strong> Solicitar la eliminación de su información personal</li>
                  <li><strong>Portabilidad:</strong> Solicitar la transferencia de sus datos a otro servicio</li>
                  <li><strong>Objeción:</strong> Oponerse al procesamiento de su información personal</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">7. Retención de Datos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Conservamos su información personal durante el tiempo necesario para cumplir con los propósitos descritos 
                  en esta política, a menos que la ley requiera o permita un período de retención más largo. 
                  Los datos de transacciones se conservan según los requisitos legales y contables aplicables.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">8. Transferencias Internacionales</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Su información puede ser transferida y procesada en países distintos al suyo. 
                  Nos aseguramos de que dichas transferencias cumplan con las leyes de protección de datos aplicables 
                  y que se implementen las salvaguardas adecuadas.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">9. Menores de Edad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nuestros servicios no están dirigidos a menores de 13 años. No recopilamos conscientemente información 
                  personal de menores de 13 años. Si descubrimos que hemos recopilado información de un menor, 
                  la eliminaremos inmediatamente.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">10. Cambios a esta Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre cambios significativos 
                  publicando la nueva política en nuestro sitio web y actualizando la fecha de "última actualización".
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">11. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, puede contactarnos:
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mt-3">
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> privacy@audiolab.com<br />
                    <strong>Dirección:</strong> AudioLab Studios, Los Angeles, CA, Estados Unidos<br />
                    <strong>Teléfono:</strong> +1 (555) 123-4567
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
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Music, Download, CreditCard, Shield, Headphones } from "lucide-react"

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Compras y Pagos",
      icon: CreditCard,
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500",
      faqs: [
        {
          question: "¿Qué métodos de pago aceptan?",
          answer: "Aceptamos todas las tarjetas de crédito principales (Visa, MasterCard, American Express), PayPal, y transferencias bancarias. Todos los pagos son procesados de forma segura a través de nuestros proveedores certificados."
        },
        {
          question: "¿Puedo obtener un reembolso?",
          answer: "Ofrecemos reembolsos completos dentro de los primeros 7 días después de la compra si no estás satisfecho con tu compra. Después de este período, no podemos procesar reembolsos debido a la naturaleza digital de nuestros productos."
        },
        {
          question: "¿Los precios incluyen impuestos?",
          answer: "Los precios mostrados pueden no incluir impuestos locales dependiendo de tu ubicación. Los impuestos aplicables se calcularán automáticamente durante el proceso de checkout."
        },
        {
          question: "¿Ofrecen descuentos por volumen?",
          answer: "Sí, ofrecemos descuentos especiales para compras de múltiples tracks. También tenemos paquetes y ofertas especiales que se anuncian regularmente en nuestro sitio web y redes sociales."
        }
      ]
    },
    {
      title: "Licencias y Uso",
      icon: Shield,
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
      faqs: [
        {
          question: "¿Qué tipo de licencia obtengo al comprar?",
          answer: "Todas nuestras compras incluyen una licencia libre de regalías que te permite usar el contenido en proyectos comerciales y no comerciales. Esto significa que puedes usar los beats, samples o MIDIs en tus canciones sin pagar regalías adicionales."
        },
        {
          question: "¿Puedo usar los beats en proyectos comerciales?",
          answer: "Sí, absolutamente. Nuestra licencia estándar permite el uso comercial completo, incluyendo ventas de álbumes, streaming, presentaciones en vivo, y sincronización con video."
        },
        {
          question: "¿Hay límites en el número de copias que puedo vender?",
          answer: "No hay límites en el número de copias que puedes vender o distribuir de tu música que incorpore nuestros beats, samples o MIDIs."
        },
        {
          question: "¿Necesito acreditar a AudioLab?",
          answer: "La acreditación no es requerida pero es muy apreciada. Si decides acreditarnos, puedes usar 'Produced by AudioLab' o 'Beat by AudioLab'."
        }
      ]
    },
    {
      title: "Descargas y Formatos",
      icon: Download,
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
      faqs: [
        {
          question: "¿En qué formatos están disponibles los archivos?",
          answer: "Los beats están disponibles en MP3 (320kbps) y WAV (24-bit/44.1kHz). Los samples vienen en WAV de alta calidad, y los archivos MIDI están en formato .mid estándar compatible con todos los DAWs."
        },
        {
          question: "¿Cómo descargo mis compras?",
          answer: "Después de completar tu compra, recibirás un email con enlaces de descarga. También puedes acceder a tus compras desde tu cuenta en nuestro sitio web en cualquier momento."
        },
        {
          question: "¿Por cuánto tiempo están disponibles las descargas?",
          answer: "Los enlaces de descarga están disponibles de forma permanente en tu cuenta. Recomendamos descargar y respaldar tus archivos inmediatamente después de la compra."
        },
        {
          question: "¿Puedo re-descargar mis compras?",
          answer: "Sí, puedes re-descargar cualquier compra anterior desde tu cuenta en cualquier momento sin costo adicional."
        }
      ]
    },
    {
      title: "Calidad y Producción",
      icon: Headphones,
      color: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500",
      faqs: [
        {
          question: "¿Qué calidad tienen los beats y samples?",
          answer: "Todos nuestros beats y samples son producidos en estudios profesionales con equipos de alta gama. Los archivos WAV son de 24-bit/44.1kHz o superior, asegurando la máxima calidad de audio."
        },
        {
          question: "¿Los beats vienen con stems separados?",
          answer: "Algunos de nuestros beats premium incluyen stems separados (batería, bajo, melodía, etc.). Esto se indica claramente en la descripción del producto."
        },
        {
          question: "¿Puedo solicitar modificaciones a un beat?",
          answer: "Ofrecemos servicios de personalización para beats por un costo adicional. Contacta nuestro equipo para discutir tus necesidades específicas y obtener una cotización."
        },
        {
          question: "¿Cómo aseguran la originalidad?",
          answer: "Todos nuestros beats, samples y MIDIs son creaciones originales de nuestro equipo de productores. No utilizamos samples con derechos de autor de terceros sin la debida autorización."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 animate-gradient-text">Preguntas Frecuentes</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <Card key={categoryIndex} className="glass-card border-primary/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                        <Icon className={`h-6 w-6 ${category.iconColor}`} />
                      </div>
                      {category.title}
                    </CardTitle>
                    <CardDescription>
                      Información importante sobre {category.title.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Contact Section */}
          <Card className="glass-card border-primary/20 shadow-xl mt-12">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <HelpCircle className="h-6 w-6 text-primary" />
                ¿No encuentras tu respuesta?
              </CardTitle>
              <CardDescription className="text-lg">
                Nuestro equipo de soporte está aquí para ayudarte
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Si no pudiste encontrar la respuesta a tu pregunta, no dudes en contactarnos. 
                Nuestro equipo de soporte responde típicamente dentro de 24 horas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contacto" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Contactar Soporte
                </a>
                <a 
                  href="mailto:support@audiolab.com" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary/20 text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  support@audiolab.com
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
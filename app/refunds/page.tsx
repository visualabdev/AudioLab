import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Clock, CheckCircle, XCircle, AlertCircle, Mail } from "lucide-react"

export default function RefundsPage() {
  const refundProcess = [
    {
      step: 1,
      title: "Solicitud de Reembolso",
      description: "Contacta nuestro equipo dentro de los 7 días posteriores a la compra",
      icon: Mail,
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500"
    },
    {
      step: 2,
      title: "Revisión del Caso",
      description: "Nuestro equipo revisa tu solicitud y verifica la elegibilidad",
      icon: AlertCircle,
      color: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-500"
    },
    {
      step: 3,
      title: "Procesamiento",
      description: "Si es aprobado, procesamos el reembolso a tu método de pago original",
      icon: RefreshCw,
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500"
    },
    {
      step: 4,
      title: "Confirmación",
      description: "Recibes confirmación y el reembolso aparece en 3-5 días hábiles",
      icon: CheckCircle,
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500"
    }
  ]

  const eligibleReasons = [
    "Problemas técnicos con la descarga",
    "Archivo corrupto o dañado",
    "Contenido significativamente diferente a la descripción",
    "Cargos duplicados o no autorizados",
    "Problemas de calidad de audio"
  ]

  const nonEligibleReasons = [
    "Cambio de opinión después de 7 días",
    "Uso del contenido en una producción",
    "Descarga exitosa del archivo",
    "Diferencias menores en expectativas",
    "Problemas con software de terceros"
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 animate-gradient-text">Política de Reembolsos</h1>
            <p className="text-xl text-muted-foreground">
              Información completa sobre nuestros procesos de reembolso y garantías
            </p>
          </div>

          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card border-primary/20 shadow-xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">7 Días</h3>
                <p className="text-sm text-muted-foreground">Período de garantía para solicitar reembolsos</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 shadow-xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">3-5 Días</h3>
                <p className="text-sm text-muted-foreground">Tiempo de procesamiento del reembolso</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 shadow-xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">100%</h3>
                <p className="text-sm text-muted-foreground">Reembolso completo si cumples los criterios</p>
              </CardContent>
            </Card>
          </div>

          {/* Refund Process */}
          <Card className="glass-card border-primary/20 shadow-xl mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <RefreshCw className="h-6 w-6 text-primary" />
                Proceso de Reembolso
              </CardTitle>
              <CardDescription>
                Sigue estos pasos para solicitar un reembolso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {refundProcess.map((step) => {
                  const Icon = step.icon
                  return (
                    <div key={step.step} className="text-center space-y-4">
                      <div className="relative">
                        <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                          <Icon className={`h-8 w-8 ${step.iconColor}`} />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Eligibility Criteria */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="glass-card border-green-500/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-green-500">
                  <CheckCircle className="h-5 w-5" />
                  Razones Elegibles para Reembolso
                </CardTitle>
                <CardDescription>
                  Situaciones en las que garantizamos el reembolso completo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {eligibleReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{reason}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-red-500/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-red-500">
                  <XCircle className="h-5 w-5" />
                  Razones No Elegibles
                </CardTitle>
                <CardDescription>
                  Situaciones en las que no podemos procesar reembolsos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {nonEligibleReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{reason}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Important Information */}
          <Card className="glass-card border-primary/20 shadow-xl mb-12">
            <CardHeader>
              <CardTitle className="text-xl">Información Importante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Período de Garantía
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tienes 7 días calendario desde la fecha de compra para solicitar un reembolso. 
                  Después de este período, no podemos procesar reembolsos debido a la naturaleza digital de nuestros productos.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-500" />
                  Método de Reembolso
                </h3>
                <p className="text-sm text-muted-foreground">
                  Los reembolsos se procesan al método de pago original utilizado para la compra. 
                  Los tiempos de procesamiento pueden variar según tu banco o proveedor de pagos.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Garantía de Calidad
                </h3>
                <p className="text-sm text-muted-foreground">
                  Todos nuestros productos pasan por controles de calidad rigurosos. Si encuentras algún problema técnico 
                  o de calidad, lo resolveremos inmediatamente o te ofreceremos un reembolso completo.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="glass-card border-primary/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">¿Necesitas Solicitar un Reembolso?</CardTitle>
              <CardDescription className="text-lg">
                Contacta nuestro equipo de soporte para iniciar el proceso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  Para solicitar un reembolso, proporciona la siguiente información:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
                  <div className="space-y-2">
                    <p>• Número de orden o ID de transacción</p>
                    <p>• Email usado para la compra</p>
                    <p>• Fecha de la compra</p>
                  </div>
                  <div className="space-y-2">
                    <p>• Nombre del producto</p>
                    <p>• Razón del reembolso</p>
                    <p>• Capturas de pantalla (si aplica)</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contacto" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contactar Soporte
                </a>
                <a 
                  href="mailto:refunds@audiolab.com" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary/20 text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  refunds@audiolab.com
                </a>
              </div>

              <div className="text-center">
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  Respuesta típica en 24 horas
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
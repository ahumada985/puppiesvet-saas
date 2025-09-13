'use client'

import { useState } from 'react'
import { Button } from './button'
import { X } from 'lucide-react'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const demoSteps = [
    {
      title: "Chatbot Inteligente",
      description: "Ve cómo nuestro chatbot resuelve consultas complejas en tiempo real",
      content: (
        <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
          <div className="space-y-3">
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-lg px-3 py-2 max-w-xs">
                Hola, necesito ayuda con mi pedido #12345
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2 max-w-xs">
                ¡Hola! Veo que tienes un pedido pendiente. Te ayudo a revisarlo. 
                Tu pedido está en proceso de envío y llegará mañana entre 14:00-16:00.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-lg px-3 py-2 max-w-xs">
                ¿Puedo cambiar la dirección de entrega?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2 max-w-xs">
                Por supuesto. Te envío un enlace para actualizar la dirección. 
                Solo tienes 2 horas para hacer el cambio antes del envío.
              </div>
            </div>
          </div>
        </div>
      )
    },
         {
       title: "Asistente de Ventas IA",
       description: "Ve cómo nuestro asistente optimiza conversiones y genera leads calificados",
       content: (
         <div className="bg-gray-50 rounded-lg p-4 h-64">
           <div className="space-y-4">
             <div className="bg-white rounded-lg p-3 border">
               <h4 className="font-semibold text-sm mb-2">Lead Calificado:</h4>
               <div className="space-y-2">
                 <div className="flex justify-between text-xs">
                   <span className="text-gray-600">Empresa:</span>
                   <span className="font-semibold">Taller Mecánico Central</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="text-gray-600">Score:</span>
                   <span className="font-bold text-green-600">92/100</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="text-gray-600">Probabilidad:</span>
                   <span className="font-bold text-blue-600">87%</span>
                 </div>
               </div>
             </div>
             <div className="bg-white rounded-lg p-3 border">
               <h4 className="font-semibold text-sm mb-2">Recomendaciones IA:</h4>
               <div className="space-y-2 text-xs">
                 <div className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                   <span>Contactar en horario de mañana (9-11 AM)</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                   <span>Enfocar en automatización de inventario</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                   <span>Presupuesto estimado: $2,500-4,000</span>
                 </div>
               </div>
             </div>
             <div className="bg-white rounded-lg p-3 border">
               <h4 className="font-semibold text-sm mb-2">Métricas de Conversión:</h4>
               <div className="grid grid-cols-3 gap-2 text-xs">
                 <div className="text-center">
                   <div className="font-bold text-green-600">+45%</div>
                   <div className="text-gray-500">Tasa de Conversión</div>
                 </div>
                 <div className="text-center">
                   <div className="font-bold text-blue-600">-30%</div>
                   <div className="text-gray-500">Tiempo de Cierre</div>
                 </div>
                 <div className="text-center">
                   <div className="font-bold text-purple-600">+60%</div>
                   <div className="text-gray-500">Valor del Ticket</div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )
     },
    {
      title: "Dashboard de Analytics",
      description: "Visualiza métricas clave de tu negocio en tiempo real",
      content: (
        <div className="bg-gray-50 rounded-lg p-4 h-64">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="bg-white rounded-lg p-3 border">
              <h4 className="font-semibold text-sm mb-2">Ventas Hoy</h4>
              <div className="text-2xl font-bold text-green-600">$24,580</div>
              <div className="text-xs text-gray-500">+12% vs ayer</div>
              <div className="mt-2 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded"></div>
            </div>
            <div className="bg-white rounded-lg p-3 border">
              <h4 className="font-semibold text-sm mb-2">Clientes Nuevos</h4>
              <div className="text-2xl font-bold text-blue-600">47</div>
              <div className="text-xs text-gray-500">+8% vs ayer</div>
              <div className="mt-2 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
            </div>
            <div className="bg-white rounded-lg p-3 border col-span-2">
              <h4 className="font-semibold text-sm mb-2">Productos Más Vendidos</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Producto A</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-sm font-semibold">85%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Producto B</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '72%'}}></div>
                    </div>
                    <span className="text-sm font-semibold">72%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Demo en Vivo</h2>
            <p className="text-gray-600">Descubre cómo funciona nuestra IA</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {demoSteps[currentStep].title}
            </h3>
            <p className="text-gray-600">
              {demoSteps[currentStep].description}
            </p>
          </div>

          {/* Demo Content */}
          <div className="mb-6">
            {demoSteps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep ? 'bg-violet-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Anterior
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
                disabled={currentStep === demoSteps.length - 1}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Paso {currentStep + 1} de {demoSteps.length}
            </p>
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            >
              Solicitar Demo Completo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

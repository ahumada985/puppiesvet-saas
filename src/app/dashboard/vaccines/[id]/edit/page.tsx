'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft,
  Save,
  Shield,
  Calendar,
  Hash,
  User,
  Check,
  PawPrint
} from "lucide-react"
import Link from "next/link"
import { useParams } from 'next/navigation'

interface Vaccine {
  id: string
  name: string
  vaccinationDate: string
  nextVaccinationDate: string
  veterinarian: string
  batchNumber?: string
  petName: string
  petId: string
}

const vaccineTypes = [
  'Antirrábica',
  'Sextuple',
  'Trivalente Felina',
  'Pentavalente',
  'Bordetella',
  'Leishmania',
  'Giardia',
  'Otra'
]

const veterinarians = [
  'Dr. Carlos Mendez',
  'Dr. Ana Silva',
  'Dr. Roberto García',
  'Dr. María López',
  'Dr. Juan Pérez'
]

export default function EditVaccinePage() {
  const params = useParams()
  const vaccineId = params.id as string
  const [formData, setFormData] = useState({
    name: '',
    vaccinationDate: '',
    nextVaccinationDate: '',
    veterinarian: '',
    batchNumber: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [vaccine, setVaccine] = useState<Vaccine | null>(null)

  // Cargar datos de la vacuna
  useEffect(() => {
    const mockVaccines: Vaccine[] = [
      {
        id: '1',
        name: 'Antirrábica',
        vaccinationDate: '2024-01-10',
        nextVaccinationDate: '2025-01-10',
        veterinarian: 'Dr. Carlos Mendez',
        batchNumber: 'RAB2024001',
        petName: 'Max',
        petId: '1'
      },
      {
        id: '2',
        name: 'Sextuple',
        vaccinationDate: '2024-02-15',
        nextVaccinationDate: '2024-08-15',
        veterinarian: 'Dr. Carlos Mendez',
        batchNumber: 'SEX2024002',
        petName: 'Max',
        petId: '1'
      },
      {
        id: '3',
        name: 'Trivalente Felina',
        vaccinationDate: '2024-01-20',
        nextVaccinationDate: '2024-07-20',
        veterinarian: 'Dr. Ana Silva',
        batchNumber: 'TRIV2024003',
        petName: 'Luna',
        petId: '2'
      }
    ]

    const foundVaccine = mockVaccines.find(v => v.id === vaccineId)
    if (foundVaccine) {
      setVaccine(foundVaccine)
      setFormData({
        name: foundVaccine.name,
        vaccinationDate: foundVaccine.vaccinationDate,
        nextVaccinationDate: foundVaccine.nextVaccinationDate,
        veterinarian: foundVaccine.veterinarian,
        batchNumber: foundVaccine.batchNumber || ''
      })
    }
  }, [vaccineId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
      window.location.href = `/dashboard/pets/${vaccine?.petId}`
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateNextVaccination = (vaccinationDate: string, vaccineName: string) => {
    if (!vaccinationDate) return ''
    
    const date = new Date(vaccinationDate)
    let monthsToAdd = 12 // Por defecto 1 año
    
    // Diferentes vacunas tienen diferentes intervalos
    switch (vaccineName) {
      case 'Sextuple':
      case 'Trivalente Felina':
        monthsToAdd = 6
        break
      case 'Bordetella':
        monthsToAdd = 12
        break
      case 'Antirrábica':
        monthsToAdd = 12
        break
      default:
        monthsToAdd = 12
    }
    
    date.setMonth(date.getMonth() + monthsToAdd)
    return date.toISOString().split('T')[0]
  }

  const handleVaccinationDateChange = (date: string) => {
    setFormData(prev => ({
      ...prev,
      vaccinationDate: date,
      nextVaccinationDate: calculateNextVaccination(date, prev.name)
    }))
  }

  const handleVaccineNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      nextVaccinationDate: calculateNextVaccination(prev.vaccinationDate, name)
    }))
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Vacuna Actualizada!</h2>
            <p className="text-gray-600 mb-6">Los datos de la vacuna han sido actualizados exitosamente.</p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-gray-500 mt-4">Redirigiendo...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!vaccine) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vacuna no encontrada</h2>
            <p className="text-gray-600 mb-6">La vacuna que buscas no existe en el sistema.</p>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Volver al Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/dashboard/pets/${vaccine.petId}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Editar Vacuna</h1>
                <p className="text-gray-600">Modifica la información de la vacuna de {vaccine.petName}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Editar Vacuna</CardTitle>
              <CardDescription>
                Modifica los datos de la vacuna {vaccine.name} de {vaccine.petName}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Vacuna *
                    </label>
                    <select
                      value={formData.name}
                      onChange={(e) => handleVaccineNameChange(e.target.value)}
                      className="w-full h-12 px-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      {vaccineTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de Aplicación *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="date"
                        value={formData.vaccinationDate}
                        onChange={(e) => handleVaccinationDateChange(e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Próxima Vacunación *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="date"
                        value={formData.nextVaccinationDate}
                        onChange={(e) => handleInputChange('nextVaccinationDate', e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Veterinario *
                    </label>
                    <select
                      value={formData.veterinarian}
                      onChange={(e) => handleInputChange('veterinarian', e.target.value)}
                      className="w-full h-12 px-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      {veterinarians.map(vet => (
                        <option key={vet} value={vet}>{vet}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Número de Lote
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Ej: RAB2024001"
                        value={formData.batchNumber}
                        onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      💉
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {formData.name || 'Tipo de Vacuna'}
                      </h4>
                      <p className="text-gray-600">Mascota: {vaccine.petName}</p>
                      <p className="text-gray-600">
                        Aplicada: {formData.vaccinationDate ? new Date(formData.vaccinationDate).toLocaleDateString() : 'Fecha no seleccionada'}
                      </p>
                      <p className="text-gray-600">
                        Próxima: {formData.nextVaccinationDate ? new Date(formData.nextVaccinationDate).toLocaleDateString() : 'Fecha no calculada'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Link href={`/dashboard/pets/${vaccine.petId}`}>
                    <Button variant="outline" type="button" className="h-12 px-8 rounded-xl">
                      Cancelar
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.vaccinationDate || !formData.nextVaccinationDate || !formData.veterinarian}
                    className="h-12 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Actualizar Vacuna
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

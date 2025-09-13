'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Edit,
  Plus,
  Calendar,
  Shield,
  Heart,
  User,
  Hash,
  PawPrint,
  Clock,
  Stethoscope
} from "lucide-react"
import Link from "next/link"
import { useParams } from 'next/navigation'

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  birthDate: string
  gender: string
  color: string
  microchipId?: string
  clientId: string
  clientName: string
  vaccines: Vaccine[]
  medicalRecords: MedicalRecord[]
}

interface Vaccine {
  id: string
  name: string
  vaccinationDate: string
  nextVaccinationDate: string
  veterinarian: string
  batchNumber?: string
}

interface MedicalRecord {
  id: string
  date: string
  diagnosis: string
  treatment: string
  notes?: string
  veterinarian: string
}

export default function PetDetailPage() {
  const params = useParams()
  const petId = params.id as string
  const [pet, setPet] = useState<Pet | null>(null)
  const [activeTab, setActiveTab] = useState<'info' | 'vaccines' | 'history'>('info')

  // Datos de ejemplo
  useEffect(() => {
    const mockPets: Pet[] = [
      {
        id: '1',
        name: 'Max',
        species: 'Perro',
        breed: 'Golden Retriever',
        birthDate: '2022-03-15',
        gender: 'Macho',
        color: 'Dorado',
        microchipId: 'CHIP001',
        clientId: '1',
        clientName: 'María González',
        vaccines: [
          {
            id: '1',
            name: 'Antirrábica',
            vaccinationDate: '2024-01-10',
            nextVaccinationDate: '2025-01-10',
            veterinarian: 'Dr. Carlos Mendez',
            batchNumber: 'RAB2024001'
          },
          {
            id: '2',
            name: 'Sextuple',
            vaccinationDate: '2024-02-15',
            nextVaccinationDate: '2024-08-15',
            veterinarian: 'Dr. Carlos Mendez',
            batchNumber: 'SEX2024002'
          }
        ],
        medicalRecords: [
          {
            id: '1',
            date: '2024-03-10',
            diagnosis: 'Control de rutina',
            treatment: 'Vacunación y desparasitación',
            notes: 'Animal en buen estado general',
            veterinarian: 'Dr. Carlos Mendez'
          },
          {
            id: '2',
            date: '2024-02-15',
            diagnosis: 'Vacunación anual',
            treatment: 'Aplicación de vacuna sextuple',
            notes: 'Sin reacciones adversas',
            veterinarian: 'Dr. Carlos Mendez'
          }
        ]
      },
      {
        id: '2',
        name: 'Luna',
        species: 'Gato',
        breed: 'Siamés',
        birthDate: '2023-06-10',
        gender: 'Hembra',
        color: 'Blanco y marrón',
        microchipId: 'CHIP002',
        clientId: '2',
        clientName: 'Juan Pérez',
        vaccines: [
          {
            id: '3',
            name: 'Trivalente Felina',
            vaccinationDate: '2024-01-20',
            nextVaccinationDate: '2024-07-20',
            veterinarian: 'Dr. Ana Silva',
            batchNumber: 'TRIV2024003'
          }
        ],
        medicalRecords: [
          {
            id: '3',
            date: '2024-02-15',
            diagnosis: 'Esterilización',
            treatment: 'Cirugía de esterilización',
            notes: 'Procedimiento exitoso, recuperación normal',
            veterinarian: 'Dr. Ana Silva'
          }
        ]
      }
    ]

    const foundPet = mockPets.find(p => p.id === petId)
    setPet(foundPet || null)
  }, [petId])

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate)
    const today = new Date()
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth())
    
    if (ageInMonths < 12) {
      return `${ageInMonths} meses`
    } else {
      const years = Math.floor(ageInMonths / 12)
      const months = ageInMonths % 12
      return months > 0 ? `${years} años y ${months} meses` : `${years} años`
    }
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PawPrint className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mascota no encontrada</h2>
            <p className="text-gray-600 mb-6">La mascota que buscas no existe en el sistema.</p>
            <Link href="/dashboard/pets">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Volver a Mascotas
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
              <Link href="/dashboard/pets" className="text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{pet.name}</h1>
                <p className="text-gray-600">Historial completo de la mascota</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/pets/${pet.id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Link>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Consulta
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Pet Info Card */}
          <Card className="border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl flex items-center justify-center text-5xl shadow-lg">
                  {pet.species === 'Perro' ? '🐕' : '🐱'}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{pet.name}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600"><strong>Especie:</strong> {pet.species}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600"><strong>Raza:</strong> {pet.breed}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600"><strong>Edad:</strong> {calculateAge(pet.birthDate)}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-600"><strong>Género:</strong> {pet.gender}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-gray-600"><strong>Color:</strong> {pet.color}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-gray-600"><strong>Dueño:</strong> {pet.clientName}</span>
                      </div>
                    </div>
                  </div>

                  {pet.microchipId && (
                    <div className="flex items-center space-x-2 mb-4">
                      <Hash className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600"><strong>Microchip:</strong> {pet.microchipId}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Shield className="w-3 h-3 mr-1" />
                      {pet.vaccines.length} vacuna{pet.vaccines.length !== 1 ? 's' : ''}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Heart className="w-3 h-3 mr-1" />
                      {pet.medicalRecords.length} consulta{pet.medicalRecords.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-white rounded-xl p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === 'info'
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Información</span>
            </button>
            <button
              onClick={() => setActiveTab('vaccines')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === 'vaccines'
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Vacunas</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Historial Médico</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'info' && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Información General
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Datos Básicos</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Nombre:</span>
                        <span className="font-medium">{pet.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Especie:</span>
                        <span className="font-medium">{pet.species}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Raza:</span>
                        <span className="font-medium">{pet.breed}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Fecha de Nacimiento:</span>
                        <span className="font-medium">{new Date(pet.birthDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Características</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Género:</span>
                        <span className="font-medium">{pet.gender}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium">{pet.color}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Edad:</span>
                        <span className="font-medium">{calculateAge(pet.birthDate)}</span>
                      </div>
                      {pet.microchipId && (
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Microchip:</span>
                          <span className="font-medium">{pet.microchipId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'vaccines' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Vacunas</h2>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Vacuna
                </Button>
              </div>

              {pet.vaccines.length > 0 ? (
                <div className="grid gap-6">
                  {pet.vaccines.map((vaccine) => (
                    <Card key={vaccine.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                              <Shield className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">{vaccine.name}</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Aplicada:</span> {new Date(vaccine.vaccinationDate).toLocaleDateString()}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Próxima:</span> {new Date(vaccine.nextVaccinationDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Veterinario:</span> {vaccine.veterinarian}
                                  </p>
                                  {vaccine.batchNumber && (
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">Lote:</span> {vaccine.batchNumber}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/vaccines/${vaccine.id}/edit`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay vacunas registradas</h3>
                    <p className="text-gray-600 mb-6">Esta mascota aún no tiene vacunas registradas en el sistema.</p>
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Primera Vacuna
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Historial Médico</h2>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Consulta
                </Button>
              </div>

              {pet.medicalRecords.length > 0 ? (
                <div className="grid gap-6">
                  {pet.medicalRecords.map((record) => (
                    <Card key={record.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                              <Stethoscope className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">{record.diagnosis}</h3>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(record.date).toLocaleDateString()}
                                </Badge>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1">Tratamiento:</p>
                                  <p className="text-gray-600">{record.treatment}</p>
                                </div>
                                {record.notes && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-700 mb-1">Notas:</p>
                                    <p className="text-gray-600">{record.notes}</p>
                                  </div>
                                )}
                                <div className="flex items-center space-x-2">
                                  <User className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-600">Veterinario: {record.veterinarian}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay historial médico</h3>
                    <p className="text-gray-600 mb-6">Esta mascota aún no tiene consultas registradas en el sistema.</p>
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Primera Consulta
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

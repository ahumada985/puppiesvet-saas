'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  PawPrint, 
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Shield,
  Heart,
  Users,
  Filter
} from "lucide-react"
import Link from "next/link"

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
}

interface MedicalRecord {
  id: string
  date: string
  diagnosis: string
  treatment: string
  veterinarian: string
}

export default function PetsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecies, setFilterSpecies] = useState('all')

  // Datos de ejemplo
  const pets: Pet[] = [
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
          veterinarian: 'Dr. Carlos Mendez'
        },
        {
          id: '2',
          name: 'Sextuple',
          vaccinationDate: '2024-02-15',
          nextVaccinationDate: '2024-08-15',
          veterinarian: 'Dr. Carlos Mendez'
        }
      ],
      medicalRecords: [
        {
          id: '1',
          date: '2024-03-10',
          diagnosis: 'Control de rutina',
          treatment: 'Vacunación y desparasitación',
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
          veterinarian: 'Dr. Ana Silva'
        }
      ],
      medicalRecords: [
        {
          id: '2',
          date: '2024-02-15',
          diagnosis: 'Esterilización',
          treatment: 'Cirugía de esterilización',
          veterinarian: 'Dr. Ana Silva'
        }
      ]
    },
    {
      id: '3',
      name: 'Bobby',
      species: 'Perro',
      breed: 'Labrador',
      birthDate: '2021-12-05',
      gender: 'Macho',
      color: 'Negro',
      microchipId: 'CHIP003',
      clientId: '3',
      clientName: 'Ana Rodríguez',
      vaccines: [
        {
          id: '4',
          name: 'Antirrábica',
          vaccinationDate: '2024-03-01',
          nextVaccinationDate: '2025-03-01',
          veterinarian: 'Dr. Carlos Mendez'
        }
      ],
      medicalRecords: [
        {
          id: '3',
          date: '2024-03-01',
          diagnosis: 'Control anual',
          treatment: 'Vacunación y examen general',
          veterinarian: 'Dr. Carlos Mendez'
        }
      ]
    },
    {
      id: '4',
      name: 'Mimi',
      species: 'Gato',
      breed: 'Persa',
      birthDate: '2023-08-20',
      gender: 'Hembra',
      color: 'Gris',
      microchipId: 'CHIP004',
      clientId: '3',
      clientName: 'Ana Rodríguez',
      vaccines: [],
      medicalRecords: [
        {
          id: '4',
          date: '2024-02-28',
          diagnosis: 'Primera consulta',
          treatment: 'Examen general y desparasitación',
          veterinarian: 'Dr. Ana Silva'
        }
      ]
    }
  ]

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecies = filterSpecies === 'all' || pet.species === filterSpecies
    
    return matchesSearch && matchesSpecies
  })

  const species = [...new Set(pets.map(pet => pet.species))]

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
                ← Volver al Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/dashboard/pets/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Mascota
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Mascotas</h1>
          <p className="text-gray-600">Administra el historial médico y vacunas de todas las mascotas</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar mascotas, dueños, razas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterSpecies}
              onChange={(e) => setFilterSpecies(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas las especies</option>
              {species.map(specie => (
                <option key={specie} value={specie}>{specie}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mascotas</CardTitle>
              <PawPrint className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pets.length}</div>
              <p className="text-xs text-muted-foreground">
                {pets.filter(p => p.species === 'Perro').length} perros, {pets.filter(p => p.species === 'Gato').length} gatos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacunas Pendientes</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {pets.flatMap(pet => pet.vaccines).filter(vaccine => 
                  new Date(vaccine.nextVaccinationDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Próximos 30 días
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas Recientes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {pets.flatMap(pet => pet.medicalRecords).filter(record => 
                  new Date(record.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Últimos 7 días
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(pets.map(pet => pet.clientId)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Con mascotas registradas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pets List */}
        <div className="grid gap-6">
          {filteredPets.map((pet) => (
            <Card key={pet.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <PawPrint className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{pet.name}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Especie:</span> {pet.species}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Raza:</span> {pet.breed}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Edad:</span> {calculateAge(pet.birthDate)}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Género:</span> {pet.gender}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Color:</span> {pet.color}
                          </p>
                          {pet.microchipId && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Microchip:</span> {pet.microchipId}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>Dueño: {pet.clientName}</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Shield className="w-3 h-3" />
                          <span>{pet.vaccines.length} vacuna{pet.vaccines.length !== 1 ? 's' : ''}</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{pet.medicalRecords.length} consulta{pet.medicalRecords.length !== 1 ? 's' : ''}</span>
                        </Badge>
                      </div>

                      {/* Recent Vaccines */}
                      {pet.vaccines.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Vacunas Recientes:</h4>
                          <div className="flex flex-wrap gap-2">
                            {pet.vaccines.slice(0, 3).map((vaccine) => (
                              <Badge key={vaccine.id} variant="secondary" className="text-xs">
                                {vaccine.name} - {new Date(vaccine.vaccinationDate).toLocaleDateString()}
                              </Badge>
                            ))}
                            {pet.vaccines.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{pet.vaccines.length - 3} más
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/pets/${pet.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Historial
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/pets/${pet.id}/edit`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <PawPrint className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron mascotas</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterSpecies !== 'all' ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando tu primera mascota'}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Mascota
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

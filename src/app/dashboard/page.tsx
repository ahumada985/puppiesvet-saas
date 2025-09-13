'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  PawPrint, 
  Calendar, 
  Shield, 
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Bell,
  TrendingUp,
  Clock,
  Heart,
  Sparkles,
  Star,
  Activity,
  Zap,
  ArrowRight,
  Filter
} from "lucide-react"
import Link from "next/link"

// Tipos de datos
interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
  avatar: string
  pets: Pet[]
}

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

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState<'overview' | 'clients' | 'pets' | 'vaccines'>('overview')

  // Datos de ejemplo para demostración
  useEffect(() => {
    const mockClients: Client[] = [
      {
        id: '1',
        name: 'María González',
        email: 'maria.gonzalez@email.com',
        phone: '+56 9 1234 5678',
        address: 'Av. Principal 123, Santiago',
        createdAt: '2024-01-15',
        avatar: '👩‍⚕️',
        pets: [
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
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        phone: '+56 9 8765 4321',
        address: 'Calle Secundaria 456, Valparaíso',
        createdAt: '2024-02-20',
        avatar: '👨‍💼',
        pets: [
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
                id: '2',
                date: '2024-02-15',
                diagnosis: 'Esterilización',
                treatment: 'Cirugía de esterilización',
                notes: 'Procedimiento exitoso, recuperación normal',
                veterinarian: 'Dr. Ana Silva'
              }
            ]
          }
        ]
      },
      {
        id: '3',
        name: 'Ana Rodríguez',
        email: 'ana.rodriguez@email.com',
        phone: '+56 9 5555 1234',
        address: 'Plaza Mayor 789, Concepción',
        createdAt: '2024-03-10',
        avatar: '👩‍🎨',
        pets: [
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
            vaccines: [
              {
                id: '4',
                name: 'Antirrábica',
                vaccinationDate: '2024-03-01',
                nextVaccinationDate: '2025-03-01',
                veterinarian: 'Dr. Carlos Mendez',
                batchNumber: 'RAB2024004'
              }
            ],
            medicalRecords: [
              {
                id: '3',
                date: '2024-03-01',
                diagnosis: 'Control anual',
                treatment: 'Vacunación y examen general',
                notes: 'Animal saludable',
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
            vaccines: [],
            medicalRecords: [
              {
                id: '4',
                date: '2024-02-28',
                diagnosis: 'Primera consulta',
                treatment: 'Examen general y desparasitación',
                notes: 'Gatita en buen estado',
                veterinarian: 'Dr. Ana Silva'
              }
            ]
          }
        ]
      }
    ]

    setClients(mockClients)
    setPets(mockClients.flatMap(client => client.pets))
  }, [])

  // Estadísticas del dashboard
  const stats = {
    totalClients: clients.length,
    totalPets: pets.length,
    upcomingVaccines: pets.flatMap(pet => pet.vaccines).filter(vaccine => 
      new Date(vaccine.nextVaccinationDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).length,
    recentVisits: pets.flatMap(pet => pet.medicalRecords).filter(record => 
      new Date(record.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length
  }

  // Filtrar datos según búsqueda
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  )

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Próximas vacunas
  const upcomingVaccines = pets.flatMap(pet => 
    pet.vaccines.map(vaccine => ({
      ...vaccine,
      petName: pet.name,
      clientName: clients.find(c => c.id === pet.clientId)?.name || 'Cliente no encontrado'
    }))
  ).filter(vaccine => 
    new Date(vaccine.nextVaccinationDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  ).sort((a, b) => new Date(a.nextVaccinationDate).getTime() - new Date(b.nextVaccinationDate).getTime())

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <PawPrint className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                PuppiesVet
              </h1>
              <p className="text-sm text-gray-600">Dashboard Veterinario</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hover:bg-blue-50">
              <Bell className="w-4 h-4 mr-2" />
              Notificaciones
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Link href="/dashboard/clients/new">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Cliente
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white/80 backdrop-blur-sm border-r min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  selectedTab === 'overview' 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Resumen</span>
              </button>
              <button
                onClick={() => setSelectedTab('clients')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  selectedTab === 'clients' 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Clientes</span>
              </button>
              <button
                onClick={() => setSelectedTab('pets')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  selectedTab === 'pets' 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <PawPrint className="w-5 h-5" />
                <span className="font-medium">Mascotas</span>
              </button>
              <button
                onClick={() => setSelectedTab('vaccines')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  selectedTab === 'vaccines' 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Vacunas</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar clientes, mascotas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-xl border-0 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">¡Bienvenido a PuppiesVet!</h2>
                    <p className="text-blue-100 text-lg">Gestiona tu clínica veterinaria de manera eficiente</p>
                  </div>
                  <div className="text-6xl opacity-20">
                    <PawPrint />
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Clientes</CardTitle>
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{stats.totalClients}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="text-green-600">+2</span> desde el mes pasado
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Mascotas</CardTitle>
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <PawPrint className="h-5 w-5 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{stats.totalPets}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="text-green-600">+3</span> desde el mes pasado
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Vacunas Próximas</CardTitle>
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Shield className="h-5 w-5 text-orange-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">{stats.upcomingVaccines}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      Próximos 30 días
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Visitas Recientes</CardTitle>
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Heart className="h-5 w-5 text-purple-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">{stats.recentVisits}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      Últimos 7 días
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Vaccines */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Clock className="w-6 h-6 mr-3 text-orange-600" />
                    Próximas Vacunas
                  </CardTitle>
                  <CardDescription>
                    Vacunas que vencen en los próximos 30 días
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingVaccines.slice(0, 5).map((vaccine) => (
                      <div key={vaccine.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{vaccine.petName}</p>
                            <p className="text-sm text-gray-600">{vaccine.clientName}</p>
                            <p className="text-sm text-gray-500">{vaccine.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-orange-600">
                            {new Date(vaccine.nextVaccinationDate).toLocaleDateString()}
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {vaccine.veterinarian}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Clients Tab */}
          {selectedTab === 'clients' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Clientes</h2>
                  <p className="text-gray-600 mt-1">Gestiona la información de tus clientes</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/clients">Ver Todos</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    <Link href="/dashboard/clients/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Nuevo Cliente
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredClients.map((client) => (
                  <Card key={client.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-6">
                          <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                            {client.avatar}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{client.name}</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>{client.email}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>{client.phone}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 mb-4">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <Calendar className="w-3 h-3 mr-1" />
                                Cliente desde {new Date(client.createdAt).toLocaleDateString()}
                              </Badge>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <PawPrint className="w-3 h-3 mr-1" />
                                {client.pets.length} mascota{client.pets.length !== 1 ? 's' : ''}
                              </Badge>
                            </div>

                            {/* Pets Preview */}
                            {client.pets.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Mascotas:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {client.pets.map((pet) => (
                                    <Badge key={pet.id} variant="secondary" className="bg-gradient-to-r from-blue-50 to-green-50 text-gray-700 border-0">
                                      {pet.name} ({pet.species})
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="hover:bg-blue-50">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-green-50">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Pets Tab */}
          {selectedTab === 'pets' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Mascotas</h2>
                  <p className="text-gray-600 mt-1">Administra el historial de todas las mascotas</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/pets">Ver Todas</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    <Link href="/dashboard/pets/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva Mascota
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredPets.map((pet) => {
                  const client = clients.find(c => c.id === pet.clientId)
                  return (
                    <Card key={pet.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                              {pet.species === 'Perro' ? '🐕' : '🐱'}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{pet.name}</h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Especie:</span> {pet.species}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Raza:</span> {pet.breed}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Género:</span> {pet.gender}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Color:</span> {pet.color}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Dueño:</span> {client?.name}
                                  </p>
                                  {pet.microchipId && (
                                    <p className="text-sm text-gray-600">
                                      <span className="font-semibold">Microchip:</span> {pet.microchipId}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center space-x-4 mb-4">
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  <Shield className="w-3 h-3 mr-1" />
                                  {pet.vaccines.length} vacuna{pet.vaccines.length !== 1 ? 's' : ''}
                                </Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <Heart className="w-3 h-3 mr-1" />
                                  {pet.medicalRecords.length} consulta{pet.medicalRecords.length !== 1 ? 's' : ''}
                                </Badge>
                              </div>

                              {/* Recent Vaccines */}
                              {pet.vaccines.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Vacunas Recientes:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {pet.vaccines.slice(0, 3).map((vaccine) => (
                                      <Badge key={vaccine.id} variant="secondary" className="bg-gradient-to-r from-blue-50 to-green-50 text-gray-700 border-0">
                                        {vaccine.name} - {new Date(vaccine.vaccinationDate).toLocaleDateString()}
                                      </Badge>
                                    ))}
                                    {pet.vaccines.length > 3 && (
                                      <Badge variant="secondary" className="bg-gradient-to-r from-blue-50 to-green-50 text-gray-700 border-0">
                                        +{pet.vaccines.length - 3} más
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="hover:bg-blue-50" asChild>
                              <Link href={`/dashboard/pets/${pet.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Historial
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-green-50" asChild>
                              <Link href={`/dashboard/pets/${pet.id}/edit`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Vaccines Tab */}
          {selectedTab === 'vaccines' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Control de Vacunas</h2>
                  <p className="text-gray-600 mt-1">Gestiona el calendario de vacunación</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Vacuna
                </Button>
              </div>

              <div className="grid gap-6">
                {pets.flatMap(pet => 
                  pet.vaccines.map(vaccine => ({
                    ...vaccine,
                    petName: pet.name,
                    clientName: clients.find(c => c.id === pet.clientId)?.name || 'Cliente no encontrado'
                  }))
                ).map((vaccine) => (
                  <Card key={vaccine.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-6">
                          <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                            💉
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{vaccine.name}</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                  <span className="font-semibold">Mascota:</span> {vaccine.petName}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-semibold">Cliente:</span> {vaccine.clientName}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-semibold">Veterinario:</span> {vaccine.veterinarian}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                  <span className="font-semibold">Aplicada:</span> {new Date(vaccine.vaccinationDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-semibold">Próxima:</span> {new Date(vaccine.nextVaccinationDate).toLocaleDateString()}
                                </p>
                                {vaccine.batchNumber && (
                                  <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Lote:</span> {vaccine.batchNumber}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="hover:bg-green-50" asChild>
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
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  PawPrint
} from "lucide-react"
import Link from "next/link"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
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
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Datos de ejemplo
  const clients: Client[] = [
    {
      id: '1',
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+56 9 1234 5678',
      address: 'Av. Principal 123, Santiago',
      createdAt: '2024-01-15',
      pets: [
        {
          id: '1',
          name: 'Max',
          species: 'Perro',
          breed: 'Golden Retriever',
          birthDate: '2022-03-15',
          gender: 'Macho',
          color: 'Dorado',
          microchipId: 'CHIP001'
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
      pets: [
        {
          id: '2',
          name: 'Luna',
          species: 'Gato',
          breed: 'Siamés',
          birthDate: '2023-06-10',
          gender: 'Hembra',
          color: 'Blanco y marrón',
          microchipId: 'CHIP002'
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
      pets: [
        {
          id: '3',
          name: 'Bobby',
          species: 'Perro',
          breed: 'Labrador',
          birthDate: '2021-12-05',
          gender: 'Macho',
          color: 'Negro',
          microchipId: 'CHIP003'
        },
        {
          id: '4',
          name: 'Mimi',
          species: 'Gato',
          breed: 'Persa',
          birthDate: '2023-08-20',
          gender: 'Hembra',
          color: 'Gris',
          microchipId: 'CHIP004'
        }
      ]
    }
  ]

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  )

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
                <Link href="/dashboard/clients/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Cliente
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Clientes</h1>
          <p className="text-gray-600">Administra la información de tus clientes y sus mascotas</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mascotas</CardTitle>
              <PawPrint className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {clients.reduce((total, client) => total + client.pets.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Promedio: {(clients.reduce((total, client) => total + client.pets.length, 0) / clients.length).toFixed(1)} por cliente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{clients.length}</div>
              <p className="text-xs text-muted-foreground">
                100% de clientes activos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Clients List */}
        <div className="grid gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{client.name}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{client.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 md:col-span-2">
                          <MapPin className="w-4 h-4" />
                          <span>{client.address}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Cliente desde {new Date(client.createdAt).toLocaleDateString()}</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <PawPrint className="w-3 h-3" />
                          <span>{client.pets.length} mascota{client.pets.length !== 1 ? 's' : ''}</span>
                        </Badge>
                      </div>

                      {/* Pets Preview */}
                      {client.pets.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Mascotas:</h4>
                          <div className="flex flex-wrap gap-2">
                            {client.pets.map((pet) => (
                              <Badge key={pet.id} variant="secondary" className="text-xs">
                                {pet.name} ({pet.species})
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
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

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron clientes</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando tu primer cliente'}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Cliente
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

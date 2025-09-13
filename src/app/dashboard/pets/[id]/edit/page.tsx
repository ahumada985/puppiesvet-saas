'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft,
  Save,
  PawPrint,
  Calendar,
  Hash,
  User,
  Check,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { useParams } from 'next/navigation'

const petAvatars = {
  'Perro': ['🐕', '🐶', '🦮', '🐕‍🦺', '🐩', '🐕‍🦺'],
  'Gato': ['🐱', '🐈', '🐈‍⬛', '😸', '😺', '😻'],
  'Conejo': ['🐰', '🐇'],
  'Hamster': ['🐹'],
  'Pájaro': ['🐦', '🦜', '🦅', '🦆'],
  'Pez': ['🐠', '🐟', '🐡'],
  'Tortuga': ['🐢'],
  'Otro': ['🐾', '🦎', '🐍', '🐀', '🐁']
}

const species = Object.keys(petAvatars)
const genders = ['Macho', 'Hembra']
const colors = ['Blanco', 'Negro', 'Marrón', 'Gris', 'Dorado', 'Atigrado', 'Bicolor', 'Tricolor', 'Otro']

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
}

export default function EditPetPage() {
  const params = useParams()
  const petId = params.id as string
  const [formData, setFormData] = useState({
    name: '',
    species: 'Perro',
    breed: '',
    birthDate: '',
    gender: 'Macho',
    color: 'Blanco',
    microchipId: '',
    avatar: '🐕'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [pet, setPet] = useState<Pet | null>(null)

  // Cargar datos de la mascota
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
        clientName: 'María González'
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
        clientName: 'Juan Pérez'
      }
    ]

    const foundPet = mockPets.find(p => p.id === petId)
    if (foundPet) {
      setPet(foundPet)
      setFormData({
        name: foundPet.name,
        species: foundPet.species,
        breed: foundPet.breed,
        birthDate: foundPet.birthDate,
        gender: foundPet.gender,
        color: foundPet.color,
        microchipId: foundPet.microchipId || '',
        avatar: foundPet.species === 'Perro' ? '🐕' : '🐱'
      })
    }
  }, [petId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
      window.location.href = `/dashboard/pets/${petId}`
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSpeciesChange = (species: string) => {
    setFormData(prev => ({
      ...prev,
      species,
      avatar: petAvatars[species as keyof typeof petAvatars][0]
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Mascota Actualizada!</h2>
            <p className="text-gray-600 mb-6">Los datos de la mascota han sido actualizados exitosamente.</p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-gray-500 mt-4">Redirigiendo...</p>
          </CardContent>
        </Card>
      </div>
    )
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
              <Link href={`/dashboard/pets/${petId}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Editar {pet.name}</h1>
                <p className="text-gray-600">Modifica la información de la mascota</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PawPrint className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Editar Información</CardTitle>
              <CardDescription>
                Modifica los datos de {pet.name}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Avatar Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Selecciona un Avatar
                  </label>
                  <div className="grid grid-cols-6 gap-3">
                    {petAvatars[formData.species as keyof typeof petAvatars].map((avatar) => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => handleInputChange('avatar', avatar)}
                        className={`w-16 h-16 text-3xl rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                          formData.avatar === avatar
                            ? 'border-green-500 bg-green-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre de la Mascota *
                    </label>
                    <div className="relative">
                      <PawPrint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Ej: Max, Luna, Bobby"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Especie *
                    </label>
                    <select
                      value={formData.species}
                      onChange={(e) => handleSpeciesChange(e.target.value)}
                      className="w-full h-12 px-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      {species.map(specie => (
                        <option key={specie} value={specie}>{specie}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Raza *
                    </label>
                    <Input
                      type="text"
                      placeholder="Ej: Golden Retriever, Siamés"
                      value={formData.breed}
                      onChange={(e) => handleInputChange('breed', e.target.value)}
                      className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de Nacimiento *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Género *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full h-12 px-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      {genders.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Color *
                    </label>
                    <select
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      className="w-full h-12 px-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      {colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Número de Microchip
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Ej: CHIP001234"
                        value={formData.microchipId}
                        onChange={(e) => handleInputChange('microchipId', e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      {formData.avatar}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {formData.name || 'Nombre de la Mascota'}
                      </h4>
                      <p className="text-gray-600">{formData.species} - {formData.breed || 'Raza'}</p>
                      <p className="text-gray-600">{formData.gender} • {formData.color}</p>
                      {formData.birthDate && (
                        <p className="text-gray-600">
                          Nacido: {new Date(formData.birthDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Link href={`/dashboard/pets/${petId}`}>
                    <Button variant="outline" type="button" className="h-12 px-8 rounded-xl">
                      Cancelar
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.breed || !formData.birthDate}
                    className="h-12 px-8 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Actualizar Mascota
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

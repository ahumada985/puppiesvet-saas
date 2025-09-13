'use client';

import { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ExternalLink,
  Calendar,
  Trophy,
  Users,
  Target
} from 'lucide-react';

interface DataVerificationProps {
  teamName: string;
  teamData: any;
  recentMatches: any[];
  onVerifyData: () => void;
}

export default function DataVerification({ teamName, teamData, recentMatches, onVerifyData }: DataVerificationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const verifyDataAccuracy = () => {
    const issues = [];
    const warnings = [];
    const successes = [];

    // Verificar datos básicos
    if (teamData.position < 1 || teamData.position > 20) {
      issues.push('Posición en la tabla fuera del rango esperado');
    } else {
      successes.push('Posición en la tabla válida');
    }

    if (teamData.points < 0 || teamData.points > teamData.played * 3) {
      issues.push('Puntos totales inconsistentes con partidos jugados');
    } else {
      successes.push('Puntos totales consistentes');
    }

    if (teamData.wins + teamData.draws + teamData.losses !== teamData.played) {
      issues.push('Suma de victorias, empates y derrotas no coincide con partidos jugados');
    } else {
      successes.push('Estadísticas de resultados consistentes');
    }

    // Verificar forma reciente
    const formLength = teamData.recentForm.length;
    if (formLength < 3 || formLength > 10) {
      warnings.push('Forma reciente con longitud inusual');
    } else {
      successes.push('Forma reciente con longitud apropiada');
    }

    // Verificar partidos recientes
    if (recentMatches.length === 0) {
      warnings.push('No se encontraron partidos recientes');
    } else {
      successes.push(`${recentMatches.length} partidos recientes encontrados`);
    }

    // Verificar fechas de partidos
    const currentDate = new Date();
    const oldMatches = recentMatches.filter(match => {
      const matchDate = new Date(match.date);
      const daysDiff = (currentDate.getTime() - matchDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff > 60; // Más de 2 meses
    });

    if (oldMatches.length > 0) {
      warnings.push(`${oldMatches.length} partidos muy antiguos en los últimos 5`);
    } else {
      successes.push('Fechas de partidos recientes apropiadas');
    }

    return { issues, warnings, successes };
  };

  const { issues, warnings, successes } = verifyDataAccuracy();

  const getVerificationColor = () => {
    if (issues.length > 0) return 'text-red-400';
    if (warnings.length > 0) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getVerificationIcon = () => {
    if (issues.length > 0) return AlertTriangle;
    if (warnings.length > 0) return Info;
    return CheckCircle;
  };

  const VerificationIcon = getVerificationIcon();

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-bold text-white flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Verificación de Datos
        </h3>
        <div className="flex items-center space-x-2">
          <VerificationIcon className={`w-5 h-5 ${getVerificationColor()}`} />
          <span className={`text-sm font-semibold ${getVerificationColor()}`}>
            {issues.length > 0 ? 'Problemas' : warnings.length > 0 ? 'Advertencias' : 'Correcto'}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          
          {/* Resumen de Verificación */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold">Correcto</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{successes.length}</div>
              <div className="text-sm text-green-300">Verificaciones exitosas</div>
            </div>
            
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Advertencias</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">{warnings.length}</div>
              <div className="text-sm text-yellow-300">Posibles inconsistencias</div>
            </div>
            
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-semibold">Problemas</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{issues.length}</div>
              <div className="text-sm text-red-300">Errores encontrados</div>
            </div>
          </div>

          {/* Detalles de Verificación */}
          <div className="space-y-3">
            
            {/* Éxitos */}
            {successes.length > 0 && (
              <div>
                <h4 className="text-green-400 font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verificaciones Exitosas
                </h4>
                <div className="space-y-1">
                  {successes.map((success, index) => (
                    <div key={index} className="text-green-300 text-sm flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2" />
                      {success}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advertencias */}
            {warnings.length > 0 && (
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Advertencias
                </h4>
                <div className="space-y-1">
                  {warnings.map((warning, index) => (
                    <div key={index} className="text-yellow-300 text-sm flex items-center">
                      <Info className="w-3 h-3 mr-2" />
                      {warning}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problemas */}
            {issues.length > 0 && (
              <div>
                <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Problemas Encontrados
                </h4>
                <div className="space-y-1">
                  {issues.map((issue, index) => (
                    <div key={index} className="text-red-300 text-sm flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-2" />
                      {issue}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Información de Verificación Externa */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              Verificación Externa Recomendada
            </h4>
            <p className="text-gray-300 text-sm mb-3">
              Para verificar la exactitud de estos datos, puedes consultar:
            </p>
            <div className="space-y-2">
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(teamName + ' ' + teamData.league + ' estadísticas 2024')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                <ExternalLink className="w-3 h-3 mr-2" />
                Buscar en Google: {teamName} estadísticas
              </a>
              <a 
                href={`https://www.transfermarkt.com/search?query=${encodeURIComponent(teamName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                <ExternalLink className="w-3 h-3 mr-2" />
                Transfermarkt: {teamName}
              </a>
              <a 
                href={`https://www.whoscored.com/Teams/${encodeURIComponent(teamName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                <ExternalLink className="w-3 h-3 mr-2" />
                WhoScored: {teamName}
              </a>
            </div>
          </div>

          {/* Botón de Verificación Manual */}
          <button
            onClick={onVerifyData}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
          >
            <Target className="w-4 h-4" />
            <span>Verificar Datos Manualmente</span>
          </button>
        </div>
      )}
    </div>
  );
}



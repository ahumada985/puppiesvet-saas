'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ExternalLink,
  Shield,
  Database,
  Globe,
  Calendar,
  TrendingUp,
  Users,
  Trophy
} from 'lucide-react';

interface DataIntegrityReportProps {
  teamName?: string;
}

interface VerificationData {
  totalTeams: number;
  totalMatches: number;
  totalLeagues: number;
  verifiedMatches: number;
  dataSources: string[];
  lastUpdated: string;
  integrityCheck: Array<{
    team: string;
    isValid: boolean;
    issues: string[];
  }>;
}

interface TeamVerificationData {
  team: any;
  verification: {
    isValid: boolean;
    issues: string[];
  };
  recentMatches: any[];
  dataSource: string;
  lastUpdated: string;
}

export default function DataIntegrityReport({ teamName }: DataIntegrityReportProps) {
  const [data, setData] = useState<VerificationData | TeamVerificationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVerificationData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const url = teamName 
        ? `/api/verify-data?team=${encodeURIComponent(teamName)}`
        : '/api/verify-data';
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Error al verificar datos');
      }
    } catch (error) {
      console.error('❌ Error cargando verificación:', error);
      setError('Error de conexión al verificar datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVerificationData();
  }, [teamName]);

  const getIntegrityColor = (isValid: boolean) => {
    return isValid ? 'text-green-400' : 'text-red-400';
  };

  const getIntegrityIcon = (isValid: boolean) => {
    return isValid ? CheckCircle : AlertTriangle;
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-blue-400 animate-pulse" />
          <span className="text-white font-semibold">Verificando integridad de datos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span className="text-red-300 font-semibold">Error en verificación</span>
        </div>
        <p className="text-red-200 mt-2">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  // Verificación de equipo específico
  if (teamName && 'team' in data) {
    const teamData = data as TeamVerificationData;
    const IntegrityIcon = getIntegrityIcon(teamData.verification.isValid);

    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Verificación de Integridad - {teamData.team.name}
          </h3>
          <div className={`flex items-center space-x-2 ${getIntegrityColor(teamData.verification.isValid)}`}>
            <IntegrityIcon className="w-5 h-5" />
            <span className="font-semibold">
              {teamData.verification.isValid ? 'Datos Válidos' : 'Problemas Detectados'}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Estadísticas del Equipo */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Estadísticas Verificadas
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Posición:</span>
                <span className="text-white">#{teamData.team.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Puntos:</span>
                <span className="text-white">{teamData.team.points}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Partidos:</span>
                <span className="text-white">{teamData.team.played}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Forma:</span>
                <span className="text-white">{teamData.team.recentForm}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Goles promedio:</span>
                <span className="text-white">{teamData.team.avgGoalsScored.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Fuentes de Datos */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Fuentes de Datos
            </h4>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <strong>Última actualización:</strong> {new Date(teamData.lastUpdated).toLocaleDateString('es-ES')}
              </div>
              <div className="text-sm text-gray-300">
                <strong>Fuentes:</strong> {teamData.dataSource}
              </div>
              <div className="text-sm text-gray-300">
                <strong>Partidos recientes:</strong> {teamData.recentMatches.length} verificados
              </div>
            </div>
          </div>
        </div>

        {/* Problemas de Integridad */}
        {teamData.verification.issues.length > 0 && (
          <div className="mt-6 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <h4 className="text-red-400 font-semibold mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Problemas Detectados
            </h4>
            <ul className="space-y-1">
              {teamData.verification.issues.map((issue, index) => (
                <li key={index} className="text-red-300 text-sm flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-2" />
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Enlaces de Verificación Externa */}
        <div className="mt-6 bg-gray-800/50 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <ExternalLink className="w-4 h-4 mr-2" />
            Verificación Externa
          </h4>
          <div className="grid md:grid-cols-2 gap-2">
            <a 
              href={`https://www.google.com/search?q=${encodeURIComponent(teamData.team.name + ' ' + teamData.team.league + ' estadísticas 2024-25')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              Google: {teamData.team.name} estadísticas
            </a>
            <a 
              href={`https://www.transfermarkt.com/search?query=${encodeURIComponent(teamData.team.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              Transfermarkt: {teamData.team.name}
            </a>
            <a 
              href={`https://www.whoscored.com/Teams/${encodeURIComponent(teamData.team.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              WhoScored: {teamData.team.name}
            </a>
            <a 
              href={`https://www.365scores.com/es/teams/${encodeURIComponent(teamData.team.name.toLowerCase().replace(/\s+/g, '-'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              365Scores: {teamData.team.name}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Verificación general de la base de datos
  const generalData = data as VerificationData;
  const totalIssues = generalData.integrityCheck.reduce((sum, check) => sum + check.issues.length, 0);
  const validTeams = generalData.integrityCheck.filter(check => check.isValid).length;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Reporte de Integridad de Datos
        </h3>
        <div className={`flex items-center space-x-2 ${totalIssues === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
          <Shield className="w-5 h-5" />
          <span className="font-semibold">
            {totalIssues === 0 ? 'Base de Datos Válida' : `${totalIssues} Problemas`}
          </span>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-semibold">Equipos</span>
          </div>
          <div className="text-2xl font-bold text-white">{generalData.totalTeams}</div>
          <div className="text-sm text-gray-400">{validTeams} válidos</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-semibold">Partidos</span>
          </div>
          <div className="text-2xl font-bold text-white">{generalData.totalMatches}</div>
          <div className="text-sm text-gray-400">{generalData.verifiedMatches} verificados</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-semibold">Ligas</span>
          </div>
          <div className="text-2xl font-bold text-white">{generalData.totalLeagues}</div>
          <div className="text-sm text-gray-400">Activas</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-semibold">Fuentes</span>
          </div>
          <div className="text-2xl font-bold text-white">{generalData.dataSources.length}</div>
          <div className="text-sm text-gray-400">Verificadas</div>
        </div>
      </div>

      {/* Fuentes de Datos */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
        <h4 className="text-white font-semibold mb-3 flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          Fuentes de Datos Verificadas
        </h4>
        <div className="grid md:grid-cols-2 gap-2">
          {generalData.dataSources.map((source, index) => (
            <div key={index} className="text-blue-400 text-sm flex items-center">
              <CheckCircle className="w-3 h-3 mr-2" />
              {source}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-400 mt-3">
          <strong>Última actualización:</strong> {new Date(generalData.lastUpdated).toLocaleDateString('es-ES')}
        </div>
      </div>

      {/* Verificación por Equipo */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Verificación por Equipo
        </h4>
        <div className="space-y-2">
          {generalData.integrityCheck.map((check, index) => {
            const IntegrityIcon = getIntegrityIcon(check.isValid);
            return (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                <div className="flex items-center space-x-2">
                  <IntegrityIcon className={`w-4 h-4 ${getIntegrityColor(check.isValid)}`} />
                  <span className="text-white">{check.team}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {check.issues.length === 0 ? 'Sin problemas' : `${check.issues.length} problemas`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



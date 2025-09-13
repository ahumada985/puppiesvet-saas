'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Trophy, 
  Target, 
  BarChart3,
  Calendar,
  Users,
  Award,
  Activity,
  RefreshCw,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface HistoricalStatsProps {
  teamName: string;
}

interface SeasonData {
  season: string;
  position: number;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  avgGoalsScored: number;
  avgGoalsConceded: number;
  cleanSheets: number;
}

interface HistoricalStatsData {
  team: string;
  seasons: SeasonData[];
  averages: {
    avgPosition: number;
    avgPoints: number;
    avgGoalsScored: number;
    avgGoalsConceded: number;
    avgCleanSheets: number;
    totalWins: number;
    totalDraws: number;
    totalLosses: number;
  };
}

export default function HistoricalStats({ teamName }: HistoricalStatsProps) {
  const [data, setData] = useState<HistoricalStatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSeasons, setExpandedSeasons] = useState<Set<string>>(new Set());

  const loadHistoricalStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/historical-stats?team=${encodeURIComponent(teamName)}&seasons=6`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Error al cargar estadísticas históricas');
      }
    } catch (error) {
      console.error('❌ Error cargando estadísticas históricas:', error);
      setError('Error de conexión al cargar estadísticas históricas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistoricalStats();
  }, [teamName]);

  const toggleSeason = (season: string) => {
    const newExpanded = new Set(expandedSeasons);
    if (newExpanded.has(season)) {
      newExpanded.delete(season);
    } else {
      newExpanded.add(season);
    }
    setExpandedSeasons(newExpanded);
  };

  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-400';
    if (position <= 3) return 'text-green-400';
    if (position <= 6) return 'text-blue-400';
    return 'text-gray-400';
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return Trophy;
    if (position <= 3) return Award;
    return Target;
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-blue-400 animate-pulse" />
          <span className="text-white font-semibold">Cargando estadísticas históricas...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-red-400" />
          <span className="text-red-300 font-semibold">Error cargando estadísticas</span>
        </div>
        <p className="text-red-200 mt-2">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Estadísticas Históricas - {data.team}
        </h3>
        <button
          onClick={loadHistoricalStats}
          disabled={loading}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center space-x-1"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Promedios Generales */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Posición Promedio</span>
          </div>
          <div className="text-2xl font-bold text-white">{data.averages.avgPosition.toFixed(1)}</div>
          <div className="text-sm text-gray-400">En {data.seasons.length} temporadas</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-semibold">Puntos Promedio</span>
          </div>
          <div className="text-2xl font-bold text-white">{data.averages.avgPoints.toFixed(0)}</div>
          <div className="text-sm text-gray-400">Por temporada</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-semibold">Goles Promedio</span>
          </div>
          <div className="text-2xl font-bold text-white">{data.averages.avgGoalsScored.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Por partido</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-semibold">Porterías a Cero</span>
          </div>
          <div className="text-2xl font-bold text-white">{data.averages.avgCleanSheets.toFixed(1)}</div>
          <div className="text-sm text-gray-400">Por temporada</div>
        </div>
      </div>

      {/* Resumen de Resultados */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
        <h4 className="text-white font-semibold mb-3 flex items-center">
          <Users className="w-4 h-4 mr-2" />
          Resumen de Resultados ({data.seasons.length} temporadas)
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{data.averages.totalWins}</div>
            <div className="text-sm text-gray-400">Victorias</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{data.averages.totalDraws}</div>
            <div className="text-sm text-gray-400">Empates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{data.averages.totalLosses}</div>
            <div className="text-sm text-gray-400">Derrotas</div>
          </div>
        </div>
      </div>

      {/* Temporadas Individuales */}
      <div className="space-y-3">
        <h4 className="text-white font-semibold mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Temporadas Individuales
        </h4>
        
        {data.seasons.map((season, index) => {
          const PositionIcon = getPositionIcon(season.position);
          const isExpanded = expandedSeasons.has(season.season);
          
          return (
            <div key={season.season} className="bg-gray-800/50 rounded-lg">
              <button
                onClick={() => toggleSeason(season.season)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getPositionColor(season.position)}`}>
                    <PositionIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{season.season}</div>
                    <div className="text-sm text-gray-400">
                      #{season.position} • {season.points} puntos • {season.played} partidos
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Goles</div>
                    <div className="text-white font-semibold">
                      {season.goalsFor}-{season.goalsAgainst}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-700/50">
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-white font-semibold mb-2">Estadísticas Generales</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Victorias:</span>
                          <span className="text-green-400">{season.wins}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Empates:</span>
                          <span className="text-yellow-400">{season.draws}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Derrotas:</span>
                          <span className="text-red-400">{season.losses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Porterías a cero:</span>
                          <span className="text-white">{season.cleanSheets}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-semibold mb-2">Promedios</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Goles marcados:</span>
                          <span className="text-white">{season.avgGoalsScored.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Goles recibidos:</span>
                          <span className="text-white">{season.avgGoalsConceded.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Diferencia:</span>
                          <span className={`${season.goalDifference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {season.goalDifference > 0 ? '+' : ''}{season.goalDifference}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}



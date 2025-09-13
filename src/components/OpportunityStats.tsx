'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  Trophy,
  Star,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface OpportunityStats {
  total: number;
  highValue: number;
  highConfidence: number;
  byMarket: Record<string, number>;
  byLeague: Record<string, number>;
  avgValue: number;
  avgConfidence: number;
  topLeague: string;
  topMarket: string;
}

export default function OpportunityStats() {
  const [stats, setStats] = useState<OpportunityStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/opportunities');
      const data = await response.json();
      
      if (data.success) {
        const opportunities = data.data;
        
        // Calcular estadísticas
        const calculatedStats: OpportunityStats = {
          total: opportunities.length,
          highValue: opportunities.filter((opp: any) => opp.value >= 0.2).length,
          highConfidence: opportunities.filter((opp: any) => opp.confidence >= 80).length,
          byMarket: {},
          byLeague: {},
          avgValue: 0,
          avgConfidence: 0,
          topLeague: '',
          topMarket: ''
        };

        // Contar por mercado y liga
        opportunities.forEach((opp: any) => {
          calculatedStats.byMarket[opp.market] = (calculatedStats.byMarket[opp.market] || 0) + 1;
          calculatedStats.byLeague[opp.match.league] = (calculatedStats.byLeague[opp.match.league] || 0) + 1;
        });

        // Calcular promedios
        if (opportunities.length > 0) {
          calculatedStats.avgValue = opportunities.reduce((sum: number, opp: any) => sum + opp.value, 0) / opportunities.length;
          calculatedStats.avgConfidence = opportunities.reduce((sum: number, opp: any) => sum + opp.confidence, 0) / opportunities.length;
        }

        // Encontrar top liga y mercado
        calculatedStats.topLeague = Object.entries(calculatedStats.byLeague)
          .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || '';
        calculatedStats.topMarket = Object.entries(calculatedStats.byMarket)
          .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || '';

        setStats(calculatedStats);
      }
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-8 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-8">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span className="text-red-300">Error al cargar estadísticas</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Estadísticas Principales */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total Oportunidades</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Alto Valor (≥20%)</p>
              <p className="text-2xl font-bold text-green-400">{stats.highValue}</p>
            </div>
            <Star className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Alta Confianza (≥80%)</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.highConfidence}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Ligas Activas</p>
              <p className="text-2xl font-bold text-purple-400">
                {Object.keys(stats.byLeague).length}
              </p>
            </div>
            <Trophy className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Estadísticas Detalladas */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Distribución por Mercado
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.byMarket).map(([market, count]) => (
              <div key={market} className="flex items-center justify-between">
                <span className="text-gray-300">{market}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            Distribución por Liga
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.byLeague).map(([league, count]) => (
              <div key={league} className="flex items-center justify-between">
                <span className="text-gray-300">{league}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas de Calidad */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h4 className="text-lg font-bold text-white mb-2">Valor Promedio</h4>
          <p className="text-3xl font-bold text-green-400">
            {(stats.avgValue * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Valor promedio de las oportunidades
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h4 className="text-lg font-bold text-white mb-2">Confianza Promedio</h4>
          <p className="text-3xl font-bold text-blue-400">
            {stats.avgConfidence.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Confianza promedio del sistema
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h4 className="text-lg font-bold text-white mb-2">Liga Top</h4>
          <p className="text-xl font-bold text-purple-400">
            {stats.topLeague}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {stats.byLeague[stats.topLeague]} oportunidades
          </p>
        </div>
      </div>
    </div>
  );
}



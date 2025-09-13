'use client';

import { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  TrendingUp, 
  Star, 
  Clock,
  Target
} from 'lucide-react';

interface Opportunity {
  id: string;
  match: {
    homeTeam: string;
    awayTeam: string;
    league: string;
    date: string;
    time: string;
  };
  market: string;
  prediction: string;
  odds: number;
  value: number;
  confidence: number;
}

export default function OpportunityAlert() {
  const [alerts, setAlerts] = useState<Opportunity[]>([]);
  const [showAlerts, setShowAlerts] = useState(true);

  useEffect(() => {
    // Simular alertas de oportunidades de alto valor
    const mockAlerts: Opportunity[] = [
      {
        id: '1',
        match: {
          homeTeam: 'Real Madrid',
          awayTeam: 'Getafe',
          league: 'La Liga',
          date: '2024-01-15',
          time: '20:00'
        },
        market: '1X2',
        prediction: 'Local',
        odds: 1.45,
        value: 0.18,
        confidence: 85
      },
      {
        id: '2',
        match: {
          homeTeam: 'Manchester City',
          awayTeam: 'Brighton',
          league: 'Premier League',
          date: '2024-01-16',
          time: '15:30'
        },
        market: 'Over/Under 2.5',
        prediction: 'Over 2.5',
        odds: 1.75,
        value: 0.16,
        confidence: 80
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const dismissAllAlerts = () => {
    setAlerts([]);
    setShowAlerts(false);
  };

  if (!showAlerts || alerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-lg shadow-lg border border-green-500/30 animate-slide-in"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-semibold">Oportunidad de Alto Valor</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span className="text-xs">{(alert.value * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="mb-2">
                <h4 className="font-bold text-sm">
                  {alert.match.homeTeam} vs {alert.match.awayTeam}
                </h4>
                <p className="text-xs text-green-100">{alert.match.league}</p>
              </div>
              
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <Target className="w-3 h-3" />
                  <span>{alert.market}: {alert.prediction}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{alert.odds.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{alert.match.time}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => dismissAlert(alert.id)}
              className="ml-2 text-green-200 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      
      {alerts.length > 1 && (
        <div className="text-center">
          <button
            onClick={dismissAllAlerts}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Descartar todas las alertas
          </button>
        </div>
      )}
    </div>
  );
}



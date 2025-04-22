import React from 'react';

export type Alert = {
  AlertId: string;
  Headline: string;
  ShortDescription: string;
  FullDescription: string;
  SeverityScore: number;
  SeverityCSS: string;
  Impact: string;
  EventStart: string;
  EventEnd?: string;
  MajorAlert: string;
  AlertURL: string;
  AffectedStations: string[];
  AffectedRoutes: string[];
};

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  return (
    <div className="fade-in-up bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-4 border border-blue-100 transition-transform hover:scale-[1.025] hover:shadow-2xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-900">{alert.Headline}</h2>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${alert.SeverityCSS === 'planned' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>{alert.Impact}</span>
      </div>
      <p className="text-gray-700 mb-2">{alert.ShortDescription}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        <div>
          <span className="font-semibold text-gray-600">Stations:</span> {alert.AffectedStations.join(', ')}
        </div>
        <div>
          <span className="font-semibold text-gray-600">Routes:</span> {alert.AffectedRoutes.join(', ')}
        </div>
      </div>
      <div className="flex items-center text-xs text-gray-500">
        <span>Start: {alert.EventStart}</span>
        {alert.EventEnd && <span className="ml-4">End: {alert.EventEnd}</span>}
      </div>
      <a
        href={alert.AlertURL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-blue-600 hover:underline text-sm"
      >
        View Details
      </a>
    </div>
  );
};

export default AlertCard; 
import React from 'react';
import AlertCard, { type Alert } from './AlertCard';

interface AlertListProps {
  alerts: Alert[];
}

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
  if (!alerts.length) {
    return <div className="text-gray-500">No alerts found.</div>;
  }
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <AlertCard key={alert.AlertId} alert={alert} />
      ))}
    </div>
  );
};

export default AlertList; 
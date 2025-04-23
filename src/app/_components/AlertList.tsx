import React from 'react';
import AlertCard, { type Alert } from './AlertCard';
import { Alert as ShadcnAlert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AlertListProps {
  alerts: Alert[];
}

const AlertList: React.FC<AlertListProps & { highlightFirst?: boolean }> = ({ alerts, highlightFirst }) => {
  if (!alerts.length) {
    return <div className="text-gray-500 text-center">No alerts found.</div>;
  }
  // Sort by EventStart descending
  const sorted = [...alerts].sort((a, b) => new Date(b.EventStart).getTime() - new Date(a.EventStart).getTime());
  const [first, ...rest] = sorted;
  return (
    <div className="flex flex-col items-center w-full">
      {highlightFirst && first && (
        <div className="w-full max-w-xl mb-6">
          <ShadcnAlert className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 border-blue-300 dark:border-blue-700 shadow-xl">
            <AlertTitle className="text-lg font-bold">{first.Headline}</AlertTitle>
            <AlertDescription>
              <span className="block mb-1">{first.ShortDescription}</span>
              <span className="block text-xs text-gray-500">Start: {first.EventStart}</span>
            </AlertDescription>
          </ShadcnAlert>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {(highlightFirst ? rest : sorted).map((alert) => (
          <AlertCard key={alert.AlertId} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default AlertList; 
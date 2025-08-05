import React from 'react';
import { BellOff } from 'lucide-react'; // Optional: using lucide icon for visual

const NoNotificationFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
      <BellOff className="w-12 h-12 mb-4" />
      <h2 className="text-lg font-semibold">No Notifications</h2>
      <p className="text-sm">You're all caught up. We'll let you know when something arrives.</p>
    </div>
  );
};

export default NoNotificationFound;

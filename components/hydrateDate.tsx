import { useMemo, useSyncExternalStore } from 'react';

interface DateProps {
  dateTs: number;
}

const createDateStore = (initialDateTs: number) => {
  let dateTs = initialDateTs;
  let listeners: (() => void)[] = [];

  return {
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },
    getSnapshot: () => dateTs,
    setDateTs: (newDateTs: number) => {
      dateTs = newDateTs;
      listeners.forEach(listener => listener());
    },
  };
};

const formatDate = (dateTs: number): string => {
  // hopefully picks up their locale
  return new Date(dateTs).toLocaleDateString();
};

export const HydrationSafeDate: React.FC<DateProps> = ({ dateTs: initialDateTs }) => {
  const dateStore = useMemo(() => createDateStore(initialDateTs), []);

  const dateTs = useSyncExternalStore(
    dateStore.subscribe,
    dateStore.getSnapshot,
    dateStore.getSnapshot, // Server snapshot
  );

  const formattedDate = formatDate(dateTs);

  return <span>{formattedDate}</span>;
};

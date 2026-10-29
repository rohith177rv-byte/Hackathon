import { createContext, useContext, useState, useCallback } from 'react';

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = useCallback((engineer) => {
    setCompareList(prev => {
      if (prev.length >= 3) return prev;
      if (prev.find(e => e.id === engineer.id)) return prev;
      return [...prev, engineer];
    });
  }, []);

  const removeFromCompare = useCallback((engineerId) => {
    setCompareList(prev => prev.filter(e => e.id !== engineerId));
  }, []);

  const isComparing = useCallback((engineerId) => {
    return compareList.some(e => e.id === engineerId);
  }, [compareList]);

  const toggleCompare = useCallback((engineer) => {
    setCompareList(prev => {
      const exists = prev.some(e => e.id === engineer.id);
      if (exists) {
        return prev.filter(e => e.id !== engineer.id);
      } else {
        if (prev.length >= 3) return prev;
        return [...prev, engineer];
      }
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isComparing,
        isInCompare: isComparing,
        toggleCompare,
        clearCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}

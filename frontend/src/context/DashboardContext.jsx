import { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [savedSchemes, setSavedSchemes] = useState(() => {
    try {
      const item = localStorage.getItem('smartschemes_saved');
      return item ? JSON.parse(item) : [];
    } catch (e) {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const item = localStorage.getItem('smartschemes_recent');
      return item ? JSON.parse(item) : [];
    } catch (e) {
      return [];
    }
  });

  const [applicationProgress, setApplicationProgress] = useState(() => {
    try {
      const item = localStorage.getItem('smartschemes_progress');
      return item ? JSON.parse(item) : {};
    } catch (e) {
      return {};
    }
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('smartschemes_saved', JSON.stringify(savedSchemes));
  }, [savedSchemes]);

  useEffect(() => {
    localStorage.setItem('smartschemes_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('smartschemes_progress', JSON.stringify(applicationProgress));
  }, [applicationProgress]);

  // Saved Schemes API
  const saveScheme = (scheme) => {
    setSavedSchemes(prev => {
      if (prev.some(s => s._id === scheme._id)) return prev;
      return [{ ...scheme, savedAt: new Date().toISOString() }, ...prev];
    });
  };

  const removeSavedScheme = (schemeId) => {
    setSavedSchemes(prev => prev.filter(s => s._id !== schemeId));
  };

  const isSaved = (schemeId) => savedSchemes.some(s => s._id === schemeId);

  // Recently Viewed API
  const addRecentlyViewed = (scheme) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(s => s._id !== scheme._id);
      return [{ ...scheme, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 10);
    });
  };

  // Progress API
  const updateProgress = (schemeId, schemeName, stepsCompleted, totalSteps) => {
    setApplicationProgress(prev => ({
      ...prev,
      [schemeId]: {
        schemeId,
        schemeName,
        stepsCompleted,
        totalSteps,
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  return (
    <DashboardContext.Provider value={{
      savedSchemes, saveScheme, removeSavedScheme, isSaved,
      recentlyViewed, addRecentlyViewed,
      applicationProgress, updateProgress
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface OverviewSidebarContextType {
  activeFolder: number;
  setActiveFolder: React.Dispatch<React.SetStateAction<number>>;
  activeAllForms: boolean;
  setActiveAllForms: React.Dispatch<React.SetStateAction<boolean>>;
  activeTeam: number;
  setActiveTeam: React.Dispatch<React.SetStateAction<number>>;
}

const OverviewSidebarContext = createContext<OverviewSidebarContextType>({
  activeFolder: 0,
  setActiveFolder: () => {},
  activeAllForms: true,
  setActiveAllForms: () => {},
  activeTeam: -1,
  setActiveTeam: () => {},
});

export const OverviewSidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeFolder, setActiveFolder] = useState<number>(-1);
  const [activeAllForms, setActiveAllForms] = useState<boolean>(true);
  const [activeTeam, setActiveTeam] = useState<number>(-1);

  return (
    <OverviewSidebarContext.Provider
      value={{
        activeFolder,
        setActiveFolder,
        activeAllForms,
        setActiveAllForms,
        activeTeam,
        setActiveTeam,
      }}
    >
      {children}
    </OverviewSidebarContext.Provider>
  );
};

export const useOverviewSidebars = () => useContext(OverviewSidebarContext);

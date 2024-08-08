// context/UserContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";

interface Dashboard {
  id: number;
  title: string;
}

interface DashboardContextType {
  dashboard: Dashboard | null;
  setDashboard: (user: Dashboard | null) => void;
}

// Context 생성
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
}

// Context Provider 컴포넌트 생성
export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  return (
    <DashboardContext.Provider value={{ dashboard, setDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Context를 사용하는 커스텀 훅 생성
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

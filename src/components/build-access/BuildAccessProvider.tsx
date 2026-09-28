"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BuildAccessModal } from "@/components/build-access/BuildAccessModal";

type BuildAccessContextValue = {
  isOpen: boolean;
  openBuildAccess: () => void;
  closeBuildAccess: () => void;
};

const BuildAccessContext = createContext<BuildAccessContextValue | null>(null);

const ACCESS_HASH = "#access";

function clearAccessHash() {
  if (typeof window === "undefined") return;
  if (window.location.hash !== ACCESS_HASH) return;
  const { pathname, search } = window.location;
  window.history.replaceState(null, "", `${pathname}${search}`);
}

export function BuildAccessProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBuildAccess = useCallback(() => {
    setIsOpen(true);
    clearAccessHash();
  }, []);

  const closeBuildAccess = useCallback(() => {
    setIsOpen(false);
    clearAccessHash();
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === ACCESS_HASH) {
        setIsOpen(true);
        clearAccessHash();
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const value = useMemo(
    () => ({ isOpen, openBuildAccess, closeBuildAccess }),
    [isOpen, openBuildAccess, closeBuildAccess]
  );

  return (
    <BuildAccessContext.Provider value={value}>
      {children}
      {isOpen ? <BuildAccessModal open onClose={closeBuildAccess} /> : null}
    </BuildAccessContext.Provider>
  );
}

export function useBuildAccess() {
  const context = useContext(BuildAccessContext);
  if (!context) {
    throw new Error("useBuildAccess must be used within BuildAccessProvider");
  }
  return context;
}

import React, { createContext, useContext, useState, ReactNode } from "react";

type Ccps = {
  id: number;
  nomeCcps: string;
  cidade: string;
  estado: string;
  endereco: string;
  cep: string;
  telefone: string;
  cnpj: string;
  codigoAprovado: string;
  dataValidade: string;
};

type CcpsContextType = {
  ccps: Ccps | null;
  setCcps: (data: Ccps) => void;
  limparCcps: () => void;
};

const CcpsContext = createContext<CcpsContextType | undefined>(undefined);

export const CcpsProvider = ({ children }: { children: ReactNode }) => {
  const [ccps, setCcpsState] = useState<Ccps | null>(null);

  const setCcps = (data: Ccps) => setCcpsState(data);
  const limparCcps = () => setCcpsState(null);

  return (
    <CcpsContext.Provider value={{ ccps, setCcps, limparCcps }}>
      {children}
    </CcpsContext.Provider>
  );
};

export const useCcps = () => {
  const context = useContext(CcpsContext);
  if (!context) {
    throw new Error("useCcps deve ser usado dentro de um CcpsProvider");
  }
  return context;
};

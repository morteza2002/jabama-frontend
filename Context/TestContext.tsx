"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface TestData {
  //   residenceId: number | null;
  meliCode: number ;
  fatherName: string;
}

interface TextContextType {
  test: TestData;
  //   setResidence: (id: number, name: string, image: string) => void;
  setMeliCode: (meliCode: number) => void;
  setFatherName: (fatherName: string) => void;
}

const initialTest: TestData = {
  //   residenceId: null,

  meliCode: 0,
  fatherName: "",
};

const TestContext = createContext<TextContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
  const [test, setTest] = useState<TestData>(initialTest);

  const setMeliCode = (meliCode: number) => {
    setTest((prev) => ({
      ...prev,
      meliCode,
    }));
  };

  const setFatherName = (fatherName: string) => {
    setTest((prev) => ({
      ...prev,
      fatherName,
    }));
  };

  return (
    <TestContext.Provider
      value={{
        test,
        setMeliCode,
        setFatherName,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);

  if (!context) {
    throw new Error("usetest باید داخل testcontext استفاده شده است");
  }

  return context;
}

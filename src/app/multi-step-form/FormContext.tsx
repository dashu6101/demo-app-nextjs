"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FormData = {
    selectedOptions: string[];
    textInput: string;
    image: File | null;
};

const FormContext = createContext<any>(null);

export const FormProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<FormData>({
        selectedOptions: [],
        textInput: "",
        image: null,
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => useContext(FormContext);

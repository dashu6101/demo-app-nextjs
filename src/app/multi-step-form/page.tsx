"use client";

import MultiStepForm from "@/app/multi-step-form/MultiStepForm";
import { FormProvider } from "@/app/multi-step-form/FormContext";

export default function MultiStepFormPage() {
    return (
        <FormProvider>
            <MultiStepForm />
        </FormProvider>
    );
}

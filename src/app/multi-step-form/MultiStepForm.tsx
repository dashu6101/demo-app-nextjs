"use client";

import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Confirmation from "./Confirmation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import Button from "@/components/UI/Button";

export interface FormData {
    selectedOptions: string[];
    textInput: string;
    uploadedFile: File | null;
}

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        selectedOptions: [],
        textInput: "",
        uploadedFile: null,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = () => {
        console.log("Form data:", formData);
        setIsSubmitted(true);
    };

    const resetForm = () => {
        setCurrentStep(1);
        setFormData({
            selectedOptions: [],
            textInput: "",
            uploadedFile: null,
        });
        setIsSubmitted(false);
    };

    const getStepTitle = () => {
        const titles = {
            1: "Step 1: Select Options",
            2: "Step 2: About You",
            3: "Step 3: Upload Image"
        };
        return titles[currentStep as keyof typeof titles] || "";
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background p-4">
                <div className="container mx-auto max-w-2xl">
                    <Link href="/">
                        <Button className="mb-4" text="Back" variant="outline" />
                    </Link>
                    <Confirmation formData={formData} onStartOver={resetForm} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="container mx-auto max-w-2xl">
                <Link href="/">
                    <Button className="mb-4" text="Back" variant="outline" />
                </Link>

                <h1 className="text-3xl font-bold mb-6">Multi-Step Form</h1>

                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep ? "bg-primary text-primary-foreground cursor-pointer" : "bg-muted text-muted-foreground cursor-pointer"
                                    }`}>
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div className={`h-1 w-24 mx-2 ${step < currentStep ? "bg-primary cursor-pointer" : "bg-muted cursor-pointer"}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{getStepTitle()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {currentStep === 1 && (
                            <Step1 formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
                        )}
                        {currentStep === 2 && (
                            <Step2 formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
                        )}
                        {currentStep === 3 && (
                            <Step3 formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} onPrev={prevStep} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

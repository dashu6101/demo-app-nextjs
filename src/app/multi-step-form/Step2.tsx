import { useEffect, useState } from "react";
import { useForm } from "./FormContext";
import { FormData } from "./MultiStepForm";
import Button from "@/components/UI/Button";
import TextInput from "@/components/UI/TextInput";

interface StepTwoProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function Step2({ formData, updateFormData, onNext, onPrev }: StepTwoProps) {
    const [textInput, setTextInput] = useState(formData.textInput);

    const handleNext = () => {
        updateFormData({ textInput });
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="about" className="text-lg font-medium">
                    Tell us about yourself
                </label>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                    Share your background or interests
                </p>

                <TextInput
                    id="about"
                    placeholder="I'm interested in technology because..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
            </div>

            <div className="flex justify-between">
                <Button onClick={onPrev} text="Back" variant="outline" />
                <Button onClick={handleNext} disabled={!textInput.trim()} text="Next" />
            </div>
        </div>
    );
}

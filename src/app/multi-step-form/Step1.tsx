import { useState } from "react";
import { useForm } from "./FormContext";
import { FormData } from "./MultiStepForm";
import Button from "@/components/UI/Button";

interface StepOneProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const options = [
    { id: "web-dev", label: "Web Development" },
    { id: "mobile-dev", label: "Mobile Development" },
    { id: "data-science", label: "Data Science" },
    { id: "ui-ux", label: "UI/UX Design" },
    { id: "devops", label: "DevOps" },
];

export default function Step1({ formData, updateFormData, onNext, onPrev }: StepOneProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(formData.selectedOptions);

    const handleOptionChange = (optionId: string, checked: boolean) => {
        const newSelected = checked
            ? [...selectedOptions, optionId]
            : selectedOptions.filter(id => id !== optionId);

        setSelectedOptions(newSelected);
        updateFormData({ selectedOptions: newSelected });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium mb-4">What interests you?</h3>

                <div className="space-y-3">
                    {options.map((option) => {
                        const isChecked = selectedOptions.includes(option.id);
                        return (
                            <div
                                key={option.id}
                                className="flex items-center space-x-2 p-2 rounded-md transition"
                            >
                                <input
                                    type="checkbox"
                                    id={option.id}
                                    checked={isChecked}
                                    onChange={(e) => handleOptionChange(option.id, e.target.checked)}
                                    className={isChecked ? "accent-primary" : "accent-gray-300"}
                                />
                                <label
                                    htmlFor={option.id}
                                    className="text-sm font-medium cursor-pointer"
                                >
                                    {option.label}
                                </label>
                            </div>
                        );
                    })}
                </div>


                {/* <div className="space-y-3">
                    {options.map((option) => (
                        <div key={option.id}
                         className="flex items-center space-x-2"
                         >
                            <input type="checkbox"
                                id={option.id}
                                checked={selectedOptions.includes(option.id)}
                                onChange={(checked) => handleOptionChange(option.id, checked.target.checked as boolean)}
                            />
                            <label htmlFor={option.id} className="text-sm font-medium cursor-pointer">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div> */}
            </div>

            <div className="flex justify-between">
                <Button disabled onClick={onPrev} text="Back" variant="outline" />
                <Button onClick={onNext} disabled={selectedOptions.length === 0} text="Next" />
            </div>
        </div>
    );
}
import { CheckCircle } from "lucide-react";
import { useForm } from "./FormContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { FormData } from "./MultiStepForm";
import Button from "@/components/UI/Button";
import { Badge } from "@/components/UI/Badge";

interface ConfirmationStepProps {
    formData: FormData;
    onStartOver: () => void;
}

const optionLabels: Record<string, string> = {
    "web-dev": "Web Development",
    "mobile-dev": "Mobile Development",
    "data-science": "Data Science",
    "ui-ux": "UI/UX Design",
    "devops": "DevOps",
};

export default function Confirmation({ formData, onStartOver }: ConfirmationStepProps) {
    return (
        <Card>
            <CardHeader className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Form Submitted!</CardTitle>
                <p className="text-muted-foreground">Here's your submission summary:</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-3">Selected Interests:</h3>
                    <div className="flex flex-wrap gap-2">
                        {formData.selectedOptions.map((option) => (
                            // <Badge key={option} variant="secondary">
                            //     {optionLabels[option] || option}
                            // </Badge>
                            <Badge variant="secondary">
                                {optionLabels[option] || option}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">About You:</h3>
                    <Card>
                        <CardContent className="p-4 pt-4">
                            <p className="text-sm">{formData.textInput}</p>
                        </CardContent>
                    </Card>
                </div>

                {formData.uploadedFile && (
                    <div>
                        <h3 className="font-semibold mb-3">Uploaded Image:</h3>
                        <Card>
                            <CardContent className="p-4 pt-4">
                                <img
                                    src={URL.createObjectURL(formData.uploadedFile)}
                                    alt="Upload"
                                    className="w-full max-w-xs mx-auto rounded-lg"
                                />
                                <p className="text-sm text-muted-foreground mt-2 text-center">
                                    {formData.uploadedFile.name}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                <div className="pt-4 text-center">
                    <Button onClick={onStartOver} text="Start Over" />
                </div>
            </CardContent>
        </Card>
    );
}
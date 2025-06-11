import { useState, useRef } from "react";
import { useForm } from "./FormContext";
import { Upload, X } from "lucide-react";
import { Card, CardContent } from "@/components/UI/Card";
import { FormData } from "./MultiStepForm";
import Button from "@/components/UI/Button";

interface StepThreeProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    onSubmit: () => void;
    onPrev: () => void;
}

export default function Step3({ formData, updateFormData, onSubmit, onPrev }: StepThreeProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            updateFormData({ uploadedFile: file });
            const reader = new FileReader();
            reader.onload = (e) => setPreviewUrl(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const removeFile = () => {
        updateFormData({ uploadedFile: null });
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="text-lg font-medium">Upload Image (optional)</label>
                <p className="text-sm text-muted-foreground mt-1 mb-4">Choose a profile image</p>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {previewUrl ? (
                    <Card>
                        <CardContent className="p-4 pt-4">
                            <div className="relative">
                                <img src={previewUrl} alt="Preview" className="w-full max-w-xs mx-auto rounded-lg" />
                                <Button className="absolute top-2 right-2" variant="destructive" onClick={removeFile} text="X" />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 text-center">
                                {formData.uploadedFile?.name}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="cursor-pointer border-dashed" onClick={() => fileInputRef.current?.click()}>
                        <CardContent className="p-8 pt-4">
                            <div className="text-center">
                                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-lg font-medium mb-2">Click to upload image</p>
                                <p className="text-sm text-muted-foreground">JPG, PNG up to 10MB</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="flex justify-between">
                <Button onClick={onPrev} text="Back" variant="outline" />
                <Button onClick={onSubmit} text="Submit" />
            </div>
        </div>
    );
}
import React from "react";

type FileUploadProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FileUpload({ onChange }: FileUploadProps) {
    return <input type="file" onChange={onChange} className="border p-2 rounded" />;
}
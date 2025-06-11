import React from "react";

type TextInputProps = {
    id: string,
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

export default function TextInput({ id, value, onChange, placeholder }: TextInputProps) {
    return (
        <input
            id={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border rounded px-3 py-2 w-full"
        />
    );
}   
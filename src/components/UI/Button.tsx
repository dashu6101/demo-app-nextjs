import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

type ButtonProps = {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
    size?: "default" | "sm" | "lg" | "icon" | null | undefined,
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
};

export default function Button({ variant = "default", size = "default", text, onClick, disabled, className }: ButtonProps) {
    return (
        <button
            className={buttonVariants({ variant, size, className })}
            {...(onClick ? { onClick } : {})}
            // onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
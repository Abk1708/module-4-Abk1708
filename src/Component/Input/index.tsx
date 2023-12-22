import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputOrTextareaProps = {
    inputType?: "text" | "password" | "number" | "email" | "date" | "textarea";
} & (InputProps | TextareaProps);

const Input = ({ inputType = "text", ...props }: InputOrTextareaProps) => {
    if (inputType === "textarea") {
        return (
            <textarea
                {...(props as TextareaProps)}
                className={`${props.className} block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
            />
        );
    } else {
        return (
            <input
                type={inputType}
                {...(props as InputProps)}
                className={`${props.className} block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
            />
        );
    }
};

export default Input;

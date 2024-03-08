import { Link } from "react-router-dom";

type ButtonWarningPropsType = {
    label: string;
    buttonText: string;
    to: string;
}

export function BottomWarning({label, buttonText, to}: ButtonWarningPropsType) {
    return (
        <div className="flex justify-center text-sm font-medium py-1 text-gray-500">
            <div>{label}</div>
            <Link className="underline px-1" to={to}>{buttonText}</Link>
        </div>
    )
}
import { Link } from "react-router-dom";

type Props = {
    path: string;
    children: React.ReactNode;
}

export default function LinkButton({ path, children }: Props) {
    return (
        <Link to={path} className="bg-blue-700 py-2 px-4 rounded">
            {children}
        </Link>
    );
}
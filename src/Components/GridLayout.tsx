import { ReactNode } from "react";

type Props = {
    children: ReactNode
};

export default function GridLayout({ children }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {children}
        </div>
    );
}
export default function SkeletonDetails() {
    return (
        <div className="p-12 w-screen h-full" data-testid="skeleton-details">
            <button className="bg-blue-700 py-2 px-4 h-6 w-12 rounded"></button>
            <div className="max-w-3xl mx-auto border border-neutral-700 p-6 rounded-lg bg-neutral-800">
                <div className="mb-2 bg-gray-700 animate-pulse h-6 w-full"></div>
                <div className="mb-4 w-60 h-60 bg-gray-700 animate-pulse rounded-lg flex-shrink-0"></div>
                <div className="mb-2 bg-gray-700 animate-pulse h-10 w-full"></div>
                <div className="mb-2 bg-gray-700 animate-pulse h-6 w-1/3"></div>
                <div className="mb-2 bg-gray-700 animate-pulse h-6 w-1/3"></div>
            </div>
        </div>
    )
}
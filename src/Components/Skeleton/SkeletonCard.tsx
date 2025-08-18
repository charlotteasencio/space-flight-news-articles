export default function SkeletonCard() {
    return (
        <div className="block rounded-lg bg-neutral-800 text-white h-[460px] flex flex-col overflow-hidden" data-testid="skeleton-card">
            <div className="mb-2 h-48 w-full bg-gray-700 animate-pulse rounded-lg flex-shrink-0"></div>
            <div className="p-4 flex justify-between flex-col flex-1">
                <div>
                    <div className="mb-2 text-lg font-medium bg-gray-700 animate-pulse h-6 w-3/4"></div>
                    <div className="bg-gray-700 animate-pulse h-12 w-full"></div>
                </div>
                <div className="flex justify-end flex-shrink-0">
                    <button className="bg-blue-500 py-2 px-4 rounded h-6 w-12"></button>
                </div>
            </div>
        </div>
    )
}
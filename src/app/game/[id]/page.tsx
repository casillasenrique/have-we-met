
export const dynamic = "force-dynamic"; // Ensure dynamic rendering for this route

type GameCache = {
    [key: string]: { data: any; timestamp: number };
};

declare global {
    // eslint-disable-next-line no-var
    var __gameCache: GameCache | undefined;
}

async function fetchGameData(id: string) {
    const CACHE_TTL = 60 * 1000; // Cache for 1 minute
    const cache: GameCache = globalThis.__gameCache || (globalThis.__gameCache = {});

    const cacheKey = `game-${id}`;
    const now = Date.now();

    // Check if the data is in the cache and still valid
    if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL) {
        console.log(`Cache hit for ID ${id}`);
        return cache[cacheKey].data;
    }

    // Fetch data from the external API
    console.log(`Cache miss for ID ${id}, retrieving from API`);
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data for ID ${id}`);
    }

    const data = await response.json();

    // Cache the response
    cache[cacheKey] = { data, timestamp: now };

    return data;
}

export default async function Game({ params }: { params: { id: string } }) {
    // Await params, Next.js 15 are resolved asynchronously, but are still
    // resolved server-side.
    const { id } = await params;

    try {
        const data = await fetchGameData(id);

        return (
            <div>
                <h1>Game ID: {id}</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        );
    } catch (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{(error as Error).message}</p>
            </div>
        );
    }
}

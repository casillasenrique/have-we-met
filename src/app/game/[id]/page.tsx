
export const dynamic = "force-dynamic"; // Ensure dynamic rendering for this route

/**
 * The global cache object to store game data.
 */
type GameCache = {
    [gameId: number]: { data: any; timestamp: number };
};

declare global {
    // eslint-disable-next-line no-var
    var __gameCache: GameCache | undefined;
}

// todo(enrique) Make this actually work and use it
async function fetchNextMetObjectId() {
    const cache: GameCache = globalThis.__gameCache || (globalThis.__gameCache = {});

    // Generate a random ID for the next game object
    let randomId = Math.floor(Math.random() * 100000); // Adjust the range as needed
    // Check if the ID is already cached
    while (cache[randomId]) {        
        console.log(`ID ${randomId} already exists in cache, generating a new one`);
        randomId = Math.floor(Math.random() * 100000); // Regenerate if it exists
    }

    // Check if the object is actually in the Met Museum collection using the gallery field
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`);
    if (!response.ok) {
        console.error(`Failed to fetch data for ID ${randomId}, status: ${response.status}`);
        // return fetchNextMetObjectId(); // Recursively fetch a new ID if the request fails
        throw new Error(`Failed to fetch data for ID ${randomId}`); // Throw an error if the request fails
    }
    const data = await response.json();
    if (!data.objectID || !data.gallery) {
        console.log(`ID ${randomId} is not a valid Met object or does not have a gallery`);
        return fetchNextMetObjectId(); // Recursively fetch a new ID
    }

    // Cache the valid ID
    cache[randomId] = { data, timestamp: Date.now() };
    console.log(`Generated new Met object ID: ${randomId}`);
    return randomId;
}

async function fetchGameData(id: number) {
    const CACHE_TTL = 60 * 1000; // Cache for 1 minute
    const cache: GameCache = globalThis.__gameCache || (globalThis.__gameCache = {});

    const now = Date.now();

    // Check if the data is in the cache and still valid
    if (cache[id]) {
        console.log(`Cache hit for ID ${id}`);
        return cache[id].data;
    }

    // Else get the next game object ID
    // const mappedObjectId = await fetchNextMetObjectId();
    const mappedObjectId = id; // For simplicity, using the provided ID directly for now

    // Fetch data from the external API
    console.log(`Cache miss for ID ${mappedObjectId}, retrieving from API`);
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${mappedObjectId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data for ID ${mappedObjectId}`);
    }

    const data = await response.json();

    // Cache the response
    cache[id] = { data, timestamp: now };

    return data;
}

export default async function Game({ params }: { params: { id: string } }) {
    // Await params, Next.js 15 are resolved asynchronously, but are still
    // resolved server-side.
    const { id } = await params;
    const gameId = parseInt(id, 10);

    try {
        const data = await fetchGameData(gameId);

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

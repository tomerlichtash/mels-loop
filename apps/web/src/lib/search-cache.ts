export type CacheEntry = { version: string; data: unknown };

const DB_NAME = 'ml-search';
const STORE_NAME = 'indexes';

function openDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			req.result.createObjectStore(STORE_NAME);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}

export async function getCache(key: string): Promise<CacheEntry | undefined> {
	try {
		const db = await openDB();
		return new Promise((resolve) => {
			const tx = db.transaction(STORE_NAME, 'readonly');
			const req = tx.objectStore(STORE_NAME).get(key);
			req.onsuccess = () => resolve(req.result as CacheEntry | undefined);
			req.onerror = () => resolve(undefined);
		});
	} catch {
		return undefined;
	}
}

export async function setCache(key: string, entry: CacheEntry): Promise<void> {
	try {
		const db = await openDB();
		return new Promise((resolve) => {
			const tx = db.transaction(STORE_NAME, 'readwrite');
			tx.objectStore(STORE_NAME).put(entry, key);
			tx.oncomplete = () => resolve();
			tx.onerror = () => resolve();
		});
	} catch {
		// silent — IndexedDB unavailable
	}
}

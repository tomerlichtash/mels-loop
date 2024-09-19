import path from 'path';

const CONTENT_PATH = 'public/content/';

let rootDir: string;

export const setContentRootDir = (root: string): void => {
	rootDir = path.join(root, CONTENT_PATH);
};

export const getContentRootDir = (root?: string): string =>
	root ? path.join(root, CONTENT_PATH) : rootDir;

// export function setContentRootDir(root: string): void {
//   rootDir = path.join(root, CONTENT_PATH);
// }

// export function getContentRootDir(root?: string): string {
//   return root ? path.join(root, CONTENT_PATH) : rootDir;
// }

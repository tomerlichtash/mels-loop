import { setContentDir } from '@mels-loop/content-pipeline/loaders';
import path from 'path';

setContentDir(path.resolve(process.cwd(), '../../content'));

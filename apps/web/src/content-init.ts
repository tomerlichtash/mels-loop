import { createContentPlugins } from '@mels-loop/content/plugins';
import {
	setContentDir,
	setPluginBuilder,
} from '@mels-loop/content-pipeline/loaders';
import path from 'path';

setContentDir(path.resolve(process.cwd(), '../../content'));
setPluginBuilder(createContentPlugins);

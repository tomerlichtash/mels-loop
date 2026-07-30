import {
	setContentDir,
	setPluginBuilder,
} from '@mels-loop/content-pipeline/loaders';
import { createContentPlugins } from '@mels-loop/content-plugins';
import path from 'path';

setContentDir(path.resolve(process.cwd(), '../../content'));
setPluginBuilder(createContentPlugins);

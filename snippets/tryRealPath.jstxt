// substitute in node_modules\jest-util\build\tryRealpath.js
function tryRealpath(path) {
	try {
	  if (path && /[\\\/]temp/i.test) {
		  return path;
	  }
	  path = _gracefulFs().realpathSync.native(path);
	} catch (error) {
	  if (error.code !== 'ENOENT') {
		throw error;
	  }
	}
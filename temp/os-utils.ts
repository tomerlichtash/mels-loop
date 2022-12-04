interface IProcessOutput {
	readonly output: string;
	readonly error: string;
	readonly status: number;
}

export interface IProcessOptions {
	/**
	 * command name as typed in console
	 */
	exe: string;
	/**
	 * arguments
	 */
	argv: string[];
	/**
	 * Optional working directory
	 */
	cwd?: string
}


export interface IMLProcessUtils {
	 captureProcessOutput(options: IProcessOptions): Promise<IProcessOutput>;
}

class MLProcessUtils implements IMLProcessUtils {

	public async captureProcessOutput({ cwd, exe, argv }: IProcessOptions): Promise<IProcessOutput> {
		const cp = require("child_process");
		return new Promise((resolve, reject) => {
			try {
				const output: string[] = [];
				const err: string[] = [];
				const proc = cp.spawn(exe, argv, {
					cwd: cwd || process.cwd()
				});
				proc.stderr.on('data', data => {
					err.push(String(data));
				});
				proc.stdout.on('data', data => {
					output.push(String(data));
				});

				proc.on('close', function () {
					resolve({
						output: output.join(''),
						error: err.join(''),
						status: proc.exitCode!
					});
				});

				proc.on('error', function (e) {
					resolve({
						output: output.join(''),
						error: String(e),
						status: proc.exitCode!
					});
				});
			}
			catch (e) {
				resolve({
					error: String(e),
					output: "",
					status: -1
				})
			}
		})
	}}

export const osUtils: IMLProcessUtils = new MLProcessUtils();

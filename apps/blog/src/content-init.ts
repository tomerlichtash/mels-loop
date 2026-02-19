import path from "path";
import { setContentDir } from "@mels-loop/content-pipeline/loaders";

setContentDir(path.resolve(process.cwd(), "../../content"));

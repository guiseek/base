import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export const configuration = <R extends Record<string, any>>(path: string) => {
  return yaml.load(readFileSync(join(__dirname, path), 'utf8')) as R;
};

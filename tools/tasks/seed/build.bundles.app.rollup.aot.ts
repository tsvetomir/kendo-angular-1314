import Config from '../../config';
import { writeFile } from 'fs';
import { join } from 'path';

const alias = require('rollup-plugin-alias');
const commonjs = require('rollup-plugin-commonjs');
const includePaths = require('rollup-plugin-includepaths');
const nodeResolve = require('rollup-plugin-node-resolve');
const path = require('path');
const process = require('process');
const rollup = require('rollup');

const config = {
  entry: join(Config.TMP_DIR, Config.BOOTSTRAP_FACTORY_PROD_MODULE),
  sourceMap: true,
  treeshake: true,
  moduleName: 'main',
  plugins: [
    alias({
      jszip: path.join(process.cwd(), './node_modules/jszip/dist/jszip.min.js')
    }),
    includePaths({
      include: {},
      paths: [join(Config.TMP_DIR, 'app')],
      external: [],
      extensions: ['.js', '.json', '.html', '.ts']
    }),
    nodeResolve({
      jsnext: true, main: true, module: true
    }),
    commonjs({ //See project.config.ts to extend
      include: Config.ROLLUP_INCLUDE_DIR,
      namedExports: Config.getRollupNamedExports()
    })
  ]
};


export = (done: any) => {
  rollup.rollup(config)
    .then((bundle: any) => {
      const result = bundle.generate({
        format: 'iife'
      });
      const path = join(Config.TMP_DIR, 'bundle.js');
      writeFile(path, result.code, (error: any) => {
        if (error) {
          console.error(error);
          process.exit(0);
        }
        done();
      });
    })
    .catch((error: any) => {
      console.error(error);
      process.exit(0);
    });
};

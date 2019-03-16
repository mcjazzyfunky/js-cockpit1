import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import typescript from 'rollup-plugin-typescript2'
import { uglify as uglifyJS } from 'rollup-plugin-uglify'
import uglifyES from 'rollup-plugin-uglify-es'
import gzip from 'rollup-plugin-gzip'

function createRollupConfig(moduleFormat, productive) {
  return {
    input: 'src/main/js-cockpit.ts',

    output: {
      file: productive
        ? `dist/js-cockpit.${moduleFormat}.production.js`
        : `dist/js-cockpit.${moduleFormat}.development.js`,

      format: moduleFormat,
      name: 'jsCockpit', 
      sourcemap: false, // TODO: productive ? false : 'inline',

      globals: {
        'color': 'Color',
        'js-react-store': 'jsReactStore',
        'js-react-utils': 'jsReactUtils',
        'js-spec': 'jsSpec',
        'office-ui-fabric-react': 'Fabric',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-virtualized': 'ReactVirtualized',
        'rxjs': 'rxjs'
      },
      external: [
        'color',
        'rs-react-store',
        'js-react-utils',
        'js-spec',
        'office-ui-fabric-react',
        'react',
        'react-dom',
        'react-virtualized',
        'rxjs'
      ],
    },


    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        include: 'node_modules/**',
        
        // TODO - what's the problem here?
        namedExports: {
          'react-dom': [
            'render',
            'createPortal',
            'findDOMNode'
          ],
          'js-react-utils': [
            'defineComponent',
            'defineContext',
            'isElement',
            'isElementOfType',
            'isNode',
            'withChildren'
          ],
          'js-spec/dev-only': [
            'Spec'
          ]
        },
      }),
      /*
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        include: 'node_modules/**',
        
        namedExports: {
          'js-react-utils': [
            'defineComponent',
            'defineContext',
            'isElementOfType',
            'isNode',
            'withChildren'
          ],
          'js-spec/dev-only': [
            'Spec'
          ]
        },
      }),
      */
      typescript({
        exclude: 'node_modules/**'
      }),
      replace({
        exclude: 'node_modules/**',
        
        values: {
          'process.env.NODE_ENV': productive ? "'production'" : "'development'"
        }
      }),
      productive && (moduleFormat === 'esm' ? uglifyES() : uglifyJS()),
      productive && gzip()
    ],
  }
}

const configs = []

for (const format of ['umd', /*'cjs', 'amd', 'esm'*/]) {
  for (const productive of [true, false]) {
    configs.push(createRollupConfig(format, productive))
  }
}

export default configs

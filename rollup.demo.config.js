import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/demo/run.tsx',
  output: {
    file: './build/demo.js',
    format: 'umd',
    name: 'jsCockpitDemo',
    sourcemap: false,

    globals: {
      'chance': 'chance',
      'js-react-utils': 'jsReactUtils',
      'js-react-store': 'jsReactStore',
      'js-spec': 'jsSpec',
      'js-spec/dev-only': 'jsSpec',
      'office-ui-fabric-react': 'Fabric',
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-virtualized': 'ReactVirtualized',
      'rxjs': 'rxjs'
    },
  },

  external: [
    'chance',
    'js-react-utils',
    'js-react-store',
    'js-spec',
    'js-spec/dev-only',
    'office-ui-fabric-react',
    'react',
    'react-dom',
    'react-virtualized',
    'rxjs'
  ],

  plugins: [
    resolve(),
    commonjs(),
    postcss(),
    replace({
      exclude: 'node_modules/**',
      
      values: {
        'process.env.NODE_ENV': "'development'"
      }
    }),
    typescript({
      tsconfigOverride: {
        include: ['./src/main/**/*.ts*', './src/demo/**/*.ts*']
      }
    }),
    serve({
      open: true,
      contentBase: '.',
      openPage: '/src/demo/index.html'
    }),
    livereload({
      watch: ['src/demo/', 'build']
    })
  ]
}

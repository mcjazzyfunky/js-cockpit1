import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/demo/demo.tsx',
  output: {
    file: './build/demo.js',
    format: 'umd',
    name: 'jsCockpit',

    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'js-react-utils': 'jsReactUtils',
      'js-react-store': 'jsReactStore',
      'js-spec': 'jsSpec',
      'js-spec/dev-only': 'jsSpec',
      'office-ui-fabric-react': 'Fabric',
      'react-virtualized': 'ReactVirtualized',
      'faker': 'Faker'
    },
  },

  external: ['react', 'react-dom', 'js-react-utils', 'js-react-store', 'js-spec', 'js-spec/dev-only', 'office-ui-fabric-react', 'react-virtualized'],


  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    /*
  
    resolve({
      main: true,
      module: true,
      jsnext: true,
    }),
    //commonjs({
   //   include: 'node_modules/**',
   // }),
   */
    replace({
      exclude: 'node_modules/**', // TODO
      
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
      openPage: '/src/demo/demo.html'
    }),
    livereload({
      watch: ['src/demo/', 'build']
    })
  ]
}

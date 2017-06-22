const fs = require('fs')
const rollup = require('rollup').rollup
const uglify = require('uglify-js')
const babel = require('rollup-plugin-babel')
const nodeResolve = require('rollup-plugin-node-resolve')

rollup({
	entry: 'src/index.js',
	plugins: [
		babel()
	],
	external: []
}).then(bundle => {
	bundle.write({
		format: 'cjs',
		dest: 'dist/<%= appname %>.commonjs.js'
	})
	bundle.write({
		format: 'umd',
		moduleName: '<%= appname %>',
		dest: 'dist/<%= appname %>.umd.js'
	})
})

rollup({
	entry: 'src/index.js',
	plugins: [
		babel(),
		nodeResolve({jsnext: true, browser: true})
	]
}).then(bundle => {
	let result = bundle.generate({
		format: 'umd',
		moduleName: '<%= appname %>'
	})

	fs.writeFileSync('./dist/<%= appname %>.debug.js', result.code)

	let min = uglify.minify(result.code)

	fs.writeFileSync('./dist/<%= appname %>.min.js', min.code)
}).catch(e => {
	console.log(e)
})
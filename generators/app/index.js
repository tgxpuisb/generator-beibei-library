"use strict"

const generators = require('yeoman-generator')

module.exports = class Main extends generators {
	constructor (args, opts) {
		super(args, opts)
		this.QUESTIONS = [
			{
				type: 'input',
				name: 'appname',
				message: '项目名称?',
				default: this.appname
			},
			{
				type: 'list',
				name: 'builder',
				message: '选用什么打包工具?',
				choices: [
					{
						name: 'Rollup支持tree-shaking,适合打包纯Javascript项目,代码体积小',
						value: 'rollup'
					},
					{
						name: 'webpack2,功能强大,能够打包各种资源文件,适合打包UI组件库',
						value: 'webpack'
					}
				]
			},
			{
				type: 'confirm',
				name: 'hasRegistry',
				message: '是否关联git远程仓库'
			},
			{
				type: 'input',
				name: 'registry',
				message: 'git远程仓库地址',
				when: answers => {
					return answers.hasRegistry
				}
			},
			{
				type: 'confirm',
				name: 'installDependencies',
				message: '是否自动安装依赖'
			},
			{
				type: 'list',
				name: 'origin',
				message: '仓库源',
				list: ['npm', 'taobao', 'beibei'],
				when: answers => {
					return answers.installDependencies
				}
			},
			{
				type: 'list',
				name: 'manager',
				message: '安装方式',
				choices: ['npm', 'cnpm', 'yarn'],
				when: answers => {
					return answers.installDependencies
				}
			}
		]
		this.answers = null
	}

	prompting () {
		this
			.prompt(this.QUESTIONS)
			.then(answers => {
				this.answers = answers
				this.log(this.answers)
				this._writing()
			})
	}

	_writing () {
		if (this.answers.builder === 'rollup') {
			this._genRollupProject()
		} else if (this.answers.builder === 'webpack') {
			this._genWebpackProject()
		}

		this.fs.copyTpl(
			this.templatePath('src/index.js'),
			this.destinationPath('src/' + this.appname + '.js'),
			{
				appname: this.appname
			}
		)

		this.fs.copy(
			this.templatePath('gitignore'),
			this.destinationPath('.gitignore')
		)

		this.fs.copy(
			this.templatePath('README.md'),
			this.destinationPath('README.md')
		)

		this.fs.copy(
			this.templatePath('eslintrc'),
			this.destinationPath('.eslintrc')
		)
	}

	_genWebpackProject () {

		this.fs.copyTpl(
			this.templatePath('_package.webpack.json'),
			this.destinationPath('package.json'),
			{
				appname: this.appname,
				name: this.user.git.name(),
				email: this.user.git.email()
			}
		)

		this.fs.copyTpl(
			this.templatePath('webpack_build/webpack.config.js'),
			this.destinationPath('webpack.config.js'),
			{
				appname: this.appname
			}
		)

		this.fs.copy(
			this.templatePath('webpack_babelrc'),
			this.destinationPath('.babelrc')
		)

	}

	_genRollupProject () {

		this.fs.copyTpl(
			this.templatePath('_package.rollup.json'),
			this.destinationPath('package.json'),
			{
				appname: this.appname,
				name: this.user.git.name(),
				email: this.user.git.email()
			}
		)

		this.fs.copyTpl(

			this.templatePath('rollup_build/config.js'),
			this.destinationPath('rollup.config.js'),
			{
				appname: this.appname
			}
		)

		this.fs.copy(
			this.templatePath('rollup_babelrc'),
			this.destinationPath('.babelrc')
		)

	}

}









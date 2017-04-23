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
				choices: ['npm', 'cnpm', 'yarn']
				when: answers => {
					return answers.installDependencies
				}
			}
		]
	}

	prompting () {
		this
			.prompt(this.QUESTIONS)
			.then(answers => {
				this.log(answers)
			})
	}

	writing () {

	}

}









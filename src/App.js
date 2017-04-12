import AppStyles from './styles/App.scss'
import {Bubbles} from './bubbles/index.js'

const modulesList = [Bubbles]

modulesList.forEach(function(mod) {
	new mod()
})

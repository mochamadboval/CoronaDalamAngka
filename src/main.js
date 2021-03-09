import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faBars, faCalendarDay, faCode, faGlobeAsia, faHandsWash, faHeadSideMask, faMapMarkerAlt, faMars, faPeopleArrows, faSearchLocation, faVenus, faVirus } from '@fortawesome/free-solid-svg-icons'
import { faBootstrap, faCss3Alt, faFontAwesome, faGithub, faHtml5, faJsSquare, faVuejs } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faBars, faVirus, faGlobeAsia, faMapMarkerAlt, faHeadSideMask, faPeopleArrows, 
  faHandsWash, faCalendarDay, faAngleUp, faSearchLocation, faMars, faVenus, faCode, 
  faHtml5, faCss3Alt, faJsSquare, faBootstrap, faVuejs, faGithub, faFontAwesome
)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

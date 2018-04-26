import { expect } from 'chai'
import { shallow } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App.vue', () => {

  const wrapper = shallow(App)

  it('renders SHPR', () => {
    expect(wrapper.html().toContain('<th scope="col">Shanghai Pizza Rankings</th>'))
  })
})
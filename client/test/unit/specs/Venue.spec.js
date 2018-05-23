import {expect} from 'chai'
import { shallowMount } from '@vue/test-utils'
import Venue from '../../../src/components/Venue'

describe('Venue.vue', () => {
  it('renders ', () => {
    const wrapper = shallowMount(Venue)
    wrapper.find('button').trigger('click')
    expect(wrapper.find('div').text()).contains('1')
  })

})


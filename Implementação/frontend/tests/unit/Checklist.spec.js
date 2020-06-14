import {shallowMount} from '@vue/test-utils'
import Checklist from "../../src/components/Checklist";
import Check from "../../src/components/Check";

describe('Checklist.vue', () => {
    it('renders a list of checks',async () => {
        const checksMock = ['Check1','Check2']
        const wrapper = shallowMount(Checklist,{
            propsData: {checks: checksMock}
        })
        await wrapper.vm.$nextTick()
        let checks = wrapper.findAllComponents({name: 'Check'})
        expect(checks.length).toBe(checksMock.length)
    })
})

describe('Check.vue', () => {
    const wrapper = shallowMount(Check,{
        slots: {
            default: 'MockText'
        },
        propsData: { index: 2}
    })
    it('starts with false state', () => {
        expect(wrapper.vm.$data.state).toBe(false)
    })
    it('changes state when input is checked', async () => {
        let input = wrapper.find('input')
        await input.trigger('click')
        expect(wrapper.vm.$data.state).toBe(true)
    })
})

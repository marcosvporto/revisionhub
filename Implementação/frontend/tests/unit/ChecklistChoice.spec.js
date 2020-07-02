import {shallowMount} from '@vue/test-utils'
import axios from "axios"
import ChecklistChoice from "../../src/components/ChecklistChoice";

jest.mock("axios")

describe('ChecklistChoice.vue', () => {

    it('loads all checklists at mount', async () => {
        let mockData = [{
        title:'Mock',
        id: 1,
        likes: 10
        }]
        axios.create.mockImplementation((object) => axios)
        axios.get.mockImplementation((string) => Promise.resolve({data: mockData}))
        const wrapper = shallowMount(ChecklistChoice)
        await wrapper.vm.$nextTick()
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(wrapper.vm.options).toStrictEqual(['Mock'])
        expect(wrapper.vm.likes).toStrictEqual([10])
        expect(wrapper.vm.values).toStrictEqual([1])
    })

    it('alerts user of error in request and returns home', async () => {
        axios.create.mockImplementation((object) => axios)
        const error = new Error("Mock")
        axios.get.mockImplementation((string) => {throw error})
        const $alert = jest.fn((string) => string)
        const wrapper = shallowMount(ChecklistChoice, {
            mocks: {
                $alert
            }
        })
        await wrapper.vm.$nextTick()
        expect($alert).toHaveReturnedWith(error)
    })
})

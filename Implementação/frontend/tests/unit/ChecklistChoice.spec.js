import {shallowMount} from '@vue/test-utils'
import axios from "axios"
import ChecklistChoice from "../../src/components/ChecklistChoice";

jest.mock("axios")

describe('ChecklistChoice.vue', () => {
    let mockData = [{
        title:'Mock',
        id: 1,
        likes: 10
    }]
    axios.create.mockImplementation((object) => axios)
    axios.get.mockImplementation((string) => Promise.resolve({data: mockData}))
    const wrapper = shallowMount(ChecklistChoice)
    it('loads all checklists at mount', () => {
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(wrapper.vm.options).toStrictEqual(['Mock'])
        expect(wrapper.vm.likes).toStrictEqual([10])
        expect(wrapper.vm.values).toStrictEqual([1])
    })
})

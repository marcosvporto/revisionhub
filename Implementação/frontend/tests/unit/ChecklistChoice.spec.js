import {shallowMount} from '@vue/test-utils'
import axios from "axios"
import ChecklistChoice from "../../src/components/ChecklistChoice";

jest.mock("axios")

describe('ChecklistChoice.vue', () => {

    it('loads all checklists at mount', () => {
        let mockData = [{
        title:'Mock',
        id: 1,
        likes: 10
        }]
        axios.create.mockImplementation((object) => axios)
        axios.get.mockImplementation((string) => Promise.resolve({data: mockData}))
        const wrapper = shallowMount(ChecklistChoice)
        wrapper.vm.$nextTick(() => {
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(wrapper.vm.options).toStrictEqual(['Mock'])
            expect(wrapper.vm.likes).toStrictEqual([10])
            expect(wrapper.vm.values).toStrictEqual([1])
        })

    })
    it('alerts user of error in request and returns home', () => {
        axios.create.mockImplementation((object) => axios)
        const mockString = "Mock"
        axios.get.mockImplementation((string) => {throw Error(mockString)})
        const $alert = jest.fn((string) => string)
        const $router = {
            push: jest.fn()
        }
        const wrapper = shallowMount(ChecklistChoice, {
            mocks: {
                $alert,
                $router
            }
        })
        wrapper.vm.$nextTick(() => {
            expect($alert).toHaveReturnedWith(mockString)
            expect($router.push).toHaveBeenCalled()
        })

    })
})

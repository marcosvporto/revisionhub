import {createLocalVue, shallowMount} from '@vue/test-utils'
import VueRouter from "vue-router";
import axios from "axios"
import ChecklistMyChecklists from "../../src/components/ChecklistMyChecklists";
import ChecklistChoice from "../../src/components/ChecklistChoice";

jest.mock("axios")

describe('ChecklistChoice.vue', () => {
    it('shows the checklists returned on the request', async () => {
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

    it('redirects to home page and alerts if not authenticated', async () => {
        const $alert = jest.fn((string) => string)
        const $router = {
            push: jest.fn()
        }
        const wrapper = shallowMount(ChecklistMyChecklists, {
            computed:
            {
                isConnected() {
                    return false
                }
            },
            mocks:
            {
                $alert,
                $router
            }
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.getAuthenticatedRoute).toThrow()
        expect($alert).toHaveBeenCalled()
        expect($router.push).toHaveBeenCalled()
    })

    it('alerts user of error in request and redirects home',async () => {
        const error = new Error("Mock")
        axios.get.mockImplementation((string) => {throw error})
        const $alert = jest.fn((string) => string)
        const wrapper = shallowMount(ChecklistMyChecklists, {
            mocks: {
                $alert,
                $router: {
                    push: jest.fn()
                },
                $store: {
                    getters:
                    {
                        isConnected:true
                    },
                    state:
                    {
                        tokenStore:
                        {
                            token: '123'
                        }
                    }
                }
            }
        })

        await wrapper.vm.$nextTick()
        expect($alert).toHaveReturnedWith(error)
    })
})

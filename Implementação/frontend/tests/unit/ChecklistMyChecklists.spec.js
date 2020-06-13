import {createLocalVue, shallowMount} from '@vue/test-utils'
import VueRouter from "vue-router";
import axios from "axios"
import ChecklistMyChecklists from "../../src/components/ChecklistMyChecklists";

jest.mock("axios")

describe('ChecklistChoice.vue', () => {
    let mockData = [{
        title:'Mock',
        id: 1,
        likes: 10
    }]
    it('redirects to home page if not authenticated', () => {
        const $alert = jest.fn((string) => string)

        const wrapper = shallowMount(ChecklistMyChecklists, {
            computed:
            {
                isConnected() {
                    return false
                }
            },
            mocks:
            {
                $alert
            }
        })

        expect(wrapper.vm.getAuthenticatedRoute).toThrow()
        expect($alert).toHaveReturnedWith('Conexão expirada. Faça login novamente.')
    })
})

import Item_Individual from '../components/Pages/Item_Individual'
import {render} from './testutils'
import {user_null} from './__mocks__/user'
import {items, itemId} from './__mocks__/items'
import {screen} from '@testing-library/react'
import {mount} from 'enzyme'
import * as API from '../Utility/API'
import store from '../store'
import {handleGetAllMarketplaceItems} from '../actions'


describe("Buy Now button", ()=>{

    const match = { params: { itemId: itemId } }

    beforeAll(async()=>{
        //adding params url 
        //https://stackoverflow.com/questions/48399741/set-url-params-while-testing-with-jest-enzyme
        //APIresp= await successAPICall()
         
        
    })

    it("Display data" ,async ()=>{
        render(<Item_Individual match={match}></Item_Individual>)
        //const wrapper = await mount(<Item_Individual match={match}></Item_Individual>);
        screen.debug()
    })

})
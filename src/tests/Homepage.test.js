import { fireEvent, getByText, render as rtlRender, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store'
import * as API from '../Utility/API'
import HomePage from '../components/Pages/HomePage';
import { BrowserRouter } from 'react-router-dom';
import HomeMarketplace from '../components/PageComponents/HomeMarketplace';

import { render } from './testutils';

const successAPICall = async () =>{
    var APIresp = await API.getAllMarketplaceAPI(1, "")
    return APIresp
}

describe("Getting Homepage Listings",() => {
    it('get latest listing API call success', async () => {
        
        var responseLength
        var APIresp = await successAPICall().then((response)=>{
            responseLength =  Object.keys(response).length
        })
        expect(responseLength).toBe(12)
    })
    it('get latest listing API call Failed', async () => {
        var responseStatus;
        var APIresp = await API.getAllMarketplaceAPI("TEST", "LOL").then((response)=>{
            //console.log(response)
            responseStatus = response.code
        })
        expect(responseStatus).toBe(500)
    })
})

describe("Displaying Homepage Listings",() => {

    var APIresp, itemKeys;

    beforeAll(async()=>{
        APIresp= await successAPICall()
        itemKeys = Object.keys(APIresp)
        render(<HomePage></HomePage>)
    })

    
    it('Displays advertisement tiles name & price', async () => {

        itemKeys.forEach(element => {
            const displayName = APIresp[element]['title']
            const displayPrice = APIresp[element]['itemprice']
             waitFor(()=>{
                expect(screen.getByTestId('display-tiles')).toHaveTextContent(displayName)
                expect(screen.getByTestId('display-tiles')).toHaveTextContent(displayPrice)
            })
        });
    })


    it.skip('Displays advertisement tiles images', async () => {
        await Promise.resolve();
        itemKeys.forEach(element => {
            const displayImage = APIresp[element]['images'][0]
            expect(screen.getByTestId('display-tiles')).toHaveAttribute('src', displayImage)
        });
    })

})

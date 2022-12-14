import React, {Component} from 'react'
import { initializeApp } from "firebase/app";
import { getStorage,ref,uploadBytes,getDownloadURL,deleteObject} from 'firebase/storage'
import * as API from "../../Utility/API";
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app';
import { convertUserId } from '../../Utility/general';

class AddItem extends Component {

    constructor(){
        super();

        this.state = {
            title:null,
            itemprice:null,
            type:null,
            shortdescription:null,
            longdescription:null,
            postagename:null,
            postageprice:null,

            images:[],
            setImageUpload:null,

            cryptopayment:false,
            price:null,

            name : null,
            email : null,
            phonenum : null,
            redirectToMarketplace : false,
            redirectToRegistrationPage : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    
    
    }

    handleChange (evt) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }
    

    handleFileChange(e) {
        //console.log(e)
        this.setState({ setImageUpload: e.target.files[0]})
    }

    handleCheckbox = () => {
        this.setState({cryptopayment:!this.state.cryptopayment})
    };

    async componentDidMount(){

    }

    render(){

        //const app = initializeApp(this.firebaseConfig);
        //To access the initialized firebase configs from index.js
        //https://dev.to/farazamiruddin/react-firebase-add-firebase-to-a-react-app-4nc9
        const app = firebase.apps[0]
        const {user} = this.props
        const userId = convertUserId(user)
        const {images,cryptopayment} = this.state
        const storage = getStorage(app)
        const url = 'https://firebasestorage.googleapis.com/v0/b/bitpasar.appspot.com/o/images%2F38796ecc-eea7-4b91-bbd7-d5dbec7aa303_car2.jpg?alt=media&token=355fbf30-e0a6-4257-bec4-0aefd6052733'

        const imageUpload = () => {
            if (imageUpload == null){
                window.alert("Please select a file")
            } else {
                const filename = uuidv4()+"_"+ this.state.setImageUpload.name
                const imageRef = ref(storage,`images/${filename}`)
                uploadBytes(imageRef,this.state.setImageUpload).then((response)=>{
                    if (response){
                        getDownloadURL(response.ref).then((url)=>{
                            this.setState({images : [...this.state.images,url],setImageUpload:null})
                        })
                        window.alert("Upload completed")
                        
                    } else {
                        window.alert("Unable to upload file, please contact the admin at k.afiq.azman@gmail.com")
                    }
                    
                })
            }
        }

        const deleteFromStorage = (url) => {
            if (url) {
          
            let pictureRef = ref(storage, url);
              deleteObject(pictureRef)
                .then(() => {
                    removePictureFromState(url)
                  alert("Picture is deleted successfully!");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
        }

        const removePictureFromState = (url) => {
            let filteredArray = this.state.images.filter(item => item !== url)
            if (filteredArray === undefined){
                filteredArray = []
            }
                this.setState({images : filteredArray})
        }


        //No need to update Redux as the API will not call the data from the database
        const handleSubmission = async() =>{ 

            //PLEASE CHANGE HERE WHEN THE USER OBJECT HAS BEEN UPDATED
            var newObj = {
                ...this.state,
                "ownerid" : userId
            }

            await API.addItemAPI(newObj).then((response)=>{
                if (response.status === "successful"){
                    window.alert(response.message)
                    this.setState({redirectToMarketplace : true})
                } else {
                    window.alert("Someting went wrong, please try again")
                }
            })
        }

        if(this.state.setImageUpload){
            imageUpload()
        }

        if (this.state.redirectToMarketplace === true){
            return <Redirect exact to={`/ads/${user['address']}`}></Redirect>
        }

        const renderExternalComponent = () => {
            if(!userId){
                window.alert("Please complete your registration to access this page")
                return(<Redirect exact to="/registration"></Redirect>)
            } else {
                return(<div className="font-mono">Loading...</div>)
            }
        }

        return(
            <div className="md:w-[620px] px-2 sm:px-0">
                <div className='flex flex-col space-y-4 p-5
                                 box bg-slate-200'>
                    {userId ? 
                            <div>
                                <div className='bitpasar_text text-lg'>
                                    Sell new item
                                </div>
                                <div className='flex flex-col space-y-5'>
                                    <div className='bitpasar_text'>Advertisement Details</div>
                                    <div className='sm:w-2/3'>
                                        <label for="title">Title</label>
                                        <input  id='title'
                                                type='text' 
                                                placeholder='name of advertisement...' name='title'
                                                onChange={this.handleChange}>
                                        </input>
                                    </div>
                                    <div className='w-2/3'>
                                        <label for='price'>Price (ETH)</label>
                                        <input  id='price'
                                                type='text' 
                                                placeholder='price to be advertised...' name='itemprice'
                                                onChange={this.handleChange}></input>
                                    </div>
                                    <div className='w-2/3'>
                                        <label for='type'>Type</label>
                                        <input  id='type'
                                                type='text' 
                                                placeholder='Type'name='type'
                                                onChange={this.handleChange}></input>
                                    </div>
                                    <div className=''>
                                        <label id='shortdescription'>
                                            Short Description
                                        </label>
                                        <input  id='shortdescription'
                                                type='text' 
                                                placeholder='Short Description'name='shortdescription'
                                                onChange={this.handleChange}></input>
                                    </div>
                                    <div>
                                        <label for='longdescription'>
                                            Long Description
                                        </label>
                                        <textarea id='longdescription'
                                            className='w-full h-[200px]'
                                            placeholder='Long Description'name='longdescription'
                                            onChange={this.handleChange}>
                                        </textarea>
                                    </div>
                                    <div>
                                        <label for='images'>Images</label>
                                        <input className='w-full sm:w-[270px]' 
                                            id='images' 
                                            type="file"
                                            name="images" accept="image/*"
                                            onChange={(event)=>this.handleFileChange(event)}></input>
                                    </div>
                                    <div className='w-full'>
                                        {images.map((url) => {
                                            return (
                                                    <div className='inline-block pr-5 pb-5'
                                                        key={url}>
                                                        <div className='flex flex-col items-center space-y-2 
                                                                        box bg-white p-2 '>
                                                            <div>
                                                                <img className="object-scale-down h-[165px] w-[245px]" src={url} />
                                                            </div>
                                                            <button onClick={()=>{deleteFromStorage(url)}}>Delete image</button>
                                                        </div>
                                                    </div>);
                                        })}
                                    </div>
                                    
                                    <div className='flex flex-row space-x-2 w-fit'>
                                        <input id='cryptopayment' type="checkbox" checked={cryptopayment} onChange={this.handleCheckbox} name='cryptopayment' ></input> 
                                        <label for='cryptopayment' >
                                            Direct Crypto Payment
                                        </label>
                                    </div>
                                    
                                    {cryptopayment ? 
                                                    <div className='flex flex-col space-y-2 w-1/2'>
                                                        <div className='bitpasar_text'>
                                                            Postage
                                                        </div>
                                                        <input type='text' placeholder='Courier Name' name='postagename'
                                                                onChange={this.handleChange}></input>
                                                        <input type='text' placeholder='Postage Price' name='postageprice'
                                                                onChange={this.handleChange}></input>
                                                    </div>
                                                    : <div></div>}
                                    
                                    <div className='flex flex-col space-y-2 w-2/3'>
                                        <div className='bitpasar_text'>
                                            Contact Details
                                        </div>
                                        <input type='text' placeholder='Name' name='name'
                                        onChange={this.handleChange}></input>
                                        <input type='text' placeholder='Email' name='email'
                                        onChange={this.handleChange}></input>
                                        
                                        <input type='text' placeholder='Phonenum' name='phonenum'
                                        onChange={this.handleChange}></input>
                                    </div>
                                    <div className='flex justify-center'>
                                        <button onClick={handleSubmission}>Publish!</button>
                                    </div>
                                </div>
                            </div>
                            : renderExternalComponent()}
                </div>
            </div>     
        )
    }

}

function mapStateToProps({user}) {
    return {
      user
    }
  }

export default connect(mapStateToProps)(AddItem)
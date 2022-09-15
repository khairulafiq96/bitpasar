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
        const {user,dispatch} = this.props
        const userId = convertUserId(user)
        
        if(!user[userId]){
            window.alert("Please complete your registration to upload advertisements to the marketplace")
           this.setState({
                'redirectToRegistrationPage' : true
           })   
        }
    }

   



    render(){

        //const app = initializeApp(this.firebaseConfig);
        //To access the initialized firebase configs from index.js
        //https://dev.to/farazamiruddin/react-firebase-add-firebase-to-a-react-app-4nc9
        const app = firebase.apps[0]
        const {user} = this.props
        const {images,cryptopayment} = this.state
        const storage = getStorage(app)

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

            var ownerid = Object.keys(user).filter((details)=> details !== 'address' && details !== 'balance' && details !== 'myorders' && details !== 'mypurchases' && details !== 'myads')

            //PLEASE CHANGE HERE WHEN THE USER OBJECT HAS BEEN UPDATED
            var newObj = {
                ...this.state,
                "ownerid" : ownerid[0]
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

        const redirectToRegistrationPage =() =>{
            if(this.state.redirectToRegistrationPage === true){
                return <Redirect exact to='/registration'></Redirect>
            }
        }


        return(
            <div>
                {redirectToRegistrationPage()}
                <br/>
                <div>Sell new item</div>
                <br/>
                <div>
                    <div>Item Detals</div>
                    <br/>
                    <input type='text' 
                        placeholder='Title' name='title'
                        onChange={this.handleChange}></input>
                    <input type='text' placeholder='Price (ETH)'name='itemprice'
                        onChange={this.handleChange}></input>
                    <br/>
                    <input type='text' placeholder='Type'name='type'
                        onChange={this.handleChange}></input>
                    <input type='text' placeholder='Short Description'name='shortdescription'
                        onChange={this.handleChange}></input>
                    <br/>
                    <textarea rows="4" cols="50" placeholder='Long Description'name='longdescription'
                        onChange={this.handleChange}>
                        
                    </textarea>
                    <br/>
                    <div>Images</div>
                        <input type="file"
                               name="images" accept="image/*"
                               onChange={(event)=>this.handleFileChange(event)}></input>
                    <br/>
                    {images.map((url) => {
                        return (
                                <div key={url} >
                                    <br/>
                                    <img className="max-w-14 max-h-14" src={url} />
                                    <button onClick={()=>{deleteFromStorage(url)}}>Delete image</button>
                                </div>);
                    })}
                    
                    <br/>
                    <label>
                        <input type="checkbox" checked={cryptopayment} onChange={this.handleCheckbox} name='cryptopayment' ></input> Direct Crypto Payment
                    </label>
                
                    <br/>
                    {cryptopayment ? 
                                    <div>
                                            <div>Postage</div>
                                            <input type='text' placeholder='Postage Name' name='postagename'
                                                    onChange={this.handleChange}></input>
                                            <input type='text' placeholder='Postage Price' name='postageprice'
                                                    onChange={this.handleChange}></input>
                                    </div>
                                   : <div></div> }
                    
                    <div>
                        <br/>
                        <div>Contact Details</div>
                        <input type='text' placeholder='Name' name='name'
                        onChange={this.handleChange}></input>
                        <input type='text' placeholder='Email' name='email'
                        onChange={this.handleChange}></input>
                        <br/>
                        <input type='text' placeholder='Phonenum' name='phonenum'
                        onChange={this.handleChange}></input>
                    </div>
                    <br/>
                    <button onClick={handleSubmission}>Publish!</button>
                </div>
                <br/>
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
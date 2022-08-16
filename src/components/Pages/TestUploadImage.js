import React,{Component} from "react";
import { initializeApp } from "firebase/app";
import { getStorage,ref,uploadBytes,getDownloadURL,deleteObject} from 'firebase/storage'

class TestUploadImages extends Component{

    constructor (){
        super()

        this.state = {
            imageUpload : null,
            setImageUpload : null,
            setImageURL : []
        }

        this.handleFileSelection = this.handleFileSelection.bind(this)
    }

    handleFileSelection (event){
        console.log(event.target.files[0])
        this.setState({setImageUpload: event.target.files[0]})
    }

    


    firebaseConfig = {
        apiKey: "AIzaSyDUnl86TI-bpWFD0NAaOrKTTm6msdmYvyU",
        authDomain: "bitpasar.firebaseapp.com",
        projectId: "bitpasar",
        storageBucket: "bitpasar.appspot.com",
        messagingSenderId: "782221905508",
        appId: "1:782221905508:web:eed2befb480366548d1971"
      };

    
    componentDidMount(){
        
    }


    render(){

        const app = initializeApp(this.firebaseConfig);
        const storage = getStorage(app)
        const {setImageUpload,setImageURL} = this.state

        const imageUpload = () => {
            if (imageUpload == null){
                window.alert("Please select a file")
            } else {
                const imageRef = ref(storage,`images/${this.state.setImageUpload.name}`)
                uploadBytes(imageRef,this.state.setImageUpload).then((response)=>{
                    if (response){
                        getDownloadURL(response.ref).then((url)=>{
                            this.setState({setImageURL : [...this.state.setImageURL,url]})
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
            let filteredArray = this.state.setImageURL.filter(item => item !== url)
            if (filteredArray === undefined){
                filteredArray = []
            }
                this.setState({setImageURL : filteredArray})
            }

        

        return(
            <div> Test Component
                <br/>
                <input type="file" onChange={(event)=> this.handleFileSelection(event)} ></input>
                <br/>
                <button onClick={imageUpload}>Upload Image</button>
                <br/>
                {setImageURL.map((url) => {
                        return (
                                <div key={url}>
                                    <img src={url} />
                                    <button onClick={()=>{deleteFromStorage(url)}}>Delete image</button>
                                </div>);
                })}
            </div>
        )
    }
}

export default TestUploadImages
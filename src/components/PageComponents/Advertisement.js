import React, {Component} from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { handleDeleteAds } from "../../actions";
import firebase from "firebase/compat/app";
import {connect} from 'react-redux'
import { convertUserId } from "../../Utility/general";

class Advertisement extends Component{

    render(){

        const {item,dispatch,user,itemId} = this.props
        const app = firebase.apps[0]
        const storage = getStorage(app)

        const onSubmit = async (userid,itemid,images) => {
            const deleteImageStatus = await deleteImages(images)
            if(deleteImageStatus==='complete'){
                dispatch(handleDeleteAds(userid, itemid))
            } else if (deleteImageStatus === 'fail'){
                window.alert("Something went wrong with the Advertisement deletion. Please reach out to the support team at k.afiq.azman@gmail.com")
            }
        }

        const firebaseDeleteImages = async (path) => {

            // Create a reference to the file to delete
            const desertRef = ref(storage, path);
            //Please dont add return statements in then(), the promise is not resolved yet at the end of the code
            //therefore it does not return the value
            //The await will continue running the code after it is completed
            let status
            // Delete the file
            await deleteObject(desertRef).then(() => {
            // File deleted successfully
                //window.alert("Image deleted")
                status = "success"
            }).catch((error) => {
            // Uh-oh, an error occurred!
                //window.alert(error.message)
                status = "failed"
            });

            return status
        }

        const getReferenceFromURL = (url) => {
            //Somehow the firebase refFromURL function is not detected,
            //therefore the solution is referenced from 
            //https://stackoverflow.com/questions/45045054/how-to-call-reffromurl-in-firebase-cloud-function/45060805#45060805
            //const ref = storage.refFromURL(url);
            return decodeURIComponent(url.split('/').pop().split('?')[0])
        }

        const deleteImages = async (images) => {
            //Unable to delete the images by batch, therefore for loop is used
            //Promise guide
            //https://www.youtube.com/watch?v=Mus_vwhTCq0 at 10:30
            //For await guide
            //https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

            let imgSuccessCounter = 0, totalImgLength=images.length
            for await (const img of images) {
                const status = await firebaseDeleteImages(getReferenceFromURL(img))
                if (status==='success'){
                    imgSuccessCounter=+1
                }
              }

            //return totalImgLength === imgSuccessCounter ? 'complete' : 'fail'
            return totalImgLength === imgSuccessCounter ? 'complete' : 'complete'
        }

        return (
            <div>
                <div>
                    <div className="itemImage">
                            <img src={item['images'][0]}></img>
                    </div>
                    <div>
                        <div>{item['title']}</div>
                        <div>{item['itemprice']} ETH</div>
                        <div>Type : {item['type']}</div>
                        <div>{item['shortdescription']}</div>
                        <div>{item['timestamp']}</div>
                        <div>Status : {item['status']}</div>
                        <div>Postage : {item['postagename']}</div>
                        <div>Postage price : {item['postageprice']}</div>
                        <button onClick={()=>onSubmit(convertUserId(user),itemId,item['images'])}>Delete Ad</button>
                    </div>
                    
                </div>
                <br></br>
                <br></br>
            </div>
        )
    }
}

function mapStateToProps({user}) {
    return {
      user
    }
  }


export default connect(mapStateToProps)(Advertisement)
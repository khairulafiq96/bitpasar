import React, {Component} from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { handleDeleteAds } from "../../actions";
import firebase from "firebase/compat/app";
import {connect} from 'react-redux'
import {convertUTCtoDate,convertUserId} from '../../Utility/general'

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

        //<button onClick={()=>onSubmit(convertUserId(user),itemId,item['images'])}>Delete Ad</button>
        //item['title']
        return (
           <div className="flex flex-col space-x-0 space-y-2 p-5
                               sm:flex-row sm:space-x-5 sm:space-y-0 sm:p-5 sm:min-w-[300px] 
                               box bg-slate-200">
                    <div className="flex flex-col items-center space-y-2 sm:w-1/3">
                        <div className="flex items-center justify-center box bg-white p-2 w-full">
                                <img className="object-scale-down h-[170px]" src={item['images'][0]}></img>
                        </div>
                        <div className="bitpasar_text underline">
                            {item['title']}
                        </div>
                        <div className="bitpasar_text underline">
                            {item['itemprice']} ETH
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 break-mords sm:w-[360px]">
                        <div>
                            <div className="bitpasar_text text-sm sm:text-base">
                                Id
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm">
                                {itemId}
                            </div>
                        </div>
                        <div>
                            <div className="bitpasar_text text-sm sm:text-base">
                                Status
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm">
                                {item['status']}
                            </div>
                        </div>
                        <div>
                            <div className="bitpasar_text text-sm sm:text-base">
                                Date Added
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm">
                                {convertUTCtoDate(item['timestamp'])}
                            </div>
                        </div>
                        <div className="bitpasar_subtext text-sm">
                              {item['shortdescription']}
                         </div>
                        <div className="flex justify-center items-end h-full pt-5" >
                            <div>
                                <button onClick={()=>onSubmit(convertUserId(user),itemId,item['images'])}>Delete Ad</button>
                            </div>
                        </div>
                        
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


export default connect(mapStateToProps)(Advertisement)
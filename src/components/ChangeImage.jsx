import React, { useState } from "react";
import { API, Storage } from "aws-amplify";
import { getS3url } from "../graphql/queries";
import { updateProfile } from "../graphql/mutations";
import { Image } from "@aws-amplify/ui-react";

const ChangeImage = () => {
  const [formData, setFormData] = useState([]);
  const [notes, setNotes] = useState();
  const [image, setImage] = useState();

  // const handleChangeImage = () => {
  //   console.log("ciao");
  // };

  // const handleClick = ()=>{
  //   console.log('ciao3');
  // }

  // async function onChange(e) {
  //   if (!e.target.files[0]) return
  //   const file = e.target.files[0];
  //   setFormData({ ...formData, image: file.name });
  //   await Storage.put(file.name, file);
  //   fetchNotes();
  // }

  // async function fetchNotes() {
  //   const apiData = await API.graphql({ query: getS3url });
  //   const notesFromAPI = apiData.data.getS3url.items;
  //   await Promise.all(notesFromAPI.map(async note => {
  //     if (note.image) {
  //       const image = await Storage.get(note.image);
  //       note.image = image;
  //     }
  //     return note;
  //   }))
  //   setNotes(apiData.data.getS3url.items);
  // }

  // async function createNote() {
  //   if (!formData.name || !formData.description) return;
  //   await API.graphql({ query: updateProfile, variables: { input: formData } });
  //   if (formData.image) {
  //     const image = await Storage.get(formData.image);
  //     formData.image = image;
  //   }
  //   setNotes([ ...notes, formData ]);
  //   //setFormData(initialFormState);
  // }


// const uploadImage = async () => {
//   if (file) {
//     setLoading(true);
//     try {
//       const uploadedFile = await uploadAvatar(file.name, file, auth.id, file.type);
//       const response = await setAvatar({
//         variables: {
//           mediaId: uploadedFile.data.completeMediaUpload.id,
//         },
//       });
//       if (response.data?.setUserAvatar) {
//         const media = await getAvatarImage({
//           variables: {
//             id: response.data.setUserAvatar.avatarId,
//           },
//         });
//         dispatch({
//           type: 'SIGN_IN',
//           payload: {
//             ...auth,
//             ...{
//               avatar: media.data.getMedia,
//               avatarId: response.data.setUserAvatar.avatarId,
//             },
//           },
//         });
//       }
//     } catch (e) {
//       setLoading(false);
//     }
//   }
// };




  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const img = await Storage.put(file.name, file, {
        contentType: "image/png", // contentType is optional
      });
      
      console.log("passato", img);

      const id = localStorage.getItem("userId");
      console.log(img.key,'boh');
   return API.graphql({
      query: updateProfile,
      variables: {
        image: img.key,
        userId: id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
      
    });
    
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  // function UploadImage() {
  //   const id = localStorage.getItem("userId");
  //   return API.graphql({
  //     query: updateProfile,
  //     variables: {
  //       image: image,
  //       userId: id,
  //     },
  //     authMode: "AMAZON_COGNITO_USER_POOLS",
  //   });
  // }

  const handleUploadImage = () => {
    console.log(image,'funzione');
    image
      .then((data) => {
        console.log("data img", data);
      })
      .catch((err) => {
        console.log(err, "errore");
      });
  };

  return (
    <>
      <div className="form">
        <form className="form-login">
          <div className="form-inner">
            <div className=" form-group">
              <label className="form-label">Cambia immagine</label>
              <input
                type="file"
                className="form-control"
                placeholder="Cambia immagine"
                name="Image"
                onChange={onChange}
                required
              />
            </div>
            <div className="input-button">
              <button className="btn btn-primary" onClick={handleUploadImage}>
                Salva
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangeImage;

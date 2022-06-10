import React, { useEffect, useState } from "react";
import { API, Storage } from "aws-amplify";
import { updateProfile } from "../graphql/mutations";
import { getS3url } from "../graphql/queries";
import axios from "axios";

const ChangeImage = () => {
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");

  function handleUploadImage() {
    var options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    try {
      console.log(url, "try");
      console.log(file, "try");
      const res = axios.put(url, file, options);
      res
        .then((data) => {
          if (data.status === 200) {
            //chiami dynamodb per update
            console.log(file.name, 'nome immagine');
            const id = localStorage.getItem("userId");
            const upProfile = API.graphql({
              query: updateProfile,
              variables: {
                image: file.name,
                userId: id,
              },
              authMode: "AMAZON_COGNITO_USER_POOLS",
            });

            upProfile
              .then((data) => {
                console.log(data, "ci sono");
                //navigte o reload
              })
              .catch((err) => {
                console.log(err, "non ci sono");
              });
          }
        })
        .catch((err) => {
          console.log("errore: ", err);
          alert("Errore...");
        });
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  }
  useEffect(() => {
    getUrl();
  }, [file]);

  const getUrl = () => {
    API.graphql({
      query: getS3url,
      variables: {
        file: file.name,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
      .then((data) => {
        console.log(data.data.getS3url, "url");
        setUrl(data.data.getS3url);
        //handleUploadImage(data.data.getS3url);
      })
      .catch((err) => {
        console.log(err, "errore nella getUrl");
      });
  };

  async function onChange(e) {
    //e.preventDefault();
    //console.log(e.target.files[0]);
    console.log(typeof e.target.files[0], "ciao");
    setFile(e.target.files[0]);
  }

  return (
    <>
      <div className="form">
        <div className="form-login">
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
        </div>
      </div>
    </>
  );
};

export default ChangeImage;



















  // .then((data) => {
  //   console.log("success: ", data);
  // })
  // .catch((err) => {
  //   console.log("error: ", err);
  // });
  // const id = localStorage.getItem("userId");
  // const upProfile = API.graphql({
  //   query: updateProfile,
  //   variables: {
  //     image: file.name,
  //     id: id,
  //   },
  //   authMode: "AMAZON_COGNITO_USER_POOLS",
  // });

  // upProfile
  //   .then((data) => {
  //     console.log(data, "ci sono");
  //   })
  //   .catch((err) => {
  //     console.log(err, "non ci sono");
  //   });




// function updateUserImage() {
//   const nameImage = JSON.parse(localStorage.getItem("sidebarUsername")).name + '.image'
//   return API.graphql({
//     query: getS3url,
//     variables: {
//       name: nameImage
//     },
//     authMode: "AMAZON_COGNITO_USER_POOLS",
//   });
// }
// const handlChangeImage = () =>{
//   updateUserImage()
//   .then((data) => {
//     console.log("result: ", data);

//   })
//   .catch((err) => {
//     console.log("error: ", err);
//   });
//   navigate(RoutesLogin.changeImage)
// }

// const handlChangeImage = () =>{
//   updateUserImage()
//   .then((data) => {
//     console.log("result: ", data);

//   })
//   .catch((err) => {
//     console.log("error: ", err);
//   });
// }

// async function onChange(e) {
//   const nameImage =
//     JSON.parse(localStorage.getItem("sidebarUsername")).name + ".image";
//   const url = API.graphql({
//     query: getS3url,
//     variables: {
//       name: nameImage,
//     },
//     authMode: "AMAZON_COGNITO_USER_POOLS",
//   });
//   await url
//       .then((data) => {
//         console.log("data img", data);
//       })
//       .catch((err) => {
//         console.log(err, "errore url");
//       });
//   const file = e.target.files[0];
//   try {
//     const img = await Storage.put(file.name, file, {
//       contentType: "image/png", // contentType is optional
//     });
//     setImage(img.key);
//     console.log("passato");
//     console.log(url, "url cos");

//   } catch (error) {
//     console.log("Error uploading file: ", error);
//   }
// }

// async function onChange(e) {
//   const file = e.target.files[0];
//   try {
//     const img = await Storage.put(file.name, file, {
//       contentType: "image/png", // contentType is optional
//     });
//     setImage(img.key);
//     console.log("passato");
//     url
//       .then((data) => {
//         console.log("data img", data);
//       })
//       .catch((err) => {
//         console.log(err, "errore url");
//       });
//   } catch (error) {
//     console.log("Error uploading file: ", error);
//   }
// }

// function UploadImage() {
//   const id = localStorage.getItem("userId");
//   return API.graphql({
//     query: updateProfile,
//     variables: {
//       image: image,
//       id: id,
//     },
//     authMode: "AMAZON_COGNITO_USER_POOLS",
//   });
// }

// function UploadImage() {
//   const id = localStorage.getItem("userId");
//   return API.graphql({
//     query: updateProfile,
//     variables: {
//       image: image,
//       id: id,
//     },
//     authMode: "AMAZON_COGNITO_USER_POOLS",
//   });
// }

// const [images, setImages] = useState([])

//   useEffect(() => {
//     fetchImages()
//   }, [])
//   async function fetchImages() {
//     console.log(Storage, 'storage');
//     let imageKeys = await Storage.list('')
//     console.log(imageKeys, 'lista');
//     imageKeys = await Promise.all(imageKeys.map(async k => {
//       console.log(k, 'k');
//       const key = await Storage.get(k.key)
//       console.log(key, 'key');
//       return key
//     }))
//     console.log('imageKeys: ', imageKeys)
//     setImages(imageKeys)
//   }
//   async function onChange(e) {
//     const file = e.target.files[0];
//     const result = await Storage.put(file.name, file, {
//       contentType: 'image/png'
//     })
//     console.log({ result },'result')
//     fetchImages()
//   }
//   return (
//     <div className="App">
//       <h1>Test</h1>
//       <div style={{ display: 'flex', flexDirection: 'column' }}>
//         {
//           images.map(image => (
//             <img
//               src={image}
//               key={image}
//               style={{width: 500, height: 300}}
//             />
//           ))
//         }
//       </div>
//       <input
//         type="file"
//         onChange={onChange}
//       />
//     </div>
//   );
// };

// const [formData, setFormData] = useState([]);
// const [notes, setNotes] = useState();
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

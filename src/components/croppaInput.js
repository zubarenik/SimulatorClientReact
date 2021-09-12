import React, { useEffect, useState } from 'react'
import ReactCrop from "react-image-crop";
import {FormGroup, Input} from 'reactstrap';

export default (props) =>  {

    const defaultCrop = {
        unit: "px",
        width: props.width,
        height: props.height,
        aspect: props.width/props.height,
        locked: true
    }
    const [crop, setCrop] = useState(defaultCrop)
    const [imageBlob, setImageBlob] = useState(null)
    const [fileUrl, setFileUrl] = useState(null)
    const [imageRef, setImageRef] = useState(null)
    const [image, setImage] = useState(null)
    const [croppedImageUrl, setCroppedImageUrl] = useState(null)
    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
            setImage(reader.result)
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const onImageLoaded = (image) => {
        setImageRef(image);
      };
    
    const onCropComplete = (crop) => {
        makeClientCrop(crop);
    };

    const onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        setCrop(crop)
    };
    const makeClientCrop = async (crop) => {
        if (imageRef && crop.width && crop.height) {
          let imageUrl = await getCroppedImg(
            imageRef,
            crop,
            "newFile.jpeg"
          );
          setCroppedImageUrl(imageUrl)
        }
    }
    const getCroppedImg = async (image, crop, fileName) => {
        const canvas = document.createElement("canvas");
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");
    
        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                //reject(new Error('Canvas is empty'));
                console.error("Canvas is empty");
                return;
              }
              blob.name = fileName;
              window.URL.revokeObjectURL(fileUrl);
              setImageBlob(blob)
              setFileUrl(window.URL.createObjectURL(blob));
              resolve(fileUrl);
            },
            "image/jpeg",
            1
          );
        });
      }
    useEffect(() => {
        if (imageBlob){
            let file = new File([imageBlob], "image.jpeg", {
                type: imageBlob.type,
            });
            props.onImageChange(file)
        }
        
    }, [imageBlob])
    return(
        <>
            <FormGroup>
              <Input
                onChange={onSelectFile}
                type='file' 
                />
            </FormGroup>
            <ReactCrop
                crop={crop}
                ruleOfThirds
                src={image}
                locked={false}
                ruleOfThirds
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={onCropChange}
                {...props}
            />
            
        </>
        
    )
}

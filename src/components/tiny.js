import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
export default ({id, value, onChange}) =>  {
    const changeHandler = (content) => {
      onChange(content)
    }
    return(
      <>

            <Editor
              id= { id ?? "" }
              name="pause_text"
              value = { value ?? '' }
              onEditorChange={changeHandler}
              apiKey='oyw6eicxahrn77chp2awrf8cyu6bfyunxva5kvea1s3v0d71'
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                   'searchreplace visualblocks code fullscreen',
                   'insertdatetime media table paste code help wordcount'
                ],
                valid_elements: '*[*]',
                invalid_elements: 'script',
                toolbar: 'undo redo | formatselect | bold italic backcolor anchor | link | insertdatetime |\
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | preview | media | image | code | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
      </>
    )
}

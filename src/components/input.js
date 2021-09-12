import React from 'react'
import { Input, FormFeedback, Label } from 'reactstrap'

export default (props) =>  {
    return(
      <>

        {
          props.label && 
            <Label for={props.name}>{props.label} 
              {
                props.required && <span style={{color: "red"}}> *</span>
              }
            </Label>
        }
        <Input
          {...props}
          invalid={!!props.errors}
          />
        {
          props.errors && props.errors.map((error, index) => 
            <FormFeedback key={index}>{error}</FormFeedback>)
        }
      </>
    )
}

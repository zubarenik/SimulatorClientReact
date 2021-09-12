import React from 'react'
import { Header, Icon } from 'semantic-ui-react'



export default (props) => {
    return (
        
        <div className={ 'workflowNode' }>
            <Header
            as={ 'h5' }
            icon={ <Icon name={ props.properties.icon ?? 'plug' } { ...props.properties.iconProps } /> }
            className={ 'margin20' }
            content={ props.properties.place?.text?.replace(/<\/?[^>]+(>|$)/g, "").substring(0,20) ?? 'Сообщение' }
            subheader={ props.properties.title }
            />
        </div>
    )
    
}
import React from 'react'
import { Header, Icon } from 'semantic-ui-react'



export default (props) => {
    return (
        
        <div className={ 'workflowNode' }>
            <Header
            as={ 'h5' }
            icon={ <Icon name={ props.properties.icon ?? 'plug' } { ...props.properties.iconProps } /> }
            className={ 'margin20' }
            content={ props.properties.place?.title ?? 'Выбор пользователя' }
            subheader={ props.properties.title }
            />
        </div>
    )
    
}
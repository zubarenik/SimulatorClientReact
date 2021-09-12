import React from 'react'
import { FlowChart, actions as flowChartActions  } from "@mrblenny/react-flow-chart"
import { Button, Header, Label, Icon } from 'semantic-ui-react'
import { mapValues, isEqual, cloneDeep } from 'lodash'
import { Input, Nodes } from '../components'
import { Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { onZoomCanvas } from '@mrblenny/react-flow-chart/src/container/actions'

export const getInitialState = () => ({
  offset: {
    x: 0,
    y: 0
  },
  nodes: {
    __start: {
      id: "__start",
      type: "Начало выполнения",
      position: {
        x: 20,
        y: 40
      },
      properties: {
        title: "Начало",
        icon: "hourglass start"
      },
      ports: {
        output: {
          id: "output",
          type: "output"
        }
      }
    },
    __end: {
      id: "__end",
      type: "Окончание выполнения",
      position: {
        x: 20,
        y: 300
      },
      properties: {
        title: "Конец",
        icon: "hourglass end"
      },
      ports: {
        input: {
          id: "input",
          type: "input"
        }
      }
    }
  },
  links: {},
  selected: {},
  hovered: {}
})

const onDragNode = ({ config, event, data, id }) => (chart) => {
  const nodechart = chart.nodes[id]

  if (nodechart) {
    chart.nodes[id] = {
      ...nodechart,
      position: config && config.snapToGrid ? { x: Math.round(data.x / 5) * 5, y: Math.round(data.y / 5) * 5 } : data,
    }
  }

  return chart
}

class CustomPort extends React.PureComponent {

  render(){
    let color, icon
    switch(this.props.port.id) {
      case "success":
        color = "green"
        icon = "check"
        break
      case "error":
        color = "red"
        icon = "remove"
        break
      case "input":
        color = null
        icon = "angle double down"
        break
      default:
        color = null
        icon = "angle double down"
    }
    return(
      <Button
        circular
        size={ 'mini' }
        color={ color }
        icon={ icon }
      />
    )
  }

}


const CustomLink = ({
  config,
  link,
  startPos,
  endPos,
  onLinkMouseEnter,
  onLinkMouseLeave,
  onLinkClick,
  isHovered,
  isSelected,
}) => {
  
  let points
  let middleY = (startPos.y + endPos.y) / 2
  const centerX = startPos.x + (endPos.x - startPos.x) / 2;
  const centerY = startPos.y + (endPos.y - startPos.y) / 2;
  if ((endPos.y - startPos.y ) < 40) {
    let middleX = (startPos.x + endPos.x) / 2
    points = `M ${ startPos.x } ${ startPos.y } L ${ startPos.x } ${ startPos.y + 20 } ${ middleX } ${ startPos.y + 20 } ${ middleX } ${ endPos.y - 20 } ${ endPos.x } ${ endPos.y - 20 } ${ endPos.x } ${ endPos.y }`
  } else {
    points = `M ${ startPos.x } ${ startPos.y } L ${ startPos.x } ${ middleY } ${ endPos.x } ${ middleY }, ${ endPos.x } ${ endPos.y }`
  }


   let color
   switch(link.from.portId){
     case "success":
       color = "#29a239"
       break
      case "error":
        color = "#db2828"
        break
      default:
        color = "#2185d0"
   }
   return (
     <>
      <svg style={{ overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 }}>
        <path
          d={points}
          stroke={ color }
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d={points}
          stroke={ color }
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeOpacity={(isHovered || isSelected) ? 0.1 : 0}
          onMouseEnter={ () => onLinkMouseEnter({ config, linkId: link.id }) }
          onMouseLeave={ () => onLinkMouseLeave({ config, linkId: link.id }) }
          onClick={(e) => {
            onLinkClick({ config, linkId: link.id })
            e.stopPropagation()
          } }
        />
      </svg>
      {
        link.award && 
        <Label style={{ left: centerX, top: centerY, position: 'absolute' }}>
          {link.award}
        </Label>
      }
      
      
    </>
  )

}

class CustomNodeInner extends React.PureComponent {
  placeComponents = {
    "theory" : Nodes.Theory, 
    "question": Nodes.Question,
    "openquestion": Nodes.OpenQuestion,
    "openquestionexpert": Nodes.ExpertQuestion,
    "questionanswercheck": Nodes.CheckOutQuestion,
    "questionuserchoice": Nodes.UserChoiceQuestion,
    "message": Nodes.Message,
    "safetext": Nodes.SafeText,
  }
  render(){
    const Component = this.placeComponents[this.props.node.type]
    return(
      <>
        {
          Component &&
          <Component {...this.props.node}/>
        }
      </>
    )
  }

}


export default class extends React.Component{

  stateActions = mapValues(flowChartActions, (func) => (...args) => this.setState(func(...args)))
  
  state = {
    ...getInitialState(),
    nodes: this.props.places,
    links: this.props.links || {},
    openLinkModal: false,
    currLink: {},
    scale: this.props.scale || 1,
    offset: this.props.offset,
    editLink: false
  }
  changeHandler = (e) => {
    this.setState({...this.state, currLink: {...this.state.currLink, [e.target.name]: e.target.value}})
  }
  
  render() {
    return (
      <div className={'relative'}>
        
        { this.hasChanges() &&
          <Label
            color={ 'orange' }
            content={ 'Имеются несохраненные изменения' }
            className={ 'workflowChangedLabel' }
          />
        }
        <Modal isOpen={this.state.openLinkModal} toggle={this.closeLinkModal}>
          <ModalHeader toggle={this.closeLinkModal}>Количество баллов</ModalHeader>
          <ModalBody>
            <Form>
              <Form className='auth-login-form mt-2' onSubmit={this.state.editLink ? this.linkEdit : this.linkComplete}>
                <FormGroup>
                  <Input
                    value={this.state.currLink.award}
                    label="Количество баллов для прохождения"
                    onChange={this.changeHandler}
                    type='number'
                    id='login-award'
                    name="award"
                    placeholder='0'
                    autoFocus />
                </FormGroup>
              </Form>
            </Form>
          </ModalBody>
          <ModalFooter>
            {
              this.state.editLink ? 
              <>
                <Button color="green" onClick={this.linkEdit}>Сохранить</Button>{' '}
                <Button color="red" onClick={this.deleteLink}>Удалить</Button>
              </>
              :
              <>
                <Button color="green" onClick={this.linkComplete}>Сохранить</Button>{' '}
                <Button color="red" onClick={this.closeLinkModal}>Отменить</Button>
              </>
            }
            
          </ModalFooter>
        </Modal>
        <FlowChart
          chart={ this.state }
          callbacks={{
            ...this.stateActions,
            onDeleteKey: this.deleteNode,
            onLinkClick: this.clickLink,
            onLinkComplete: this.openLinkModal,
            onNodeClick: this.clickNode,
            onCanvasClick: this.clickCanvas,
            onDragNode: this.dragNode,
            onDragNodeStop: this.dragStop,
            onCanvasDrop: this.dropCanvas,
            onZoomCanvas: this.onZoom,
            onDragCanvas: this.onDragCanvas
          }}
          Components={{
            Port: CustomPort,
            NodeInner: CustomNodeInner,
            Link: CustomLink
          }}
          config={{
            readonly: this.props.readonly,
            snapToGrid: true,
            validateLink: ({ linkId, fromNodeId, fromPortId, toNodeId, toPortId, chart }) =>  {
              return !this.props.readonly && chart.nodes[fromNodeId].ports[fromPortId].type !== "input" && chart.nodes[toNodeId].ports[toPortId].type === "input"
            }
          }}
        />
      </div>
    )
  }
  onDragCanvas = (...args) => {
    this.setState(flowChartActions.onDragCanvas(...args), () => this.props.onPosChange(...args))
  }
  onZoom = (...args) => {
    this.setState(flowChartActions.onZoomCanvas(...args), () => this.props.onPosChange(...args))
  }
  linkEdit = () => {
    this.props.onLinkEdit(this.state)
  }
  deleteLink = () => {
    this.props.onLinkDelete(this.state)
  }
  linkComplete = () => {
    
    this.setState(flowChartActions.onLinkComplete(this.state.currLink), () => this.props.onLinkComplete(this.state))
  }
  closeLinkModal = () => {
    delete this.state.links[this.state.currLink.linkId]
    this.setState({...this.state, openLinkModal: false, currLink: {}})
  }
  openLinkModal = (link) => {
    console.log(link)
    if (link.fromPortId === link.toPortId || link.fromNodeId === link.toNodeId){
      delete this.state.links[link.linkId]
    }else{
      this.setState({...this.state, openLinkModal: true, currLink: link})
    }
  }
  clickLink = (link) => {
    this.setState({...this.state, openLinkModal: true, editLink: true, currLink: this.state.links[link.linkId]})
  }
  deleteNode = (node) => {
    let config = node.config
    if (this.state.selected.id !== "__start" && this.state.selected.id !== "__end" && !this.props.readonly) {
      let node = {...this.state.selected, config }
      this.setState(flowChartActions.onDeleteKey(node), () => this.props.ondDeleteNode(node))
    }
  }

  clickNode = ({ nodeId }) => {
    if (this.props.onChange){
      this.setState(flowChartActions.onNodeClick({ nodeId }), () => this.props.onChange(this.state))
    }
  }

  clickCanvas = () => {
    if (this.props.onChange){
      this.setState(flowChartActions.onCanvasClick(), () => this.props.onChange(this.state))
    }
  }

  updateParams = (params) => {
      console.log(params)
    this.setState((state) => {
      state.nodes[state.selected.id].properties.params = params
      state.selected = {}
      return state
    }, () => this.props.onChange(this.state))
  }

  hasChanges = () => {
      return false
  }

  dragNode = (...args) => {
    this.setState(onDragNode(...args))
  }
  dragStop = ({data, id}) => {
    let position = {x: data.x, y: data.y}
    this.props.onNodeDragStop({position, id})
  }

  dropCanvas = (...args) => {
    // let position = {x:0, y:0}
    // let obj = {...args}
    // obj[0].position = position
    this.setState(flowChartActions.onCanvasDrop(...args), this.props.onAddPlace(...args))
  }

}

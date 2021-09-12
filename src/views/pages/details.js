import { WorkflowChart, Places } from '../../components'
import { Grid, Header, Segment } from 'semantic-ui-react'
import { PLACE_TYPES } from '../../constants'
import { REACT_FLOW_CHART } from "@mrblenny/react-flow-chart"
import { useEffect, useState } from 'react'
import { PageAction, PlaceAction } from '../../redux/actions'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'

export default (props) => {
    const placeComponents = {
        "theory" : Places.Theory,
        "question" : Places.Question,
        "openquestion": Places.OpenQuestion,
        "openquestionexpert": Places.ExpertQuestion,
        "questionanswercheck": Places.CheckOutQuestion,
        "questionuserchoice": Places.UserChoiceQuestion,
        "message": Places.Message,
        "safetext": Places.SafeText,

    }
    const { page_id } = useParams()
    const [currPlace, setCurrPlace] = useState({})
    const [placeLinks, setPlaceLinks] = useState({})
    const [scale, setScale] = useState(1)
    const [offset, setOffset] = useState({x: 0, y: 0})
    const [currPlaceInfo, setCurrPlaceInfo] = useState({})
    const [ placeNodes, setPlaceNodes] = useState()
    const [disabledChart, setDisabledChart] = useState(false)
    const [isNodeAddInProcess, setIsNodeAddInProcess] = useState(false)
    const simplePorts = {
        output: { id: "output", type: "output" },
        input: { id: "input", type: "input" }
    }
    const page = useSelector(state => state.page).page
    const changeWorkflow = (chartData) => {
        if (chartData.links) setPlaceLinks(chartData.links)
        if (chartData.selected && chartData.selected.id){
            let place = chartData.nodes[chartData.selected.id]
            if (place){
                if (page.places && page.places.places){
                    let page_place = page.places.places.filter(place => place.node_info.id === chartData.selected.id) 
                    if (page_place.length > 0){
                        setCurrPlaceInfo(page_place[0])
                    }else{
                        setCurrPlaceInfo({})
                    }
                }
                setCurrPlace(place)
            }
        }else if (chartData.selected){
            setCurrPlace({})
        }
    }
    const addPlaceNode = (node) => {
        setIsNodeAddInProcess(true)
        setCurrPlace({...node.data, id: node.id, position: node.position})
        setCurrPlaceInfo({})
    }
    useEffect(() => {
        PageAction.details(page_id)
        return () => {
            PageAction.clear()
          };
    }, [])
    
    useEffect(() => {
        getPlaceNodes()
        
    }, [page])

    useEffect(() => {
        if (currPlace.type){
            setDisabledChart(true)
        }else{
            setDisabledChart(false)
        }
    }, [currPlace.type])

    const cancelAddNode = () => {
        setIsNodeAddInProcess(false)
        setDisabledChart(false)
        setCurrPlace({})
        setPlaceNodes()
        PageAction.details(page_id)

    }
    const getPlaceNodes = () => {
        if (page.id){
            if (page.places && page.places.places){
                let nodes = {}
                page.places.places.forEach(place => {
                    nodes[place.node_info.id] = {...place.node_info, properties: {...place.node_info.properties, place}}
                })
                setPlaceNodes(nodes)
            }else{
                setPlaceNodes({})
            }
        }
    }

    const savePage = () => {
        PageAction.edit({...page, links: placeLinks, places: undefined})
    }

    const savePlace = async (place) => {
        if (currPlaceInfo.id){
            await PlaceAction.edit({...place, node_info: currPlace})
        }else{

            await PlaceAction.create({...place, type: currPlace.type, page: page_id, node_info: currPlace})
        }
        await PageAction.details(page_id)
        setIsNodeAddInProcess(false)
        setCurrPlace({})
        

    }
    const rerenderChart = () => {
        
        setPlaceNodes()
        getPlaceNodes()
    }
    const nodeDragStop = async (node) => {
        if (node.id){
            if (page.places && page.places.places){
                let page_place = page.places.places.filter(place => place.node_info.id === node.id)
                if (page_place.length > 0){
                    page_place = page_place[0]
                    page_place.node_info.position = node.position
                    await PlaceAction.edit(page_place)
                }
                
                
            }
        }
    }
    const deleteNode = (place) => {
        let place_id;
        page.places.places.forEach(pl => {
             if( pl.node_info.id === place.id){
                 place_id = pl.id
             }
        })
        if (place_id){
            PlaceAction.delete(place_id)
        }
        setCurrPlace({})
    }
    const linkEdit = async (chartData) => {
        if (chartData.currLink){
            let currLink = chartData.currLink
            if (chartData.links){
                let link = chartData.links[currLink.id]
                let fromPlace;
                if (page.places && page.places.places){
                    page.places.places.forEach(place => {
                        if (place.node_info.id === link.from.nodeId) fromPlace = place
                    })
                }
                if (fromPlace && fromPlace.next_places && fromPlace.next_places.places){
                    fromPlace.next_places.places = fromPlace.next_places.places.map(next_place => {
                        if (next_place.linkId === link.id){
                            return {...next_place, award: currLink.award}
                        }
                        return next_place
                    })
                    await PlaceAction.edit(fromPlace)
                }
                link.award = currLink.award
                await PageAction.edit({...page, links: chartData.links, places: undefined})

                rerenderChart()
            }
        }
    }
    const deleteLink = async (chartData) => {
        if (chartData.currLink){
            let currLink = chartData.currLink
            if (chartData.links){
                let link = chartData.links[currLink.id]
                let fromPlace;
                if (page.places && page.places.places){
                    page.places.places.forEach(place => {
                        if (place.node_info.id === link.from.nodeId) fromPlace = place
                    })
                }
                if (fromPlace && fromPlace.next_places && fromPlace.next_places.places){
                    fromPlace.next_places.places = fromPlace.next_places.places.filter(next_place => next_place.linkId !== link.id)
                    await PlaceAction.edit(fromPlace)
                }
                delete chartData.links[currLink.id]
                await PageAction.edit({...page, links: chartData.links, places: undefined})
                rerenderChart()
            }
        }
    }
    const linkComplete = async (chartData) => {
        if (chartData.currLink){
            let currLink = chartData.currLink
            if (chartData.links){
                let link = chartData.links[currLink.linkId]
                let fromPlace;
                let toPlace;
                if (page.places && page.places.places){
                    page.places.places.forEach(place => {
                        if (place.node_info.id === link.from.nodeId) fromPlace = place
                        if (place.node_info.id === link.to.nodeId) toPlace = place
                    })
                }
                if (fromPlace && fromPlace.next_places && fromPlace.next_places.places && toPlace){
                    fromPlace.next_places.places.push({award: currLink.award, place: toPlace.id, linkId: link.id})
                    await PlaceAction.edit(fromPlace)
                }else if (fromPlace && toPlace){
                    fromPlace.next_places = {
                        places: [{award: currLink.award, place: toPlace.id, linkId: link.id}]
                    }
                    await PlaceAction.edit(fromPlace)
                }
                link.award = currLink.award
                page.links = chartData.links
                await PageAction.edit({...page, links: chartData.links, places: undefined})
                rerenderChart()
            }
        }
        
    }
    const chartPosChange = (args) => {
        console.log(args)
        if (args.data && args.data.scale){
            setScale(args.data.scale)
        }
        if (args.data && args.data.positionX && args.data.positionY){
            setOffset({x: args.data.positionX, y: args.data.positionY})
        }
    }
    const PlaceComponent = placeComponents[currPlace.type]
    return(
    <>
        
        <Grid className='calcVH'>
            <Grid.Column width={4} className="scrollY">
                <>
                    {
                    PLACE_TYPES.map(type =>
                        <Segment
                            // disabled={ addon.disabled }
                            key={ `addon${type.id}` }
                            draggable={ !type.disabled }
                            className={ 'cursorPointer' }
                            onDragStart={ (event) =>  { !type.disabled &&
                                event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({
                                type: type.id,
                                ports:  simplePorts,
                                properties: { title: type.title, icon: type.icon, addon: true }
                                }))
                            }}
                        >
                            <Header
                                icon={type.icon}
                                content={ type.title }
                                
                            />
                        </Segment>
                    )
                    }
                </>
            </Grid.Column>
            <Grid.Column 
                width={ PlaceComponent ? 4 : 12 } 
                className={'diagramContainer'} 
                >
                    <div style={{pointerEvents: isNodeAddInProcess ? "none" : 'auto'}}>
                    {
                        placeNodes && 
                        <WorkflowChart
                            links={page.links}
                            offset={offset}
                            scale={scale}
                            ondDeleteNode={deleteNode}
                            onLinkComplete={linkComplete}
                            onLinkDelete={deleteLink}
                            onLinkEdit={linkEdit}
                            onPosChange={chartPosChange}
                            onAddPlace={addPlaceNode}
                            onNodeDragStop={nodeDragStop}
                            places={placeNodes}
                            key={ `workflow` }
                            readonly={false}
                            onSave={savePage}
                            onChange={changeWorkflow }/>
                    }
                    </div>
                

            </Grid.Column>
            { PlaceComponent &&
                <Grid.Column width={8} className="scrollY">
                    <PlaceComponent place={currPlaceInfo} onSave={savePlace} onCancel={cancelAddNode}/>
                </Grid.Column>
            }
        </Grid>
    </>
    )
}
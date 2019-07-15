import React, {Component} from 'react';

class FollowCount extends Component{
    constructor(props){
        super(props)
        this.state = {
            error:null,
            isLoaded:false,
            count:0
        }
    }
    
    getCount(route){
        fetch(route)
            .then(res => res.json())
            .then(
                (data)=>{
                    console.log(`data at followCount: ${data}`)
/*
                    this.setState({
                        isLoaded:true,
                        count:data.count
                    })
*/
                },
                (error) =>{
                    this.setState({
                        isLoaded:true,
                        error:error
                    })
                }
            )
    }
    componentDidMount(){
        let route = `/getfollowcount/${this.props.path}`
        console.log(`route at followCount : ${route}`)
        this.getCount(route)

    }
    render(){
            const {error, isLoaded, items} = this.state
            if(error){
                return <div>Error: {error.message} </div>
            } else if (!isLoaded){
                return <div>Loading ... </div>
            } else{
                return <div> {this.props.subject} : {this.state.count} </div>
            }
    }
}

export default FollowCount;

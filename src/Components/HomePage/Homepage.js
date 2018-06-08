import React,{Component} from 'react';
import GuestHomepage from "./GuestHomepage/GuestHomepage";

class Homepage extends Component{
	render(){
		const auth=true;
		const page=auth?(<Homepage />):(<GuestHomepage />)
		return(
			{page}
		);
	}
}

export default Homepage;
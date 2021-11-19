import React,{useEffect} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getTechs} from "../../actions/techAction"

const TechSelectOptions=({getTechs,tech:{techs,loading}})=>{
	useEffect(()=>{
		getTechs()
		// eslint-disable-next-line
	},[])
	return(
		!loading&&techs!==null&&techs.map(eachTech=><option key={eachTech.id} value={`${eachTech.firstName} ${eachTech.lastName}`}>{eachTech.firstName} {eachTech.lastName}</option>)
	)
}

TechSelectOptions.propTypes={
	tech:PropTypes.object.isRequired,
	getTechs:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
	tech:state.tech
})

export default connect(mapStateToProps,{getTechs})(TechSelectOptions)
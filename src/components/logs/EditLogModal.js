import React,{useState,useEffect} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {updateLog} from "../../actions/logActions"
import TechSelectOptions from "../techs/TechSelectOptions"

import M from "materialize-css/dist/js/materialize.min.js"

const EditLogModal=({current,updateLog})=>{
	const [message,setMessage]=useState("")
	const [attention,setAttention]=useState(false)
	const [tech,setTech]=useState("")

	useEffect(()=>{
		if(current){
			setMessage(current.message)
			setTech(current.tech)
			setAttention(current.attention)
		}
	},[current])

	const onsubmit=()=>{
		if(message===""||tech===""){
			M.toast({html:"Please enter a message and select technician"})
		}else{
			const savedLog={
				id:current.id,
				message,
				attention,
				tech,
				date:new Date()
			}
			updateLog(savedLog)
			M.toast({html:`Log updated by ${tech}`})
			setMessage("")
			setTech("")
			setAttention(false)
		}
	}

	return(
		<div id="edit-log-modal" className="modal" style={modalStyle}>
			<div className="modal-content">
				<h4>Update System Log</h4>
				<div className="row">
					<div className="input-field">
						<input type="text" name="message" value={message} onChange={e=>setMessage(e.target.value)}/>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<select name="tech" value={tech} className="browser-default" onChange={e=>setTech(e.target.value)}>
							<option value="" disabled>Select Technician</option>
							<TechSelectOptions/>
						</select>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<p>
							<label>
								<input type="checkbox" className="filled-in" checked={attention} value={attention} onChange={e=>setAttention(!attention)}/>
								<span>Needs Attention</span>
							</label>
						</p>
					</div>
				</div>
			</div>
			<div className="modal-footer">
				<a href="#!" onClick={onsubmit} className="modal-close left waves-effect blue waves-light btn">Save</a>
			</div>
		</div>
	)
}

const mapStateToProps=state=>({
	current:state.log.current
})

EditLogModal.propTypes={
	current:PropTypes.object,
	updateLog:PropTypes.func.isRequired
}

const modalStyle={
	width:"70%",
	height:"auto"
}

export default connect(mapStateToProps,{updateLog})(EditLogModal)
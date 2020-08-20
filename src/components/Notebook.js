import React from 'react';
import * as action from '../actionCreators'
import {connect, useStore} from 'react-redux'

class Notebook extends React.Component {

    state = {
        user_id: this.props.currentUser.id,
        text: '',
        importance: 'Low',
        color: "#000000",
        highlight: "#FAF5EB"
    }

    handleChange = (e) => { 
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/notes', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(r=>r.json())
        .then(newNote=>{
            this.props.handleNewNote(newNote)
            this.setState({
                user_id: this.props.currentUser.id,
                text: '',
                importance: 'Low',
                color: "#000000",
                highlight: "#FAF5EB"
            })
        })
    }

    deleteNote = (e) => {

        let row = e.target.parentNode
        row.style.textDecoration  = 'line-through'

        fetch(`http://localhost:3000/notes/${e.target.id}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }) 
        .then(r=>r.json())
        .then(note=>{
            this.props.handleDeleteNote(note.id)
            row.style.textDecoration  = 'none'
        }) 
    }


    noteStyle = (note) => {
        if (note.importance === 'Low'){
            return <p style={{color: `${note.color}`, backgroundColor: `${note.highlight}`}}><span id={note.id} onClick={this.deleteNote} style={{marginRight: '.5em', backgroundColor: '#FAF5EB'}}>🗑</span>{note.text}</p>
        } 
        else if (note.importance === 'Medium'){
            return <p style={{color: `${note.color}`, backgroundColor: `${note.highlight}`}}><span id={note.id} onClick={this.deleteNote} style={{marginRight: '.5em', backgroundColor: '#FAF5EB'}}>🗑</span><strong>{note.text}</strong></p>
        }
        else if (note.importance === 'High'){
            return <p style={{color: `${note.color}`, backgroundColor: `${note.highlight}`}}><span id={note.id} onClick={this.deleteNote} style={{marginRight: '.5em', backgroundColor: '#FAF5EB'}}>🗑</span><strong style={{textDecoration: 'underline'}}>{note.text}</strong></p>
        }
        else if (note.importance === 'Extremely High'){
            return <p style={{color: `${note.color}`, backgroundColor: `${note.highlight}`}}><span id={note.id} onClick={this.deleteNote} style={{marginRight: '.5em', backgroundColor: '#FAF5EB'}}>🗑</span><strong style={{textDecorationLine: 'underline', textDecorationStyle: 'double', textDecorationColor: 'red'}}>{note.text}</strong></p>
        }
    }

    handleColorChange =(e)=>{
        console.log("COLOR: ", e.target.value)
    }

    render(){
        console.log(this.state)
        return (
            <React.Fragment>
            <div className="notebook">  
                <img src="./spiral.png" alt='spiral-notebook' className="spiral"/>
                <h2 className="notebook-title">NOTES</h2>
                <div className="notebook-text">


                    <div className="overflow-auto notebook-notes">
                        {this.props.currentUser.notes.map(note=>this.noteStyle(note))}
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="new-note-form"> 

                                <div className="form-group">
                                    <label className="note-input-label">New Note:</label>
                                    <textarea  name="text" onChange={this.handleChange} value={this.state.text} type="text-area" className="form-control note-text-input" placeholder="Text Here.."/>
                                </div> 

                                <div className="form-group">
                                <label className="note-input-label">Importance:</label>
                                    <select onChange={this.handleChange} name="importance" value = {this.state.importance} className="form-control">
                                        <option  value="Low">Low</option>
                                        <option  value="Medium">Medium</option>
                                        <option  value="High">High</option>
                                        <option  value="Extremely High">Extremely High</option>                   
                                    </select>
                                </div>    

                        </div> 

                        <div className="new-note-form-colors"> 
                            <div style={{textAlign: "left"}}>
                                <label className="note-input-label" style={{marginLeft: '.4em'}}><small>Text Color:</small></label>
                                <input type="color" name="color" value={this.state.color} onChange={this.handleChange} />
                                <label className="note-input-label" style={{marginLeft: '.7em'}}><small>Highlight Color:</small></label>
                                <input type="color" name="highlight" value={this.state.highlight} onChange={this.handleChange}/>
                            </div>

                            <div>
                                <button type="submit" className="btn save-note-btn" style={{marginLeft: '-2em', marginTop: '-.7em'}}> Save</button>
                            </div>
                        </div>

                    </form> 

                </div>

            </div>  
            </React.Fragment>
        )
    }


}

const mapStateToProps=(state)=> {
    return  {
    currentUser: state.currentUser
    }
} 

const mapDispatchToProps=(dispatch)=>{
    return {
    handleNewNote: (newNote)=>dispatch(action.handleNewNote(newNote)),
    handleDeleteNote: (noteId)=>dispatch(action.handleDeleteNote(noteId))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Notebook);
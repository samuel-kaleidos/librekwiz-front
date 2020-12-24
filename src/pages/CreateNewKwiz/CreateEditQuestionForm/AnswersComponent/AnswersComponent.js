import React from "react";
import "./AnswersComponent.css";

export const AnswersComponent = ({state, setState}) => {
  const answerOptions = ["A", "B", "C", "D"];
  const handleChange = (evt, index) => {
    const newState = state.options.map((x, ind) => {
      if(ind===index) {
        if(evt.target.name === 'isCorrect'){
          return {...x, "isCorrect": true} 
        }
        return {...x, [evt.target.name]: evt.target.value}
      } else {
        if(evt.target.name === 'isCorrect') {
          return {...x, "isCorrect": false}
        }
        return x
      }
    })
    console.log(newState)
    setState({...state, options: newState})
  }

  return (
    <div className="answers">
      {
        state.options.map((option, index) => {
          if(index<2) {
            return (
              <div key={index} className="answer">
                <div className={`answer_letter bg_answer_${answerOptions[index]}`}><span>{answerOptions[index]}</span></div>
                <input type="text" id={`answer${answerOptions[index]}`} name="text" placeholder="Añade una respuesta" value={option.text} onChange={evt=>handleChange(evt, index)} />
                <input type="checkbox" id={`correct${answerOptions[index]}`} name="isCorrect" checked={option.isCorrect} onChange={evt=>handleChange(evt, index)}/>
                <label className="icon icon-check" htmlFor={`correct${answerOptions[index]}`}><span>{`Respuesta ${answerOptions[index]}`}</span></label>
              </div>
            )
          } else {
            return (
              <div key={index} className="answer">
                <div className={`answer_letter bg_answer_${answerOptions[index]}`}><span>{answerOptions[index]}</span></div>
                <input type="text" id={`answer${answerOptions[index]}`} name="text" placeholder="Añade una respuesta" value={option.text} onChange={evt=>handleChange(evt, index)} disabled={!state.options[index-1].text}/>
                <input type="checkbox" id={`correct${answerOptions[index]}`} name="isCorrect" checked={option.isCorrect} onChange={evt=>handleChange(evt, index)} disabled={!state.options[index-1].text}/>
                <label className="icon icon-check" htmlFor={`correct${answerOptions[index]}`}><span>{`Respuesta ${answerOptions[index]}`}</span></label>
              </div>
            )

          }
        })
      }
    </div>
  )
}

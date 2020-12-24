import React, { Fragment } from "react";
import { AnswersComponent } from "./AnswersComponent/AnswersComponent"
import "./CreateEditQuestionForm.css";

export const CreateEditQuestionForm = ({state, setState}) => {
  const handleChange = (evt, index=null) => {
    setState({...state, [evt.target.name]: evt.target.value})
  }

  return (
    <Fragment>
      <label htmlFor="question">titulo de la pregunta</label>
      <input id="question"
        placeholder="Pon un titulo a la pregunta"
        name="text"
        type="text"
        value={state.text}
        onChange={evt=>handleChange(evt)}
      />
      <label htmlFor="imageInput">Imagen de la pregunta</label>
      <input id="imageInput"
        placeholder="Introduzca una url"
        type="url"
        name="image"
        value={state.image}
        onChange={evt=>handleChange(evt)}
        />
      <AnswersComponent state={state} setState={setState}/>
    </Fragment>
  )

}

import React, { useState } from "react";
import axios from 'axios';
import {CreateEditQuestionForm} from "./CreateEditQuestionForm/CreateEditQuestionForm"
import { QuestionsList } from "./QuestionsList/QuestionsList";
import {EditorHeader} from "../../components/EditorHeader/EditorHeader"
import "./CreateNewKwiz.css";

export const CreateNewKwiz = (props) => {
  
  const initialKwizState = {
    name: '',
    questions: [
      {
        id: '',
        text: '',
        image: '',
        options: [
          {text: '', image: '', isCorrect: false},
          {text: '', image: '', isCorrect: false},
          {text: '', image: '', isCorrect: false},
          {text: '', image: '', isCorrect: false}
        ]
      }
    ]
  }

  const initialQuestionState = {
    id: '',
    text: '',
    image: '',
    options: [
      {text: '', image: '', isCorrect: false},
      {text: '', image: '', isCorrect: false},
      {text: '', image: '', isCorrect: false},
      {text: '', image: '', isCorrect: false}
    ]
  }

  /* States */
  const [kwizState, setKwizState] = useState(initialKwizState);
  const [questionState, setQuestionState] = useState(initialQuestionState);
  const [indexQuestion, setIndexQuestion] = useState(0)

  const createKwiz = async (e) => {
    e.preventDefault()
    const data = {
      ...kwizState,
      questions: [
        ...kwizState.questions.slice(0,indexQuestion),
        questionState,
        ...kwizState.questions.slice(indexQuestion+1)
      ]
    }
    try {
        // const data = kwizState;
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/quiz/`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
        )
        props.navigate(`/admin/${response.data.id}`)
    } catch(e) {
      // TODO: hacer algo con el error
      console.log("ERROR de datos, no es un json válido")
    }
  }

  return (
    <div className="NewKwizForm">
      <EditorHeader state={kwizState} setState={setKwizState} createKwiz={createKwiz}/>
      <CreateEditQuestionForm state={questionState} setState={setQuestionState}/>
      <QuestionsList
        kwizState={kwizState}
        setKwizState={setKwizState}
        questionState={questionState}
        setQuestionState={setQuestionState}
        indexQuestion={indexQuestion}
        setIndexQuestion={setIndexQuestion}
        initialQuestionState={initialQuestionState}
      />
    </div>
  );
};

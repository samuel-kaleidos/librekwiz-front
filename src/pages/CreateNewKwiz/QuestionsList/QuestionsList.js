import React from "react";

export const QuestionsList = ({kwizState,setKwizState,questionState,setQuestionState,indexQuestion,setIndexQuestion,initialQuestionState})=>{

  const setNewQuestion = evt => {
    evt.preventDefault()
    saveQuestionChanges(true)
    setIndexQuestion(kwizState.questions.length)
    setQuestionState(initialQuestionState)
  }
  let dragElement

  const saveQuestionChanges =(newQuestion)=>{
    if(newQuestion) {
      setKwizState({
        ...kwizState,
        questions: [
          ...kwizState.questions.slice(0,indexQuestion),
          questionState,
          ...kwizState.questions.slice(indexQuestion+1),
          initialQuestionState
        ]
      })
    } else {
      setKwizState({
        ...kwizState,
        questions: [
          ...kwizState.questions.slice(0,indexQuestion),
          questionState,
          ...kwizState.questions.slice(indexQuestion+1)
        ]
      })
    }
  }

  const handleItemQuestionList = (event, index) => {
    event.preventDefault()
    if(index === indexQuestion) return false
    saveQuestionChanges(false)
    setQuestionState(kwizState.questions[index])
    setIndexQuestion(index)
  }

  const sortQuestions = (dragElementIndex, dropIndexPosition) => {
    if(dragElementIndex === dropIndexPosition) return false
    const newPosition = kwizState.questions[dragElementIndex]
    const filteredQuestions = kwizState.questions.filter((x, index)=>index!==dragElementIndex)
    
    
    if(dropIndexPosition===0){
      setKwizState({...kwizState, questions: [newPosition, ...filteredQuestions]})
      setIndexQuestion(dropIndexPosition)
      setQuestionState(newPosition)
    } else if(dropIndexPosition===kwizState.questions.length){
      setKwizState({...kwizState, questions: [...filteredQuestions, newPosition]})
      setIndexQuestion(dropIndexPosition)
      setQuestionState(newPosition)
    } else if(dropIndexPosition<dragElementIndex){
      setKwizState({...kwizState, questions: [
        ...filteredQuestions.slice(0, dropIndexPosition),
        newPosition, 
        ...filteredQuestions.slice(dropIndexPosition)]
      })
      setIndexQuestion(dropIndexPosition)
      setQuestionState(newPosition)
    } else {
      setKwizState({...kwizState, questions: [
        ...filteredQuestions.slice(0, dropIndexPosition-1),
        newPosition, 
        ...filteredQuestions.slice(dropIndexPosition-1)]
      })
      setIndexQuestion(dropIndexPosition-1)
      setQuestionState(newPosition)
    }
  }
  const drag=(ev) => {
    dragElement = +ev.target.dataset.indexSlide
    ev.target.classList.add('reduce')
  }
  const dragEnd=(ev) => {
    dragElement = +ev.target.dataset.indexSlide
    ev.target.classList.remove('reduce')
  }
  const dragEnter=(ev)=>{
    ev.target.classList.add('expand')
  }
  const dragLeave=(ev)=>{
    ev.target.classList.remove('expand')
  }
  const drop=(ev)=>{
    
    ev.target.classList.remove('expand')
    sortQuestions(dragElement,+ev.target.dataset.indexSlide)
  }

  
  return (
    <div className="questions_list bg-black" >
      {
        kwizState.questions.map(
          (item, index)=>(
            <button
              key={index}
              className={indexQuestion===index?"selected":""}
              data-index-slide={index}
              draggable={true}
              onDragEnd = {(event)=>dragEnd(event)}
              onDragEnter={(event)=>dragEnter(event)}
              onDragLeave = {(event)=>dragLeave(event)}
              onDragOver = {(event)=>event.preventDefault()}
              onDrop = {event=>drop(event)}
              onDragStart={(event)=>drag(event)}
              onClick={(event)=>handleItemQuestionList(event, index)}
            >
              <span>{index + 1}</span>
            </button>
          )
        )
      } 
      <button onClick={(evt)=>setNewQuestion(evt)}>+</button>
    </div>
  )
}

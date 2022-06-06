import { useState } from 'react'



const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('')
  const [enteredNameTouched, setEnteredNameTouched] = useState(false)

  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)


  const enteredNameIsValid = enteredName.trim() !== ''
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched


  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const enteredEmailIsValid = regEx.test(enteredEmail)
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid){
    formIsValid = true
  }


  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value)
  }

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value)
  }

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true)

  }

  const nameInputBlurHandler = (event) => {
    setEnteredEmailTouched(true)

  }

  const formSubmissionHandler = (event) => {
    //because we don't want the request to be sent yet (freeze the default behavior)
    //so page won't be reloaded
    event.preventDefault()

    setEnteredNameTouched(true)
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return
    }
    setEnteredName('')
    setEnteredEmail('')
    setEnteredNameTouched(false)
    setEnteredEmailTouched(false)
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control'



  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
          />
          {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>

      <div className={nameInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input 
          type='email' 
          id='email' 
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
          />
          {nameInputIsInvalid && <p className="error-text">Email must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

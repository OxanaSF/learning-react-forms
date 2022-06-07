
import useInput from '../hooks/use-input';



const SimpleInput = (props) => {
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;


  //call useInput and extract values by extracting keys
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '')


const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => regEx.test(value))


  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid){
    formIsValid = true
  }
 

  const formSubmissionHandler = (event) => {
    //because we don't want the request to be sent yet (freeze the default behavior)
    //so page won't be reloaded
    event.preventDefault()

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return
    }
    resetNameInput()
    resetEmailInput()
  }

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control'

  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control'


  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
          />
          {nameInputHasError && <p className="error-text">Name must not be empty.</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input 
          type='email' 
          id='email' 
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          />
          {emailInputHasError && <p className="error-text">Email must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

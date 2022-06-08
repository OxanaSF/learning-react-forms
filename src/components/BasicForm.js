import useInput from "../hooks/use-input";
import Input from "./Input";

const BasicForm = (props) => {
  const isNotEmpty = (value) => (value ? value.trim() !== "" : "");
  console.log(isNotEmpty(""));

  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const isEmail = (value) => regEx.test(value);

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  console.log(useInput(isNotEmpty));

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  let formIsValid = false;

  if (lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    console.log("Sumbitted!");
    console.log(firstNameValue, lastNameValue, emailValue);

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  const inputData = [
    {
      className: firstNameClasses,
      id: "fname",
      type: "text",
      value: firstNameValue,
      content: "First Name",
      onChange: firstNameChangeHandler,
      onBlur: firstNameBlurHandler,
      hasError: firstNameHasError,
      par: "Please enter a first name.",
    },
    {
      className: lastNameClasses,
      id: "lname",
      type: "text",
      value: lastNameValue,
      content: "Last Name",
      onChange: lastNameChangeHandler,
      onBlur: lastNameBlurHandler,
      hasError: lastNameHasError,
      par: "Please enter a last name.",
    },
    {
      className: emailClasses,
      id: "email",
      type: "text",
      value: emailValue,
      content: "E-Mail Address",
      onChange: emailChangeHandler,
      onBlur: emailBlurHandler,
      hasError: emailHasError,
      par: "Please enter an email address.",
    },
  ];

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        {inputData.map((inputEl) => (
          <Input
            key={inputEl.id}
            className={inputEl.className}
            id={inputEl.id}
            type={inputEl.type}
            value={inputEl.value}
            content={inputEl.content}
            onChange={inputEl.onChange}
            onBlur={inputEl.onBlur}
            hasError={inputEl.hasError}
            par={inputEl.par}
          />
        ))}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

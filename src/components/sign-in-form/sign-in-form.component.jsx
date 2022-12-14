import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles';
import {useState} from "react";
import {signInAuthUserWithEmailAndPassword, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import {ButtonsContainer, SignInContainer} from "./sign-in-form.styles";

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import {useDispatch} from "react-redux";
import {googleSignInStart, emailSignInStart} from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {

    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields();
        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("incorrect password for email");
                    break;
                case 'auth/user-not-found':
                    alert("no user associated with this email");
                    break;
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={"Email"} type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label={"Password"} type="password" required onChange={handleChange} name="password" value={password} />
                <ButtonsContainer>
                    <Button buttonType={BUTTON_TYPE_CLASSES.base} type='submit'> Sign In </Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Sign In With Google</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;
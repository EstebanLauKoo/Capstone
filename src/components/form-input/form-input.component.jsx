import "./form-input.styles"
import {FormGroupStyledComponent, FormInputLabelStyledComponent, FormInputStyledComponent} from "./form-input.styles";

const FormInput = ({label, ...otherProps}) => {
    return (
        <FormGroupStyledComponent>
            <FormInputStyledComponent {...otherProps}/>
            {label && (
            <FormInputLabelStyledComponent shrink={otherProps.value.length}>
                {label}
            </FormInputLabelStyledComponent>
            )}
        </FormGroupStyledComponent>
    )
};


export default FormInput;
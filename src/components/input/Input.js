
const Input = (props) => {
    return (
        <input value={ props.value }
               onChange={ props.onChange }
               onBlur={props.onBlur}
               onClick={ props.onClick }
               max={ props.max || '' }
               min={ props.min || '' }
               className={ props.classes }
               type={ props.type || '' }
               placeholder={ props.placeholder || '' }
        />
    );
};

export {Input}
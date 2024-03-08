type InputPropsType = {
    type: string,
    onChange: (value: any) => void,
    placeholder?: string | any,
    title: string
}

type InputPasswordType = {
    onChange: (value: any) => void
}

type InputTextType = {
    onChange: (value: any) => void,
    placeholder: string
}

export function Input(props: InputPropsType) {
    return (
        <div className="py-1.5">
            <div className="text-xs font-medium py-1 text-black">{props.title}</div>
            {props.type == "password" ? <InputPassword onChange={props.onChange}></InputPassword> : <InputText onChange={props.onChange} placeholder={props.placeholder}></InputText>}
        </div>
    )
}

export function InputPassword(props: InputPasswordType) {

    return (
        <input onChange={props.onChange} className="border border-gray-250 rounded min-w-full text-md py-1 px-3 text-gray-800" type="password"></input>
        // <div className="min-w-full border border-gray-250 rounded">
        //     <div className="min-w-full">
        //         <input className="text-sm py-2 px-3" type={passwordType}></input>
        //     </div>
        //     {/* <div className="flex flex-col justify-center px-2" onClick={handleHideUnhide}>
        //         {passwordIcon}
        //     </div> */}
        // </div>
    )
}

function InputText(props: InputTextType) {
    return (
        <input onChange={props.onChange} className="border border-gray-250 rounded min-w-full text-sm py-2 px-3 text-gray-800" placeholder={props.placeholder} type="text"></input>
    )
}
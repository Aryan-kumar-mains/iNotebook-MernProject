import { useState } from "react";
import DialogContext from "./DialogContext";

const DialogState = (props) => {
    const [text, setText] = useState("Create Your Note");  
    const [btnText, setBtnText] = useState("Create");
    const [open, setOpen] = useState(false);

    /* for editing the note */
    const editableContent = {
        currentId: "", 
        title: "",
        tag: "",
        description: ""
    }
    const [initialContent, setInitialContent] = useState(editableContent)
    return (
        <DialogContext.Provider value={{open, setOpen, text, setText, btnText, setBtnText, initialContent,setInitialContent}}>
            {props.children}
        </DialogContext.Provider>
    )
}

export default DialogState;


// after creating 'DialogState' wrap the whole component(i.e in App.js ) with this state so that it's used by all the components
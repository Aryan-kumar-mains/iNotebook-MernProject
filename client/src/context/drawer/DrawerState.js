import { useState } from "react";
import DrawerContext from "./DrawerContext";

const DrawerState = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <DrawerContext.Provider value={{open, setOpen}}>
            {props.children}
        </DrawerContext.Provider>
    )
}

export default DrawerState;

// after creating 'DrawerState' wrap the whole component(i.e in App.js ) with this state so that it's used by all the components
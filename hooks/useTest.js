import { useEffect } from "react";








function useTest() {

let trickTest;
    useEffect(() => {


        if (trickTest !== "") {
            console.log(" hello hameeeeeeeee");
        }

    }, [trickTest])

    return { trickTest };

}

export default useTest
import { Global, css } from "@emotion/react";

export default function GlobalStyles() {
    return <Global
        styles={css`
            #root {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
            }`
        }
    />
}

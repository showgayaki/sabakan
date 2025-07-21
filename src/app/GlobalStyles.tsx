import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
    <Global
        styles={css`
            #root {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
            }`
        }
    />
);

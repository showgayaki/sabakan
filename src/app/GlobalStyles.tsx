// 例: src/App.tsx または src/main.tsx などのルート近くに追加
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

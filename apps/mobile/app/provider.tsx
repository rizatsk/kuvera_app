import { store } from "@/states";
import { asyncPreloadProcess } from "@/states/preload/action";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

export default function ReduxProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => {
        // Dispatch preload process setelah Redux context tersedia
        store.dispatch(asyncPreloadProcess() as any);
    }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

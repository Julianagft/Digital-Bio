import Router from "next/router";
import { setBlockSkeleton } from "../../../store/slices/globalSlice.js";
import { store } from "../../../store/store.js";

export default async function reloadGetServerSideProps() {
    store.dispatch(setBlockSkeleton(true));
    await Router.replace(Router.asPath);
}

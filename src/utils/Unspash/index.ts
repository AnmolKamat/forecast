import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPASH_ACCESS_KEY!,
});

export default unsplash;

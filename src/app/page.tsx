import { Form } from "~/components/form";
import { query } from "./actions";
import { preload } from "~/utils/get-data";

export default async function Home() {
    await preload();
    return <Form action={query} />;
}

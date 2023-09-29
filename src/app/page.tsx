import { Form } from "~/components/form";
import { query } from "./actions";
import { preload } from "~/utils/get-data";

export default function Home() {
    preload();
    return <Form action={query} />;
}

import { Form } from "~/components/form";
import { query } from "./actions";

export default function Home() {
    return <Form action={query} />;
}

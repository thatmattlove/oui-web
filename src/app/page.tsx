import { Form } from "~/components/form";
import { query } from "./actions";
import type { Metadata } from "next";

export default function Home() {
    return <Form action={query} />;
}

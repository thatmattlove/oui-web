"use client";
import { ExpectedError } from "~/components/expected-error";

interface ErrorProps {
    error: Error & { digest?: string };
    reset(): void;
}

const ErrorPage = (props: ErrorProps) => {
    const { error } = props;
    return <ExpectedError title="Something Went Wrong" message={error.message} />;
};

export default ErrorPage;

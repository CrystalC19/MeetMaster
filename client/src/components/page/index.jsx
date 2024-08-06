import { useEffect } from "react";
import PageContent from '../PageContent';
import { Outlet } from "react-router-dom";

function Page({ currentPage }) {
    currentPage = currentPage.substring(1);

    useEffect(() => {
        document.title = capitalized(currentPage);
    }, [currentPage]);

    return (
        <section>
            <h2>{capitalized(currentPage)}</h2>

            <PageContent>
                <Outlet />
            </PageContent>
        </section>
    );
}

export default Page;
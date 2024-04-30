
const InstitutePage = async ({ params }: { params: { instituteId: string } }) => {

    return (
        <>
            <h1>{params.instituteId}</h1>
        </>
    )

}

export default InstitutePage

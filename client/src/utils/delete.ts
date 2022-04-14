export const handleDelete = async (path : string, name : string, id:string) => {

        if (!window.confirm(`Are you sure you want to remove ${name}?`)) {
            return;
        }

        const res = await fetch(`http://localhost:3001/${path}/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });


        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
            return;
        }


    };
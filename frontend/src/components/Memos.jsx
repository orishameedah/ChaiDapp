import { useEffect, useState } from "react";

const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]); //state to store the memos
    const { contract } = state; //destructuring the contract from the state

    useEffect(() => { //using the useEffect because we want to update the memos immediately when a new memo is added and rerended on screen effectively
        const memoMessage = async () => {
            const memos = await contract.getMemo(); //getting the memos from the contract
            setMemos(memos); //setting the memos to the state
            console.log(memos);
            // console.log(contract)
        }
        contract && memoMessage(); //if contract is not null, then call the memoMessage function    
    }, [contract]); //dependency array, when the contract changes, the useEffect will run again
    return <>
        <h1>Memo's List</h1>
        <div className="container-fluid">
            <h3 style={{ textAlign: "center", marginTop: "20px" }}>Messages</h3>
            <table>
                <tbody >
                    {memos.map((memo) => {
                        return (
                            <tr >
                                <td
                                    style={{
                                        backgroundColor: "dodgerblue",
                                        border: "1px solid white",
                                        borderCollapse: "collapse",
                                        padding: "7px",
                                        width: "400px",
                                        color: "white",

                                    }}
                                >
                                    {memo.name}
                                </td>
                                <td
                                    style={{
                                        backgroundColor: "dodgerblue",
                                        border: "1px solid white",
                                        borderCollapse: "collapse",
                                        padding: "7px",
                                        width: "400px",
                                        color: "white"
                                    }}
                                >
                                    {new Date(Number(memo.timestamp) * 1000).toLocaleString()}
                                </td>
                                <td
                                    style={{
                                        backgroundColor: "dodgerblue",
                                        border: "1px solid white",
                                        borderCollapse: "collapse",
                                        padding: "7px",
                                        width: "200px",
                                        color: "white",

                                    }}
                                >
                                    {memo.messages}
                                </td>
                                <td className="container-fluid"
                                    style={{
                                        backgroundColor: "dodgerblue",
                                        border: "1px solid white",
                                        borderCollapse: "collapse",
                                        padding: "7px",
                                        width: "400px",
                                        color: "white"
                                    }}
                                >
                                    {memo.from}
                                </td>
                            </tr>

                        );
                    })}
                </tbody>
            </table>
        </div>
    </>
}

{/* <p></p> */ }
export default Memos;
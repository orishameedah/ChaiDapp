import { ethers } from "ethers";
import "./Buy.css"; //importing the css file

const Buy = ({ state }) => {

    const buyChai = async (event) => {
        event.preventDefault(); //whenever we are submitting the form our pay don't get reloaded
        const { contract } = state; //destructuring the state object and it is referring to the contract address, abi and signer
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        // const amount = document.querySelector("#amount").value;
        const amount = { value: ethers.parseEther("0.001") }
        const transaction = await contract.buyChai(name, message, amount); //this will return a transaction object});
        await transaction.wait()
        // console.log(name, message)
        // console.log("Transaction successful", transaction.hash);
        alert("Transaction successful", transaction.hash);
        window.location.reload(); //this will reload the page
    }
    return (
        <div className="center">
            <h1>Thanks</h1>
            <form onSubmit={buyChai}>
                <div className="inputbox">
                    <input type="text" required="required" id="name" />
                    <span>Name</span>
                </div>
                <div className="inputbox">
                    <input type="text" required="required" id="message" />
                    <span>Message</span>
                </div>
                {/* <div className="inputbox">
                    <input type="text" required="required" id="amount" />
                    <span>Amount</span>
                </div> */}
                <div className="inputbox">
                    <input type="submit" value="Pay" disabled={!state.contract} />
                </div>
            </form>

        </div>
    );
}

export default Buy;
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import SinglaMessage from "./SingleMessage"


const FormToSend = ({ allData, setAllData }) => {
    const [text, setText] = useState("")
    const [from, setFrom] = useState("")

    const fetchingData = () => {
        fetch("https://olha-danylevska-chat-server.onrender.com/messages")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setAllData(data)
                console.log({ allData })
            })
    }
    useEffect(() => {
        fetchingData()
    }, []);

    async function handleSubmit(event) {
        event.preventDefault()
        const newMessage = {
            from, text
        }

        let res = await fetch("https://olha-danylevska-chat-server.onrender.com/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMessage)
        })
        let resJson = await res.json()
        console.log(resJson)
        fetchingData()

    }

    return (
        <div className="form-holder">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="text-message">
                    <input type="text" name="text" id="text" placeholder="Text Message" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="from-message">
                    <input type="text" name="from" id="from" placeholder="from" value={from} onChange={(e) => setFrom(e.target.value)} />
                </div>
                <div className="button">
                    <button type="submit">SEND MESSAGE</button>
                </div>
            </form>
            <SinglaMessage allData={allData} setAllData={setAllData} from={from} text={text} />
        </div>

    )
}

export default FormToSend
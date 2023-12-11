import React, { useState } from 'react';
import cup from '../assets/img/cup.jpg';
import Image from 'next/image';

export default function Home() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(false);
    const [formSubmittedMessage, setFormSubmittedMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setFormSubmittedMessage('')

        const formData: any = new FormData(e.target);
        const data: any = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        try {
            const response: Response = await fetch('/api/handleFormSubmit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if(!response.ok) {
                setFormSubmittedMessage('Something went wrong - try again later.')
            } else {
                setFormSubmittedMessage('Thanks - let\'s see what happends next!')
                e.target.reset();
            }
        } catch {
            setFormSubmittedMessage('Something went wrong - try again later.')
        } finally {
            setFormSubmitted(true);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <Image src={cup} className="w-96" alt="cup" />
            </div>

            <h6 className="pb-10 text-center text-lg">
                If you own a sales target then win a cup of coffee by answering
                one question!
            </h6>
            <h6 className="pb-10 text-center font-bold">
                "Why is this a webpage and not a website?"
            </h6>
            {/* Form */}
            <div className="flex justify-center">
                <div
                    className={`mb-8 inline-block rounded border-2 border-black bg-white p-5 transition-all duration-500 md:pointer-events-none md:absolute md:opacity-0 ${
                        formSubmitted
                            ? ''
                            : 'pointer-events-none absolute opacity-0'
                    }`}
                >
                    <p>{formSubmittedMessage}</p>
                </div>
            </div>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Response"
                        className="m-2 block h-24 w-64 resize-none border border-solid border-black p-1 outline-none md:w-72"
                        name="message"
                        required
                    ></textarea>
                    <input
                        className="m-2 block w-64 border border-solid border-black p-1 outline-none md:w-72"
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                    ></input>
                    <input
                        className="m-2 block w-64 border border-solid border-black p-1 outline-none [appearance:textfield] md:w-72 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        type="number"
                        name="number"
                        inputMode="numeric"
                        onKeyPress={e => {
                            if (!/[0-9+ ]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        placeholder="Phone"
                        required
                    ></input>
                    <button
                        className="m-2 block w-64 border border-solid border-black p-1 outline-none md:w-72"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>

                <div
                    className={`fixed right-5 top-5 translate-y-[-1000px] rounded border-2 border-black bg-white p-5 transition-all duration-500 md:right-10 md:top-10 md:translate-y-0 ${
                        formSubmitted ? 'translate-x-0' : 'translate-x-80'
                    }`}
                >
                    <p>{formSubmittedMessage}</p>
                </div>
            </div>

            {/* FAQPopUp */}
            <button
                onClick={() => setButtonStatus(!buttonStatus)}
                className="fixed bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded bg-black hover:cursor-pointer md:bottom-10 md:right-10 md:h-16 md:w-16"
            >
                <span className="text-xl font-extrabold text-white md:text-3xl">
                    ?
                </span>
            </button>
            <div
                className={`fixed bottom-12 right-1 w-64 rounded border-2 border-black bg-white p-5 transition-all duration-500 md:bottom-32 md:right-10 ${
                    buttonStatus ? 'translate-x-0' : 'translate-x-96'
                }`}
            >
                <h2 className="pb-2 font-bold">FAQ:</h2>
                <p className="pb-2">
                    "I do not drink coffee. Can I win another drink?"
                </p>
                <p>Answer: Yes</p>
            </div>

            <div className="mb-16"></div>
        </>
    );
}

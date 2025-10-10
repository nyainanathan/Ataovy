import { useState, useEffect } from "react";

const Background = ( ) => {
        const motivationalTexts = [
    "Every task completed is a step forward!",
    "You're making progress, one todo at a time!",
    "Small steps lead to big accomplishments!",
    "Stay focused and watch your productivity soar!",
    "You've got this! Keep crushing those tasks!",
    "Productivity is built one task at a time!",
    "Your future self will thank you for starting today!"
    ];

    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % motivationalTexts.length)
        }, 9000);
        return () => clearInterval(messageInterval);
    }, [messageIndex]);

    return (
            
             <div className="w-1/2 h-full bg-[url('/login-background.jpg')] bg-cover flex flex-col items-center justify-between p-16">
                
                <img src="/ataovy-logo-nobg.png" className=" w-1/3" alt="" />

                <p className="text-2xl text-white italic">
                    {motivationalTexts[messageIndex]}
                </p>
            </div>
    )
}

export default Background;